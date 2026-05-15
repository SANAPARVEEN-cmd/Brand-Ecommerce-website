// ===============================
// LOAD HEADER & FOOTER
// ===============================

fetch("header.html")
.then(r=>r.text())
.then(d=>document.getElementById("header").innerHTML=d);

fetch("footer.html")
.then(r=>r.text())
.then(d=>document.getElementById("footer").innerHTML=d);


// ===============================
// STORAGE
// ===============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let saved = JSON.parse(localStorage.getItem("saved")) || [];

let discount = 0;

const cartContainer = document.getElementById("cartContainer");
const cartCount = document.getElementById("cart-count");

const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");


// ===============================
// RENDER CART
// ===============================

function renderCart(){

  cartContainer.innerHTML = "";

  if(cart.length === 0){

    cartContainer.innerHTML = `
      <div class="empty-cart">
        <h3>Your cart is empty</h3>
      </div>
    `;

    cartCount.innerText = 0;

    updateTotals();

    return;
  }

  cart.forEach((item,index)=>{

    cartContainer.innerHTML += `
      <div class="product-card">

        <div class="product-info">

          <figure>
            <img src="${item.image}" alt="${item.name}">
          </figure>

          <div class="product-text">

            <h4>${item.name}</h4>

            <p>
              Brand: ${item.brand}
            </p>

            <div class="buttons">

              <button 
                class="remove-btn"
                onclick="removeItem(${index})"
              >
                <i class="fa-solid fa-trash"></i>
                Remove
              </button>

              <button 
                class="save-btn"
                onclick="saveForLater(${index})"
              >
                <i class="fa-regular fa-bookmark"></i>
                Save for later
              </button>

            </div>

          </div>

        </div>

        <aside class="product-price">

          <h3>$${item.price}</h3>

          <select onchange="changeQty(${index},this.value)">

            <option value="1" ${item.quantity==1?"selected":""}>Qty: 1</option>

            <option value="2" ${item.quantity==2?"selected":""}>Qty: 2</option>

            <option value="3" ${item.quantity==3?"selected":""}>Qty: 3</option>

            <option value="4" ${item.quantity==4?"selected":""}>Qty: 4</option>

          </select>

        </aside>

      </div>
    `;
  });

  cartCount.innerText = cart.length;

  updateTotals();
}




// ===============================
// REMOVE ITEM
// ===============================

function removeItem(index){
  cart.splice(index,1);
  localStorage.setItem("cart",JSON.stringify(cart));
  renderCart();
}


// ===============================
// SAVE FOR LATER
// ===============================

function saveForLater(index){

  let item = cart[index];

  saved.push(item);

  cart.splice(index,1);

  localStorage.setItem("cart",JSON.stringify(cart));
  localStorage.setItem("saved",JSON.stringify(saved));

  renderCart();

  alert("Item saved for later!");
}


// ===============================
// MOVE BACK TO CART
// ===============================

function moveToCart(index){

  let item = saved[index];

  cart.push(item);

  saved.splice(index,1);

  localStorage.setItem("cart",JSON.stringify(cart));
  localStorage.setItem("saved",JSON.stringify(saved));

  renderCart();
}


// ===============================
// CHANGE QUANTITY
// ===============================

function changeQty(index,value){
  cart[index].quantity = parseInt(value);
  localStorage.setItem("cart",JSON.stringify(cart));
  updateTotals();
}


// ===============================
// COUPON SYSTEM
// ===============================

document.querySelector(".coupon button").addEventListener("click", ()=>{

  let code = document.querySelector(".coupon input").value;

  if(code === "SAVE10"){
    discount = 10;
    alert("Coupon Applied: $10 OFF");
  }
  else if(code === "SAVE20"){
    discount = 20;
    alert("Coupon Applied: $20 OFF");
  }
  else{
    discount = 0;
    alert("Invalid Coupon");
  }

  updateTotals();
});


// ===============================
// TOTAL CALCULATION
// ===============================

function updateTotals(){

  let subtotal = 0;

  cart.forEach(item=>{
    subtotal += item.price * item.quantity;
  });

  let total = subtotal - discount;

  if(total < 0) total = 0;

  subtotalEl.innerText = "$" + subtotal.toFixed(2);
  totalEl.innerText = "$" + total.toFixed(2);
}


// ===============================
// CHECKOUT BUTTON
// ===============================

document.querySelector(".checkout button").addEventListener("click", ()=>{

  if(cart.length === 0){
    alert("Cart is empty!");
    return;
  }

  let total = totalEl.innerText;

  alert("Order Placed Successfully!\nTotal Paid: " + total);

  cart = [];
  discount = 0;

  localStorage.setItem("cart",JSON.stringify(cart));

  renderCart();
});

// ===============================
// CLEAR ENTIRE CART
// ===============================

function clearCart(){

  if(cart.length === 0){
    alert("Cart is already empty!");
    return;
  }

  let confirmDelete = confirm(
    "Are you sure you want to remove all products?"
  );

  if(confirmDelete){

    cart = [];

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    renderCart();

    alert("All products removed successfully!");
  }
}

// INITIAL LOAD
renderCart();