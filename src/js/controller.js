import * as model from "./model";
import bookView from "./views/bookView";
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";
import paginationView from "./views/paginationView";
import bookmarkView from "./views/bookmarkView";
import "core-js/stable";
import "regenerator-runtime/runtime";

console.log("Hellow");

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
    console.log(error);
  }
}

// Load Searched query
async function controllSearchQuery(page = 1) {
  try {
    resultsView.renderSpinner();
    // 1) Get query
    const query = searchView.getQuery();
    if (!query || query === "") return console.log("No query");

    // 2) Load the results
    // const { resultsPerPage } = model.state.search;
    const resultsPerPage = model.getResultsPage(page);
    await model.loadSearchResults(query, resultsPerPage);

    // 3) Render the results
    const results = model.state.search.results;
    resultsView.render(results);

    // 4) Render pagination btns
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
}

// Pagination
function controllPagination(goToPage) {
  controllSearchQuery(goToPage);
}

// Bookmarking
function controllBookmark() {
  // 1) Add or Remove Bookmark
  const { book } = model.state;
  if (!book.bookmarked) model.addBookmark(book);
  else model.removeBookmark(book.id);

  // 2) Update the Ui
  bookView.update(book);
}

function controllRenderBookmarks() {
  // 3) Render bookmarks
  const bookmarks = model.state.bookmarks;
  bookmarkView.render(bookmarks);
}

(function () {
  bookmarkView.addHandlerRender(controllRenderBookmarks);
  bookView.addHandlerRender(controllBook);
  bookView.addHandlerPreview();
  bookView.addHandlerBookmark(controllBookmark);
  searchView.addHandlerSearch(controllSearchQuery);
  paginationView.addHandlerPagination(controllPagination);
})();
