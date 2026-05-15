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


// =========================
// ELEMENTS
// =========================

const productsContainer = document.querySelector(".items-sideright");
const searchInput = document.querySelector("#searchInput");

// =========================
// DISPLAY PRODUCTS
// =========================

function displayProducts(productArray){

  if(!productsContainer) return;

  productsContainer.innerHTML = "";

  productArray.forEach(product => {

    productsContainer.innerHTML += `
      <div class="product-card">

        <img src="${product.image}" alt="${product.name}"/>

        <div class="product-info">
          <h3>${product.name}</h3>
          <p>USD ${product.price}</p>
        </div>

      </div>
    `;
  });
}

// =========================
// INIT
// =========================

displayProducts(products);

// =========================
// SEARCH FUNCTION
// =========================

if(searchInput){

  searchInput.addEventListener("input", () => {

    const value = searchInput.value.toLowerCase();

    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(value)
    );

    displayProducts(filtered);
  });

}