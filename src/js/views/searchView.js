class SearchView {
  _parentElement = document.querySelector(".header__search");
  _searchInput = document.querySelector(".header__search-input");
  _preview = document.querySelector(".buy");

  getQuery() {
    const query = this._searchInput.value;
    // this._clearInput();
    return query;
  }

  _clearInput() {
    this._searchInput.value = "";
  }

  _closePreview() {
    if ((this._preview.style.transform = "translateX(0px)")) {
      this._preview.style.transform = "translateX(50rem)";
    }
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", (e) => {
      this._closePreview();
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
