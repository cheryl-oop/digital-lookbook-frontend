const isLoggedIn = Boolean(localStorage.getItem("userId")); // use your actual key

document.querySelectorAll('[data-auth="required"]').forEach((el) => {
  el.hidden = !isLoggedIn;
});

document.querySelectorAll('[data-auth="guest"]').forEach((el) => {
  el.hidden = isLoggedIn;
});

document.getElementById("logout")?.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("userId");
  window.location.href = "index.html";
});
