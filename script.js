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


    // PRODUCT CONTAINER
const productsContainer = document.querySelector(".items-sideright");

// FILTER BUTTONS
const filterButtons = document.querySelectorAll(".filter-btn");

// SEARCH INPUT
const searchInput = document.querySelector("#searchInput");



// =========================
// DISPLAY PRODUCTS
// =========================

function displayProducts(productArray){

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
// SHOW ALL PRODUCTS FIRST
// =========================

displayProducts(products);




// =========================
// FILTER PRODUCTS
// =========================

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    const category = button.dataset.filter;

    if(category === "all"){

      displayProducts(products);

    }

    else{

      const filteredProducts = products.filter(product => 
        product.category === category
      );

      displayProducts(filteredProducts);

    }

  });

});




// =========================
// SEARCH PRODUCTS
// =========================

searchInput.addEventListener("keyup", () => {

  const searchValue = searchInput.value.toLowerCase();

  const searchedProducts = products.filter(product =>

    product.name.toLowerCase().includes(searchValue)

  );

  displayProducts(searchedProducts);

});