import { API_URL } from "./config";
import { getJSON } from "./helpers";

export const state = {
  book: {},
  search: {
    query: [],
    results: [],
  },
};

export async function loadBook(id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    state.book = {
      id: data.id,
      title: data.volumeInfo.title,
      authors: data.volumeInfo.authors,
      publisher: data.volumeInfo.publisher,
      publishedDate: data.volumeInfo.publishedDate,
      description: data.volumeInfo.description,
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
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// https://www.googleapis.com/books/v1/volumes/?q=flowers+inauthor

export async function loadSearchResults(query) {
  try {
    state.search.query.push(query);

    const data = await getJSON(`${API_URL}?q=${query}`);

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
