// ============================
// HEADER / FOOTER LOAD
// ============================

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


// ============================
// ELEMENTS
// ============================

const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const productCount = document.getElementById("productCount");
const sortSelect = document.getElementById("sortSelect");


// ============================
// RENDER PRODUCTS
// ============================

function displayProducts(list) {
  productsGrid.innerHTML = "";

  productCount.innerText = list.length;

  if (list.length === 0) {
    productsGrid.innerHTML = `<p style="padding:20px;">No products found</p>`;
    return;
  }

  list.forEach(product => {
    productsGrid.innerHTML += `
      <div class="product-card">

        <img src="${product.image}" alt="${product.name}">

        <div class="product-info">

          <h3>${product.name}</h3>

          <p class="price">$${product.price}</p>

          <p class="brand">Brand: ${product.brand}</p>

          <p class="rating">${"★".repeat(product.rating)}</p>

          <span class="feature-tag">${product.feature}</span>

          <button class="buy-btn" onclick="addToCart(${product.id})">
            Add To Cart
          </button>

        </div>

      </div>
    `;
  });
}


// ============================
// FILTER SYSTEM
// ============================

function filterProducts() {

  let filtered = [...products];

  // SEARCH
  const search = searchInput.value.toLowerCase();

  filtered = filtered.filter(p =>
    p.name.toLowerCase().includes(search)
  );


  // CATEGORY
  const category = document.querySelector('input[name="category"]:checked')?.value;

  if (category && category !== "all") {
    filtered = filtered.filter(p => p.category === category);
  }


  // BRAND
  const brands = [...document.querySelectorAll(".brand-filter:checked")]
    .map(el => el.value);

  if (brands.length) {
    filtered = filtered.filter(p => brands.includes(p.brand));
  }


  // FEATURE
  const features = [...document.querySelectorAll(".feature-filter:checked")]
    .map(el => el.value);

  if (features.length) {
    filtered = filtered.filter(p => features.includes(p.feature));
  }


  // PRICE
  const price = document.querySelector('input[name="price"]:checked')?.value;

  if (price === "100") {
    filtered = filtered.filter(p => p.price < 100);
  }
  else if (price === "500") {
    filtered = filtered.filter(p => p.price >= 100 && p.price <= 500);
  }
  else if (price === "1000") {
    filtered = filtered.filter(p => p.price > 500);
  }


  // RATING
  const rating = document.querySelector('input[name="rating"]:checked')?.value;

  if (rating !== "all") {
    filtered = filtered.filter(p => p.rating >= Number(rating));
  }


  // SORT
  if (sortSelect.value === "low-high") {
    filtered.sort((a, b) => a.price - b.price);
  }
  else if (sortSelect.value === "high-low") {
    filtered.sort((a, b) => b.price - a.price);
  }


  displayProducts(filtered);
}


// ============================
// EVENT LISTENERS
// ============================

searchInput.addEventListener("input", filterProducts);
sortSelect.addEventListener("change", filterProducts);

document.querySelectorAll("input").forEach(input => {
  input.addEventListener("change", filterProducts);
});


// ============================
// ADD TO CART (LOCALSTORAGE)
// ============================

function addToCart(productId) {

  const product = products.find(p => p.id === productId);

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  // redirect to cart page
  window.location.href = "addtocart.html";
}


// ============================
// INITIAL LOAD
// ============================

filterProducts();