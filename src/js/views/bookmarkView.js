import View from "./View";

class BookmarksView extends View {
  _parentElement = document.querySelector(".recently__books");
  _btnBookmarks = document.querySelector(".favorites");
  _btnsPagination = document.querySelector(".pagination");

  addHandlerRender(handler) {
    this._btnBookmarks.addEventListener("click", () => {
      console.log("Clicked");
      handler();
      this._btnsPagination.style.display = "none";
    });
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupResult).join("");
  }

  _generateMarkupResult(result) {
    return `
      <a  href="#${result.id}" class="book">
        <img src="${result.imageLink}" alt="${result.title}" class="book__img">
        <div class="book__info">
          <h4 class="heading heading__4 book__title">${result.title}</h4>
          <h5 class="heading heading__5 book__author">${result.authors}</h5>
        </div>
      </a>
    `;
  }
}

export default new BookmarksView();
