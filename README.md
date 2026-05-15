# Brand Ecommerce (Vanilla JS)

A lightweight, single-developer front-end ecommerce demo built with plain **HTML + CSS + JavaScript** (no framework). It includes:

- Home page (landing + featured products)
- Category browsing with search/filter/sort
- Product details page with image gallery + tabs
- Add-to-cart / cart page with quantity updates, remove/save-for-later, coupon discounts, and checkout
- Header/footer loaded dynamically from `header.html` and `footer.html`

> Note: This project is client-side only. Product data is hardcoded in `products.js` and cart state is stored in `localStorage`.

---

## Project Structure

```text
.
├─ index.html
├─ script.js
├─ products.js
├─ header.html / header.css / header.js
├─ footer.html / footer.css
├─ category.html / category.css / category.js
├─ details.html / details.css / details.js
├─ addtocart.html / addtocart.css / addtocart.js
├─ content.css
└─ assets/
   └─ Image/ ... (product & UI images)
```

---

## Pages & Behavior

### 1) `index.html`
Landing page that loads:
- `header.html` into `#header` via `script.js`
- `footer.html` into `#footer` via `script.js`

`script.js` uses `products.js` data to render and (optionally) filter products in the “electronic items” section.

---

### 2) `category.html`
Category browsing page.

Driven by:
- `products.js` (product list)
- `category.js` (render + filtering)

Filtering includes:
- Search by product name (input)
- Category (radio buttons)
- Brands (checkboxes)
- Features (checkboxes)
- Price range (radio)
- Rating (radio)
- Sorting (select: low→high / high→low)

Products are rendered into `#productsGrid` and “Add To Cart” redirects to `addtocart.html`.

---

### 3) `details.html`
Product detail view.

Driven by `details.js`:
- Loads `header.html` and `footer.html` into the page
- Image gallery:
  - Clicking thumbnails (`.small-img`) updates the main image (`#bigImage`)
- Tabs:
  - Buttons with `.tab-btn` and `data-tab="..."` switch content blocks `.tab-content`

---

### 4) `addtocart.html`
Cart page.

Driven by `addtocart.js`:
- Loads `header.html` and `footer.html`
- Reads cart state from `localStorage.getItem('cart')`
- Renders cart items into `#cartContainer`

Cart features:
- Remove item
- Save for later (moves item from `cart` array to `saved` array)
- Quantity change (dropdown 1–4)
- Coupon codes (in the coupon input):
  - `SAVE10` → subtract $10
  - `SAVE20` → subtract $20
- Checkout button:
  - Shows an alert with the final total
  - Empties the cart
- Clear cart button (Remove All Products)

---

## How Cart Works (localStorage)

- `localStorage.cart` stores an array of cart items:
  - Each item includes: `id`, `name`, `category`, `brand`, `feature`, `price`, `rating`, `image`, and `quantity`
- `localStorage.saved` stores an array of items saved for later.

When you click **Add To Cart** on `category.html`, the product is appended to `localStorage.cart` (or quantity is incremented if already present) and you are redirected to `addtocart.html`.

---

## Running the Project

Because this is a pure static front-end, you can run it by opening the HTML files directly:

1. Open `index.html` in your browser.
2. Navigate to other pages using the links.

Recommended (to avoid some browser restrictions):
- Use a simple static server (VSCode Live Server or any local HTTP server).

---

## Customization

### Update Products
Edit `products.js`.

Each product object should contain:
- `id` (number)
- `mainCategory` (string)
- `category` (phone/laptop/headphone/watch, used by category filters)
- `name`, `brand`, `feature`
- `price` (number)
- `rating` (number)
- `image` (path to an asset)

### Header/Footer
Update `header.html` / `footer.html` and refresh pages.

---

## Known Limitations

- Coupon discount is applied as a fixed amount (`$10` or `$20`) rather than a percentage.
- Coupon input selector assumes elements exist on the cart page: `.coupon input` and `.coupon button`.
- Quantity dropdown is currently limited to `1..4`.
- No real backend/checkout; checkout is simulated with alerts and clearing cart.

---

## License

Add your license here (e.g., MIT).
