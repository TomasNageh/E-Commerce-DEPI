<<<<<<< HEAD
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
            <p class="product-category">Phone</p>
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
    type: "phone",
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
    "https://dummyjson.com/products/category/smartphones",
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
=======
// phone products API with filtering
// https://dummyjson.com/products/search?q=phone

let xhr = new XMLHttpRequest();
xhr.open("GET", "https://dummyjson.com/products/search?q=phone");
xhr.onload = () => {
    let data = JSON.parse(xhr.responseText);
    let allProducts = data.products;
    
    // Filter to only include actual phones (exclude accessories)
    let phones = allProducts.filter(product => {
        let title = product.title.toLowerCase();
        let category = product.category.toLowerCase();
        
        // Exclude accessories like airpods, chargers, cases, screen protectors, etc.
        let excludeKeywords = [
            'airpod', 'earphone', 'earbuds', 'charger', 'cable', 'case',
            'screen protector', 'tempered glass', 'holder', 'stand',
            'adapter', 'battery', 'power bank', 'usb'
        ];
        
        // Include only if it's a phone
        let phoneKeywords = ['phone', 'smartphone', 'mobile'];
        
        // Check if it's actually a phone
        let isPhone = phoneKeywords.some(keyword => title.includes(keyword) || category.includes(keyword));
        
        // Check if it's an excluded accessory
        let isAccessory = excludeKeywords.some(keyword => title.includes(keyword));
        
        return isPhone && !isAccessory;
    });
    
    console.log(phones);
    showProducts(phones);
}
xhr.send();

let openProduct = null;

function showProducts(products) {
    let container = document.querySelector("#container");
    let row = document.createElement("div");
    row.className = "row";

    if(products.length === 0) {
        container.innerHTML = "<p style='text-align:center; padding:20px;'>No phones available</p>";
        return;
    }

    for(let i=0; i<products.length; i++) {
        let col = document.createElement("div");
        col.className = "col-md-3 col-xs-6";

        let card = document.createElement("div");
        card.className = "product";
        card.innerHTML = 
        `<div class="product-img">
            <img src="${products[i].images[0]}" alt="${products[i].title}">
        </div>
        <div class="product-body">
            <p class="product-category">Phone</p>
            <h3 class="product-name">${products[i].title}</h3>
            <h4 class="product-price">$ ${products[i].price}</h4>
        </div>`;
        
        let product = products[i];
        card.addEventListener("click", () => {
            openProduct = product;
            document.getElementById("sidebar-img").src = product.images[0];
            document.getElementById("sidebar-img").alt = product.title;
            document.getElementById("sidebar-title").innerText = product.title;
            document.getElementById("sidebar-price").innerText = "$ " + product.price;
            document.getElementById("sidebar-description").innerText = product.description;
            document.getElementById("sidebar-qty").value = 1;
            document.getElementById("sidebar-overlay").classList.add("show");
            document.getElementById("product-sidebar").classList.add("show");
        });
        
        col.appendChild(card);
        row.appendChild(col);
    }
    container.appendChild(row);
}   

function closeSideBar() {
    document.getElementById("sidebar-overlay").classList.remove("show");
    document.getElementById("product-sidebar").classList.remove("show");
}

function plus() {
    let qty = document.getElementById("sidebar-qty");
    qty.value = Number(qty.value) + 1;
}

function minus() {
    let qty = document.getElementById("sidebar-qty");
    if(Number(qty.value) > 1) {
        qty.value = Number(qty.value) - 1;
    }
}

function addToCard() {
    let qty = document.getElementById("sidebar-qty");
    let product = {
        "type":"phone",
        "image":openProduct.images[0],
        "title":openProduct.title,
        "description":openProduct.description,
        "price":openProduct.price,
        "quantity":qty.value,
    };
    console.log(product);
    let productString = JSON.stringify(product);
    console.log(productString);
    
    let isExisting = localStorage.getItem(openProduct.id)
    if(isExisting) {
        let existingProduct = JSON.parse(isExisting);
        existingProduct.quantity = Number(existingProduct.quantity) + Number(qty.value);
        localStorage.setItem(openProduct.id, JSON.stringify(existingProduct));
    }
    else {
        localStorage.setItem(openProduct.id, productString);
    }
    closeSideBar();
}
>>>>>>> 9c8ca47473bd236b4f3b396c369dd53b2e9b2ee8
