// navbar.js

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");

      // re-render icons after opening menu
      setTimeout(() => {
        if (window.lucide) {
          lucide.createIcons();
        }
      }, 10);
    });
  }
});
