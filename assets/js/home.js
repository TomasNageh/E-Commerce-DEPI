"use strict";

const searchInput = document.querySelector(".header-search .input");
const searchButton = document.querySelector(".header-search .search-btn");
const cards = document.querySelectorAll(".shop, .product");

const Search = function () {
  const query = searchInput.value.trim().toLowerCase();

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const cardTitle =
      card.querySelector(".shop-body h3, .product-name")?.innerText || "";
    const cardCategory =
      card.querySelector(".product-category")?.innerText || "";
    const cardText = `${cardTitle} ${cardCategory}`.toLowerCase();
    const column = card.closest(".col-md-4, .col-md-3, .col-xs-6");

    if (!column) {
      continue;
    }

    if (query === "" || cardText.indexOf(query) !== -1) {
      column.style.display = "";
    } else {
      column.style.display = "none";
    }
  }
};

if (searchInput && searchButton) {
  searchButton.addEventListener("click", Search);

  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      Search();
    }
  });
}
