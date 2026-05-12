fetch("header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;
  });

fetch("footer.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  });
const smallImages = document.querySelectorAll(".small-img");
const bigImage = document.getElementById("bigImage");

smallImages.forEach((img) => {

    img.addEventListener("click", () => {

        bigImage.src = img.src;

        smallImages.forEach((item) => {
            item.classList.remove("active");
        });

        img.classList.add("active");

    });

});

// =========================
// TABS
// =========================

const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const tab = button.dataset.tab;

        // remove active
        tabButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        tabContents.forEach((content) => {
            content.classList.remove("active");
        });

        // add active
        button.classList.add("active");

        document.getElementById(tab).classList.add("active");

    });

});