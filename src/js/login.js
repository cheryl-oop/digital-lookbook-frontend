import { sendUser } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-container");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const data = await sendUser(email, password);

      localStorage.setItem("userId", data.userId);
      window.location.href = "index.html";
    } catch (error) {
      console.error(error);
      alert("Invalid email or password");
    }
  });
});
