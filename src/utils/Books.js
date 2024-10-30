import { checServerResponce } from "./Api";

const API_KEY = "AIzaSyDS87FTNMkojvpmlUKiA8qLbIm8NrYqGhQ";

export const searchBooks = async (query) => {
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`)
    .then(checServerResponce)
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error executing the request:", error);
    });
};

export const getPopularBooks = async () => {
  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=relevance&key=${API_KEY}`
  )
    .then(checServerResponce)
    .then((data) => {
      const popularBooks = data.items
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
      console.log(popularBooks);
    })
    .catch((error) => {
      console.error("Error executing the request:", error);
    });
};

export const getBookByYear = async (year) => {
  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=subject:fiction+publishedDate:${year}&orderBy=relevance&maxResults=40&key=${API_KEY}`
  )
    .then(checServerResponce)
    .then((data) => {
      const popularBooks = data.items.slice(0, 5);
      console.log(popularBooks);
    })
    .catch((error) => {
      console.error("Error executing the request:", error);
    });
};
