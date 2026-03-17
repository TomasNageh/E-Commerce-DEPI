"use strict";

let openProduct = null;
let allProducts = [];

const container = document.querySelector("#container");
const sidebar = document.querySelector("#product-sidebar");
const sidebarOverlay = document.querySelector("#sidebar-overlay");
const sidebarImg = document.querySelector("#sidebar-img");
const sidebarTitle = document.querySelector("#sidebar-title");
const sidebarPrice = document.querySelector("#sidebar-price");
const sidebarDescription = document.querySelector("#sidebar-description");
const sidebarQty = document.querySelector("#sidebar-qty");

const displayProducts = function (products) {
  container.insertAdjacentHTML(
    "beforeend",
    `<div class="row" id="products-row"></div>`,
  );
  const row = document.querySelector("#products-row");

  products.forEach(function (product, i) {
    const html = `
      <div class="col-md-3 col-xs-6">
        <div class="product" onclick="openSideBar(${i})">
          <div class="product-img">
            <img src="${product.images[0]}" alt="${product.title}" />
          </div>
          <div class="product-body">
            <p class="product-category">Accessory</p>
            <h3 class="product-name">${product.title}</h3>
            <h4 class="product-price">$${product.price}</h4>
          </div>
        </div>
      </div>
    `;
    row.insertAdjacentHTML("beforeend", html);
  });
};

const openSideBar = function (index) {
  openProduct = allProducts[index];

  sidebarImg.src = openProduct.images[0];
  sidebarImg.alt = openProduct.title;
  sidebarTitle.innerText = openProduct.title;
  sidebarPrice.innerText = `$${openProduct.price}`;
  sidebarDescription.innerText = openProduct.description;
  sidebarQty.value = 1;

  sidebarOverlay.classList.add("show");
  sidebar.classList.add("show");
};

const closeSideBar = function () {
  sidebarOverlay.classList.remove("show");
  sidebar.classList.remove("show");
};

const plus = function () {
  sidebarQty.value = Number(sidebarQty.value) + 1;
};

const minus = function () {
  if (Number(sidebarQty.value) > 1) {
    sidebarQty.value = Number(sidebarQty.value) - 1;
  }
};

const addToCart = function () {
  const product = {
    type: "accessory",
    image: openProduct.images[0],
    title: openProduct.title,
    description: openProduct.description,
    price: openProduct.price,
    quantity: sidebarQty.value,
  };

  const isExisting = localStorage.getItem(openProduct.id);
  if (isExisting) {
    const existingProduct = JSON.parse(isExisting);
    existingProduct.quantity =
      Number(existingProduct.quantity) + Number(sidebarQty.value);
    localStorage.setItem(openProduct.id, JSON.stringify(existingProduct));
  } else {
    localStorage.setItem(openProduct.id, JSON.stringify(product));
  }

  closeSideBar();
};

const loadProducts = async function () {
  const apiResponse = await fetch(
    "https://dummyjson.com/products/category/mobile-accessories",
  );
  const json = await apiResponse.json();
  console.log(json);

  allProducts = json.products;
  displayProducts(allProducts);
};

const runProductSearch = function () {
  const searchInput = document.querySelector("input[placeholder*='Search']");
  if (!searchInput) return;

  const query = searchInput.value.trim().toLowerCase();
  const productCards = document.querySelectorAll(".product");

  for (let i = 0; i < productCards.length; i++) {
    const card = productCards[i];
    const title = card.querySelector(".product-name")?.innerText || "";
    const category = card.querySelector(".product-category")?.innerText || "";
    const cardText = `${title} ${category}`.toLowerCase();
    const column = card.closest(".col-md-3, .col-xs-6");

    if (!column) continue;

    if (query === "" || cardText.indexOf(query) !== -1) {
      column.style.display = "";
    } else {
      column.style.display = "none";
    }
  }
};

sidebarOverlay.addEventListener("click", closeSideBar);

const searchInput = document.querySelector("input[placeholder*='Search']");
if (searchInput) {
  searchInput.addEventListener("keyup", runProductSearch);
  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      runProductSearch();
    }
  });
}

loadProducts();
