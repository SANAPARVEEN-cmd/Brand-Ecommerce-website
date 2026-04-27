// CATEGORY DROPDOWN
const categoryBtn = document.getElementById("categoryBtn");
const dropdown = document.getElementById("categoryDropdown");

categoryBtn.addEventListener("click", () => {
  dropdown.style.display =
    dropdown.style.display === "flex" ? "none" : "flex";
});

// SEARCH SUGGESTIONS
const input = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("suggestionsBox");

const data = [
  "Laptop",
  "Mobile",
  "Headphones",
  "Shoes",
  "Watch",
  "Camera"
];

input.addEventListener("input", () => {
  let value = input.value.toLowerCase();
  suggestionsBox.innerHTML = "";

  if (value === "") {
    suggestionsBox.style.display = "none";
    return;
  }

  let filtered = data.filter(item =>
    item.toLowerCase().includes(value)
  );

  filtered.forEach(item => {
    let div = document.createElement("div");
    div.innerText = item;
    div.onclick = () => {
      input.value = item;
      suggestionsBox.style.display = "none";
    };
    suggestionsBox.appendChild(div);
  });

  suggestionsBox.style.display = "block";
});