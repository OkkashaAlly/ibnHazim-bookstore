import { API_URL, RES_PER_PAGE } from "./config";
import { getJSON } from "./helpers";

export const state = {
  book: {},
  search: {
    query: [],
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

export async function loadBook(id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    state.book = {
      id: data.id,
      title: data.volumeInfo.title,
      authors: data.volumeInfo.authors,
      publisher: data.volumeInfo.publisher,
      previewLink: data.volumeInfo.previewLink,
      publishedDate: data.volumeInfo.publishedDate,
      description: data.volumeInfo.description.replaceAll("<p>", " "),
      isbnType: data.volumeInfo.industryIdentifiers
        ? data.volumeInfo.industryIdentifiers[0].type
        : "isbn",
      isbn: data.volumeInfo.industryIdentifiers
        ? data.volumeInfo.industryIdentifiers[0].identifier
        : "undefined",
      pages: data.volumeInfo.pageCount,
      categories: Array.isArray(data.volumeInfo.categories)
        ? data.volumeInfo.categories[0]
        : data.volumeInfo.categories,
      rate: data.volumeInfo.averageRating,
      imageLink: data.volumeInfo.imageLinks.thumbnail,
      language: data.volumeInfo.language,
      isForSale: data.saleInfo.saleability,
    };

    if (state.bookmarks.some((bookmark) => bookmark.id === id)) {
      state.book.bookmarked = true;
    } else {
      state.book.bookmarked = false;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// https://www.googleapis.com/books/v1/volumes/?q=flowers+inauthor

export async function loadSearchResults(query, page) {
  try {
    state.search.query.push(query);

    const data = await getJSON(`${API_URL}?q=${query}&startIndex=${page}`);

    state.search.results = data.items.map((book) => {
      return {
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        rate: book.volumeInfo.averageRating,
        imageLink: book.volumeInfo.imageLinks.thumbnail,
        id: book.id,
      };
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function getResultsPage(page) {
  let start = page * state.search.resultsPerPage;

  state.search.page = page;
  return start;
}

function persistBookmarks() {
  localStorage.setItem("Bookmarks", JSON.stringify(state.bookmarks));
}
export function addBookmark(book) {
  // Add book to the bookmarks Array
  state.bookmarks.push(book);

  // Mark current book as bookmarked
  if (book.id === state.book.id) state.book.bookmarked = true;

  // Save to localStorage
  persistBookmarks();
}

export function removeBookmark(id) {
  // Delete book from bookmarks Array
  const index = state.bookmarks.findIndex((el) => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current book as NOT bookmarked
  if (id === state.book.id) state.book.bookmarked = false;

  // Save to localStorage
  persistBookmarks();
}

// Load from localStorage
(function () {
  const storage = localStorage.getItem("Bookmarks");

  if (storage) state.bookmarks = JSON.parse(storage);
})();
