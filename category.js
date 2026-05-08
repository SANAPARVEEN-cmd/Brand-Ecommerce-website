// ============================
// HEADER
// ============================

fetch("header.html")
    .then((res) => res.text())
    .then((data) => {
        document.getElementById("header").innerHTML = data;
    });

// ============================
// FOOTER
// ============================

fetch("footer.html")
    .then((res) => res.text())
    .then((data) => {
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
// DISPLAY PRODUCTS
// ============================

function displayProducts(productsArray) {
    productsGrid.innerHTML = "";

    productCount.innerText = productsArray.length;

    productsArray.forEach((product) => {
        productsGrid.innerHTML += `

      <div class="product-card">

        <img src="${product.image}" alt="${product.name}">

        <div class="product-info">

          <h3>${product.name}</h3>

          <p class="price">$${product.price}</p>

          <p class="brand">Brand: ${product.brand}</p>

          <p class="rating">
            ${"★".repeat(product.rating)}
          </p>

          <span class="feature-tag">
            ${product.feature}
          </span>

         <button 
         class="buy-btn"
        onclick="addToCart(${product.id})"
        >
         Add To Cart
         </button>
        </div>

      </div>

    `;
    });
}

// ============================
// FILTER PRODUCTS
// ============================

function filterProducts() {
    let filteredProducts = [...products];

    // SEARCH FILTER
    const searchValue = searchInput.value.toLowerCase();

    filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchValue),
    );

    // CATEGORY FILTER
    const selectedCategory = document.querySelector(
        'input[name="category"]:checked',
    ).value;

    if (selectedCategory !== "all") {
        filteredProducts = filteredProducts.filter(
            (product) => product.category === selectedCategory,
        );
    }

    // BRAND FILTER
    const selectedBrands = [
        ...document.querySelectorAll(".brand-filter:checked"),
    ].map((input) => input.value);

    if (selectedBrands.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
            selectedBrands.includes(product.brand),
        );
    }

    // FEATURE FILTER
    const selectedFeatures = [
        ...document.querySelectorAll(".feature-filter:checked"),
    ].map((input) => input.value);

    if (selectedFeatures.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
            selectedFeatures.includes(product.feature),
        );
    }

    // PRICE FILTER
    const selectedPrice = document.querySelector(
        'input[name="price"]:checked',
    ).value;

    if (selectedPrice === "100") {
        filteredProducts = filteredProducts.filter(
            (product) => product.price < 100,
        );
    } else if (selectedPrice === "500") {
        filteredProducts = filteredProducts.filter(
            (product) => product.price >= 100 && product.price <= 500,
        );
    } else if (selectedPrice === "1000") {
        filteredProducts = filteredProducts.filter(
            (product) => product.price > 500,
        );
    }

    // RATING FILTER
    const selectedRating = document.querySelector(
        'input[name="rating"]:checked',
    ).value;

    if (selectedRating !== "all") {
        filteredProducts = filteredProducts.filter(
            (product) => product.rating >= Number(selectedRating),
        );
    }

    // SORTING
    const sortValue = sortSelect.value;

    if (sortValue === "low-high") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === "high-low") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    displayProducts(filteredProducts);
}

// ============================
// EVENT LISTENERS
// ============================

searchInput.addEventListener("keyup", filterProducts);

sortSelect.addEventListener("change", filterProducts);

document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", filterProducts);
});

// ============================
// ADD TO CART
// ============================

function addToCart(productId){

  // FIND PRODUCT
  const selectedProduct = products.find(product =>
    product.id === productId
  );


  // GET EXISTING CART
  let cart = JSON.parse(localStorage.getItem("cart")) || [];


  // CHECK IF PRODUCT ALREADY EXISTS
  const existingProduct = cart.find(item =>
    item.id === productId
  );


  if(existingProduct){

    existingProduct.quantity += 1;

  }

  else{

    cart.push({
      ...selectedProduct,
      quantity:1
    });

  }


  // SAVE UPDATED CART
  localStorage.setItem("cart", JSON.stringify(cart));


  // OPTIONAL ALERT
 window.location.href = "addtocart.html";

}
// ============================
// INITIAL DISPLAY
// ============================

filterProducts();
