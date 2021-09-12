import * as model from "./model";
import bookView from "./views/bookView";
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";

import "core-js/stable";
import "regenerator-runtime/runtime";

console.log("Hellow");

const preview = document.querySelector(".buy");
const app = document.querySelector(".app");
const closeBtn = document.querySelector(".btn__close");

/*
function openPreview(e) {
  if (e.target.closest(".book")) {
    preview.style.transform = "translateX(0)";
    app.removeEventListener("click", openPreview);
  }
}

function closePreview(e) {
  if (e.target.closest(".btn__close")) {
    preview.style.transform = "translateX(50rem)";
    app.addEventListener("click", openPreview);
  }
}

app.addEventListener("click", openPreview);
preview.addEventListener("click", closePreview);
*/
////////////////////////////////////
// https://api.aniapi.com/v1/anime/11
// https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC

// Load Book
async function controllBook() {
  try {
    // 0) Get id from URL
    const id = window.location.hash.slice(1);
    if (!id) return;

    // render spinner
    bookView.renderSpinner();

    // 1) Load book API
    await model.loadBook(id);
    const { book } = model.state;

    // 2) Render anime
    bookView.render(book);
  } catch (error) {
    bookView.renderError();
  }
}

// Load Searched query
async function controllSearchQuery() {
  try {
    // 1) Get query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load the results
    await model.loadSearchResults(query);

    // 3) Render the results
    const results = model.state.search.results;
    resultsView.renderSpinner();
    resultsView.render(results);
  } catch (error) {
    console.log(error);
  }
}

(function () {
  bookView.addHandlerRender(controllBook);
  searchView.addHandlerSearch(controllSearchQuery);
})();
