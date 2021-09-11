import icons from "url:../img/sprite.svg";
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

function renderSpinner(parentElement) {
  const markup = `
  <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>
  `;
  parentElement.innerHTML = "";
  parentElement.insertAdjacentHTML("afterbegin", markup);
}

// Load Anime
async function loadBook() {
  try {
    const id = window.location.hash.slice(1);

    console.log(id);

    renderSpinner(preview);
    // 1) Load Anime API
    const res = await fetch(
      // "https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC"
      `https://www.googleapis.com/books/v1/volumes/${id}`
    );
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`from API ${data.message} (${res.status})`);
    }

    let book = {
      id: data.id,
      title: data.volumeInfo.title,
      authors: data.volumeInfo.authors,
      publisher: data.volumeInfo.publisher,
      publishedDate: data.volumeInfo.publishedDate,
      description: data.volumeInfo.description,
      isbnType: data.volumeInfo.industryIdentifiers[0].type,
      isbn: data.volumeInfo.industryIdentifiers[0].identifier,
      pages: data.volumeInfo.pageCount,
      categories: Array.isArray(data.volumeInfo.categories)
        ? data.volumeInfo.categories[0]
        : data.volumeInfo.categories,
      rate: data.volumeInfo.averageRating,
      imageLink: data.volumeInfo.imageLinks.thumbnail,
      language: data.volumeInfo.language,
      isForSale: data.saleInfo.saleability,
    };

    // 2) Render anime
    const markup = `
      <div class="preview__book p-m">
        <div class="preview__book-top">
          <div class="preview__heading">
            <h1 class="heading heading__1 preview__book-title">${book.title}</h1>
          </div>
          <svg class="btn btn__close icon">
            <use xlink:href="${icons}#icon-plus"></use>
          </svg>
        </div>
        <div class="preview__book-mid m-t-m">
          <div class="preview__book-left m-r-s">
            <img src="${book.imageLink}" alt="${book.title}" class="preview__book-img">
          </div>
          <ul class="preview__book-right">
            <li class="preview__book-info price">
              price: <span class="light">${book.isForSale}</span>
            </li>
            <li class="preview__book-info category">
              category: <span class="light">${book.categories}</span>
            </li>
            <li class="preview__book-info year">
              year: <span class="light">${book.publishedDate} </span>
            </li>
            <li class="preview__book-info pages">
              pages: <span class="light">${book.pages} </span>
            </li>
            <li class="preview__book-info isbn">
            ${book.isbnType}: <span class="light">${book.isbn}</span>
            </li>
            <li class="preview__book-info rate">
              rate: <span class="light">${book.rate}</span>
            </li>
          </ul>
        </div>
        <div class="preview__book-bottom m-t-m">
          <h5 class="preview__book-info prologue">Prologue:</h5>
          <p class="paragraph light">
          ${book.description}
          </p>
        </div>
        <div class="preview__book-button m-t-b m-b-m">
          <button class="btn btn__download">Download / Buy</button>
        </div>
      </div>

    `;

    preview.innerHTML = "";
    preview.insertAdjacentHTML("afterbegin", markup);
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener("hashchange", loadBook);
