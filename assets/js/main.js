// Initialize theme synchronously to prevent FOUC
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

document.addEventListener("DOMContentLoaded", () => {
  // --- Lightbox Logic ---
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");
  const gridImages = document.querySelectorAll("img[data-full]");

  if (lightbox && lightboxImg && lightboxClose) {
    // Open lightbox
    gridImages.forEach((img) => {
      img.addEventListener("click", () => {
        const fullSrc = img.getAttribute("data-full");
        if (fullSrc) {
          lightboxImg.src = fullSrc;
          lightbox.classList.remove("hidden");
        }
      });
    });

    // Close lightbox function
    const closeLightbox = () => {
      lightbox.classList.add("hidden");
      lightboxImg.src = ""; // reset src
    };

    // Close on button click
    lightboxClose.addEventListener("click", closeLightbox);

    // Close on background click
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !lightbox.classList.contains("hidden")) {
        closeLightbox();
      }
    });
  }

  // --- Dark Mode Toggle Logic ---
  const toggleBtn = document.getElementById('theme-toggle');
  const lightIcon = document.getElementById('theme-toggle-light-icon');
  const darkIcon = document.getElementById('theme-toggle-dark-icon');

  if (toggleBtn && lightIcon && darkIcon) {
    // Set initial icon visibility
    if (document.documentElement.classList.contains('dark')) {
      lightIcon.classList.remove('hidden');
      darkIcon.classList.add('hidden');
    } else {
      lightIcon.classList.add('hidden');
      darkIcon.classList.remove('hidden');
    }

    // Toggle event
    toggleBtn.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      if (document.documentElement.classList.contains('dark')) {
        localStorage.theme = 'dark';
        lightIcon.classList.remove('hidden');
        darkIcon.classList.add('hidden');
      } else {
        localStorage.theme = 'light';
        lightIcon.classList.add('hidden');
        darkIcon.classList.remove('hidden');
      }
    });
  }

});
