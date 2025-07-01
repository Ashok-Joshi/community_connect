// Code to validate the valid email ids on the Signup page

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const emailInput = document.getElementById("email");
  
    form.addEventListener("submit", function (e) {
      const email = emailInput.value.trim();
      const emailError = document.getElementById("emailError");
  
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
      } else {
        emailError.textContent = "";
      }
    });
  });
  