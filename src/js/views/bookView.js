import icons from "url:../../img/sprite.svg";

class BookView {
  _parentElement = document.querySelector(".buy");
  _data;

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  _generateMarkup() {
    return `
      <div class="preview__book p-m">
        <div class="preview__book-top">
          <div class="preview__heading">
            <h1 class="heading heading__1 preview__book-title">${this._data.title}</h1>
          </div>
          <svg class="btn btn__close icon">
            <use xlink:href="${icons}#icon-plus"></use>
          </svg>
        </div>
        <div class="preview__book-mid m-t-m">
          <div class="preview__book-left m-r-s">
            <img src="${this._data.imageLink}" alt="${this._data.title}" class="preview__book-img">
          </div>
          <ul class="preview__book-right">
            <li class="preview__book-info price">
              price: <span class="light">${this._data.isForSale}</span>
            </li>
            <li class="preview__book-info category">
              category: <span class="light">${this._data.categories}</span>
            </li>
            <li class="preview__book-info year">
              year: <span class="light">${this._data.publishedDate} </span>
            </li>
            <li class="preview__book-info pages">
              pages: <span class="light">${this._data.pages} </span>
            </li>
            <li class="preview__book-info isbn">
            ${this._data.isbnType}: <span class="light">${this._data.isbn}</span>
            </li>
            <li class="preview__book-info rate">
              rate: <span class="light">${this._data.rate}</span>
            </li>
          </ul>
        </div>
        <div class="preview__book-bottom m-t-m">
          <h5 class="preview__book-info prologue">Prologue:</h5>
          <p class="paragraph light">
          ${this._data.description}
          </p>
        </div>
        <div class="preview__book-button m-t-b m-b-m">
          <button class="btn btn__download">Download / Buy</button>
        </div>
      </div>

    `;
  }
}

export default new BookView();
