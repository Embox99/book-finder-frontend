import { checkServerResponce } from "./Api";
const BASE_URL = "https://openlibrary.org/";

export const searchBooks = async (query) => {
  return fetch(`${BASE_URL}search.json?q=${encodeURIComponent(query)}`)
    .then(checkServerResponce)
    .then((data) => data.docs || [])
    .catch((error) => {
      console.error("Error executing the search request:", error);
      return [];
    });
};

export const getPopularBooks = async () => {
  return fetch(`${BASE_URL}subjects/popular.json`)
    .then(checkServerResponce)
    .then((data) => {
      if (data.works) {
        return data.works
          .sort(() => 0.5 - Math.random())
          .slice(0, 10);
      } else {
        return [];
      }
    })
    .catch((error) => {
      console.error("Error executing the popular books request:", error);
      return [];
    });
};

export const getBookByYear = async (year) => {
  return fetch(`${BASE_URL}search.json?publish_year=${year}&sort=editions`)
    .then(checkServerResponce)
    .then((data) => {
      if (data.docs) {
        return data.docs.slice(0, 5);
      } else {
        return [];
      }
    })
    .catch((error) => {
      console.error("Error executing the request for books by year:", error);
      return [];
    });
};
