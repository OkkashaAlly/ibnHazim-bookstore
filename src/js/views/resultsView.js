import View from "./View";

class ResultsView extends View {
  _parentElement = document.querySelector(".recently__books");

  _generateMarkup() {
    return this._data.map(this._generateMarkupResult).join("");
  }

  _generateMarkupResult(result) {
    console.log(result);
    return `
      <a  href="#p1v6DwAAQBAJ" class="book">
        <img src="${result.imageLink}" alt="${result.title}" class="book__img">
        <div class="book__info">
          <h4 class="heading heading__4 book__title">${result.title}</h4>
          <h5 class="heading heading__5 book__author">${result.authors}</h5>
        </div>
      </a>
    `;
  }
}

export default new ResultsView();
