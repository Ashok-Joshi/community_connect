// Code to validate the valid email ids on the Signup page and on the reset password page

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
  
    form.addEventListener("submit", function (e) {
      let valid = true;
  
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
  
      const emailError = document.getElementById("emailError");
      const passwordError = document.getElementById("passwordError");
  
      // ✅ Valid email domains
      const allowedDomains = [
        "gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com",
        "aol.com", "protonmail.com", "zoho.com", "ymail.com", "live.com",
        "msn.com", "mail.com", "rediffmail.com", "me.com", "gmx.com"
      ];
  
      const parts = email.split("@");
      const domain = parts.length === 2 ? parts[1].toLowerCase() : "";
  
      if (!allowedDomains.includes(domain)) {
        e.preventDefault();
        emailError.textContent = "❌ Please use a valid email from Gmail, Yahoo, Outlook, etc.";
        emailError.style.color = "red";
        valid = false;
      } else {
        emailError.textContent = "";
      }
  
      // ✅ Strong password regex
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
  
      if (!passwordPattern.test(password)) {
        e.preventDefault();
        passwordError.textContent =
          "❌ Password must be at least 6 characters, include uppercase, lowercase, and a special symbol (!,@,#...).";
        passwordError.style.color = "red";
  
        // 🔔 Browser popup message
        alert("⚠️ Weak Password:\nYour password must be 6+ characters long and include:\n✔️ Uppercase\n✔️ Lowercase\n✔️ Special character (like !, @, #)");
        valid = false;
      } else {
        passwordError.textContent = "";
      }
  
      if (!valid) {
        e.preventDefault();
      }
    });
  });
  