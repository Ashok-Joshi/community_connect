document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const passwordInput = document.getElementById("password");
    const passwordError = document.getElementById("passwordError");
  
    form.addEventListener("submit", function (e) {
      const password = passwordInput.value.trim();
  
      // Password must have: 6+ chars, one uppercase, one lowercase, one special char
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
  
      if (!passwordPattern.test(password)) {
        e.preventDefault(); // Stop form from submitting
        passwordError.textContent = "❌ Password must include uppercase, lowercase, special char, and be 6+ chars long.";
        passwordError.style.color = "red";
  
        // 💡 Popup for user guidance
        alert(
          "⚠️ Weak Password!\n\nYour password must have:\n✔️ At least 6 characters\n✔️ One uppercase letter (A-Z)\n✔️ One lowercase letter (a-z)\n✔️ One special character (!, @, #, etc.)"
        );
      } else {
        passwordError.textContent = ""; // Clear error
      }
    });
  });
  