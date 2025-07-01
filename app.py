from flask import Flask, render_template, request, redirect, url_for, flash
from models import db, User
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = 'kuch-secret-key'

db.init_app(app)
bcrypt = Bcrypt(app)

# HOME PAGE = LOGIN PAGE
@app.route('/')
def home():
    return render_template('index.html')

# SIGNUP PAGE
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            flash("Email already exists. Please login.")
            return redirect(url_for('home'))

        hashed_pass = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(email=email, password=hashed_pass)
        db.session.add(new_user)
        db.session.commit()

        flash("Signup successful! Please login.")
        return redirect(url_for('home'))

    return render_template('signup.html')

# LOGIN PAGE with custom error messages
@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']

    user = User.query.filter_by(email=email).first()

    if not user:
        flash("❌ This email ID is not registered. Please sign up first.")
        return redirect(url_for('home'))

    if not bcrypt.check_password_hash(user.password, password):
        flash("❌ Incorrect password. Please try again.")
        return redirect(url_for('home'))

    flash("✅ Login successful!")
    return redirect(url_for('dashboard'))

# DASHBOARD PAGE
@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

# Add Route: Forgot password page 

@app.route('/forgot-password', methods=['GET', 'POST'])
def forgot_password():
    if request.method == 'POST':
        email = request.form['email']
        user = User.query.filter_by(email=email).first()
        
        if not user:
            flash("❌ This email ID is not registered. Please sign up first.")
            return redirect(url_for('forgot_password'))
        
        # If email exists, redirect to reset-password page with email as param
        return redirect(url_for('reset_password', email=email))

    return render_template('forgot_password.html')

# Add Route: Reset Password Page

@app.route('/reset-password/<email>', methods=['GET', 'POST'])
def reset_password(email):
    user = User.query.filter_by(email=email).first()

    if not user:
        flash("❌ This email ID is not registered. Please sign up first.")
        return redirect(url_for('home'))
    
    if request.method == 'POST':
        new_password = request.form['password']
        hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
        user.password = hashed_password
        db.session.commit()
        flash("✅ Password updated successfully. Please log in.")
        return redirect(url_for('home'))

    return render_template('reset_password.html', email=email)


# MAIN
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
