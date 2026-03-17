"use strict";

const searchInput = document.querySelector(".form-group .input");
const categoryBtns = document.querySelectorAll(".primary-btn[href]");

const runSimpleSearch = function () {
  const query = searchInput.value.trim().toLowerCase();

  for (let i = 0; i < categoryBtns.length; i++) {
    const btn = categoryBtns[i];
    const btnText = btn.innerText.toLowerCase();
    const column = btn.closest(".col-md-3, .col-xs-6");

    if (!column) {
      continue;
    }

    if (query === "" || btnText.indexOf(query) !== -1) {
      column.style.display = "";
    } else {
      column.style.display = "none";
    }
  }
};

if (searchInput) {
  searchInput.addEventListener("keyup", runSimpleSearch);
  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      runSimpleSearch();
    }
  });
}
