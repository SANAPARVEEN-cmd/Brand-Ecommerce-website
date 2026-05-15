// =========================
// HEADER + FOOTER LOAD
// =========================

document.addEventListener("DOMContentLoaded", () => {

  const header = document.getElementById("header");
  const footer = document.getElementById("footer");

  if (header) {
    fetch("header.html")
      .then(res => res.text())
      .then(data => header.innerHTML = data);
  }

  if (footer) {
    fetch("footer.html")
      .then(res => res.text())
      .then(data => footer.innerHTML = data);
  }

  initGallery();
  initTabs();
});


// =========================
// IMAGE GALLERY
// =========================

function initGallery() {

  const smallImages = document.querySelectorAll(".small-img");
  const bigImage = document.getElementById("bigImage");

  if (!bigImage || smallImages.length === 0) return;

  smallImages.forEach(img => {

    img.addEventListener("click", () => {

      // change main image
      bigImage.src = img.src;

      // active class handling
      smallImages.forEach(i => i.classList.remove("active"));
      img.classList.add("active");

    });

  });
}


// =========================
// TABS SYSTEM
// =========================

function initTabs() {

  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  if (tabButtons.length === 0 || tabContents.length === 0) return;

  tabButtons.forEach(btn => {

    btn.addEventListener("click", () => {

      const target = btn.dataset.tab;

      // remove active from all
      tabButtons.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));

      // activate current
      btn.classList.add("active");

      const targetContent = document.getElementById(target);
      if (targetContent) {
        targetContent.classList.add("active");
      }

    });

  });
}