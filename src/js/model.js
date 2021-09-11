import { API_URL } from "./config";
import { getJSON } from "./helpers";

export const state = {
  book: {},
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
  } catch (error) {
    console.log(error);
  }
}
