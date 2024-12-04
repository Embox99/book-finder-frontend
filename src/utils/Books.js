import { checkServerResponce } from "./Api";
const BASE_URL = "https://www.googleapis.com/books/v1/";

const API_KEY = process.env.REACT_APP_API_KEY;

export const searchBooks = async (query) => {
  return fetch(`${BASE_URL}volumes?q=${query}&key=${API_KEY}`)
    .then(checkServerResponce)
    .then((data) => data.items)
    .catch((error) => {
      console.error("Error executing the request:", error);
      return [];
    });
};

export const getPopularBooks = async () => {
  return fetch(
    `${BASE_URL}volumes?q=subject:fiction&orderBy=relevance&key=${API_KEY}`
  )
    .then(checkServerResponce)
    .then((data) => {
      if (data.items) {
        return data.items.sort(() => 0.5 - Math.random()).slice(0, 10);
      } else {
        return [];
      }
    })
    .catch((error) => {
      console.error("Error executing the request:", error);
      return [];
    });
};

export const getBookByYear = async (year) => {
  return fetch(
    `${BASE_URL}volumes?q=subject:fiction+publishedDate:${year}&orderBy=relevance&maxResults=40&key=${API_KEY}`
  )
    .then(checkServerResponce)
    .then((data) => {
      if (data.items) {
        return data.items.slice(0, 5);
      } else {
        return [];
      }
    })
    .catch((error) => {
      console.error("Error executing the request:", error);
      return [];
    });
};
