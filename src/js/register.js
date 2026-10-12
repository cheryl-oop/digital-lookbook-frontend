import { registerUser } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".register-container");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Please fill in both email and password.");
      return;
    }
    try {
      await registerUser(email, password);
      alert("Registration successful! Please log in.");
      window.location.href = "login.html";
    } catch (error) {
      alert("An unexpected error occurred. Please try again later.");
    }
  });
});
