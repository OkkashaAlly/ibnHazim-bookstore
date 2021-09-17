import View from "./View";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination__wrapper");

  addHandlerPagination(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btnNxt = e.target.closest(".btn__pagination-next");
      const btnPrv = e.target.closest(".btn__pagination-prev");
      if (!btnNxt && !btnPrv) return;
      if (btnNxt) {
        console.log(btnNxt);
        let goToPage = +btnNxt.dataset.goto;
        return handler(goToPage);
      }
      if (btnPrv) {
        console.log(btnPrv);
        let goToPage = +btnPrv.dataset.goto;
        return handler(goToPage);
      }
    });
  }

  _generateMarkup() {
    console.log(this._data);
    let currPage = this._data.page;
    // a) First Page
    if (currPage === 1) {
      return `
      <button data-goto="${
        currPage + 1
      }" class="btn btn__pagination btn__pagination-next">
        next
      </button>
      `;
    }
    // b) other pages
    if (currPage > 1) {
      return `
      
      <button data-goto="${
        currPage - 1
      }" class="btn btn__pagination btn__pagination-prev">
        prev
      </button>
      <button data-goto="${
        currPage + 1
      }" class="btn btn__pagination btn__pagination-next">
        next
      </button>

      `;
    }
  }
}

export default new PaginationView();
