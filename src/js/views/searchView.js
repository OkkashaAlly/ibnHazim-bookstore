class SearchView {
  _parentElement = document.querySelector(".header__search");

  getQuery() {
    const query = this._parentElement.querySelector(
      ".header__search-input"
    ).value;
    // this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector(".header__search-input").value = "";
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
