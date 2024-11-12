import { checServerResponce } from "./Api";

const API_KEY = "AIzaSyDS87FTNMkojvpmlUKiA8qLbIm8NrYqGhQ";

export const searchBooks = async (query) => {
  return fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`
  )
    .then(checServerResponce)
    .then((data) => data.items)
    .catch((error) => {
      console.error("Error executing the request:", error);
      return [];
    });
};

export const getPopularBooks = async () => {
  return fetch(
    `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=relevance&key=${API_KEY}`
  )
    .then(checServerResponce)
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
    `https://www.googleapis.com/books/v1/volumes?q=subject:fiction+publishedDate:${year}&orderBy=relevance&maxResults=40&key=${API_KEY}`
  )
    .then(checServerResponce)
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
