import { createContext, useContext, useState, useEffect } from "react";

const BooksContext = createContext();

export const useBooks = () => useContext(BooksContext);

export const BooksProvider = ({ children }) => {
  const [readBooks, setReadBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [readingGoal, setReadingGoal] = useState(null);
  const [goalAchieved, setGoalAchieved] = useState(false);
  const [popularBooks, setPopularBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    const savedReadBooks = JSON.parse(localStorage.getItem("readBooks")) || [];
    setReadBooks(savedReadBooks);
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
    const savedReadingGoal = JSON.parse(localStorage.getItem("readingGoal"));
    if (savedReadingGoal) {
      setReadingGoal(savedReadingGoal);
    }
  }, []);

  useEffect(() => {
    if (readBooks.length > 0) {
      localStorage.setItem("readBooks", JSON.stringify(readBooks));
    }
  }, [readBooks]);

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  useEffect(() => {
    if (readingGoal !== null) {
      localStorage.setItem("readingGoal", JSON.stringify(readingGoal));
    }
  }, [readingGoal]);

  const markAsRead = (bookId) => {
    if (!readBooks.includes(bookId)) {
      const updatedReadBooks = [...readBooks, bookId];
      setReadBooks(updatedReadBooks);

      if (readingGoal && updatedReadBooks.length >= readingGoal) {
        setGoalAchieved(true);
      }
    }
  };

  const onAddToFavorites = (bookId) => {
    if (!favorites.includes(bookId)) {
      setFavorites((prev) => [...prev, bookId]);
    }
  };

  const setGoal = (goal) => {
    setReadingGoal(goal);
    setGoalAchieved(false);
    setReadBooks([]);
    localStorage.removeItem("readBooks");
  };

  const addBooks = (books) => {
    setAllBooks((prevBooks) => {
      const newBooks = books.filter(
        (newBook) => !prevBooks.some((prevBook) => prevBook.id === newBook.id)
      );
      return [...prevBooks, ...newBooks];
    });
  };

  const toggleFavorite = (bookId) => {
    if (favorites.includes(bookId)) {
      setFavorites((prev) => prev.filter((id) => id !== bookId));
    } else {
      setFavorites((prev) => [...prev, bookId]);
    }
  };

  const toggleRead = (bookId) => {
    setReadBooks((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  };

  return (
    <BooksContext.Provider
      value={{
        toggleRead,
        toggleFavorite,
        allBooks,
        readBooks,
        favorites,
        readingGoal,
        goalAchieved,
        markAsRead,
        onAddToFavorites,
        setGoal,
        popularBooks,
        setPopularBooks,
        searchResults,
        setSearchResults,
        addBooks,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};
