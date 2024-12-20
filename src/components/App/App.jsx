import { Routes, Route, HashRouter } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { getPopularBooks, searchBooks, getBookByYear } from "../../utils/Books";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import "./App.css";
import BookModal from "../BookModal/BookModal";
import SetGoalModal from "../SetGoalModal/SetGoalModal";
import LoginModal from "../LoginModal/LoginModal";
import RegistrationModal from "../RegistrationModal/RegistrationModal";
import UpdateProfile from "../UpdateProfileModal/UpdateProfileModal";

function App() {
  const [isSearching, setIsSearching] = useState(false);
  const [readBooks, setReadBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [readingGoal, setReadingGoal] = useState(null);
  const [goalAchieved, setGoalAchieved] = useState(false);
  const [popularBooks, setPopularBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [yearBooks, setYearBooks] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

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
    getBookByYear(2021)
      .then((data) => {
        if (data && data.length > 0) {
          setYearBooks(data);
        } else {
          console.error("No books found for the specified year");
        }
      })
      .catch((error) => console.error("Error when receiving books:", error));
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

  const findBookById = (bookId) =>
    yearBooks.find((book) => book.id === bookId) ||
    popularBooks.find((book) => book.id === bookId) ||
    searchResults.find((book) => book.id === bookId) ||
    allBooks.find((book) => book.id === bookId);

  const markAsRead = (bookId) => {
    if (!readBooks.includes(bookId)) {
      setReadBooks((prevReadBooks) => [...prevReadBooks, bookId]);
    }
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setActiveModal("book");
  };

  const handleGoalClick = () => {
    setActiveModal("goal");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleRegistrationClick = () => {
    setActiveModal("registration");
  };

  const handleUpdateProfileClick = () => {
    setActiveModal("update-profile");
  };

  const handleModalClose = () => {
    setActiveModal(null);
    setSelectedBook(null);
  };

  const setGoal = (goal) => {
    setReadingGoal(goal);
    setGoalAchieved(false);
    setReadBooks([]);
    localStorage.removeItem("readBooks");
  };

  const addBooks = useCallback((books) => {
    setAllBooks((prevBooks) => {
      const newBooks = books.filter(
        (newBook) => !prevBooks.some((prevBook) => prevBook.id === newBook.id)
      );
      return [...prevBooks, ...newBooks];
    });
  }, []);

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

  useEffect(() => {
    if (readingGoal && readBooks.length >= readingGoal) {
      setGoalAchieved(true);
    } else {
      setGoalAchieved(false);
    }
  }, [readBooks, readingGoal]);

  useEffect(() => {
    if (!popularBooks.length) {
      getPopularBooks()
        .then((data) => {
          if (data && data.length > 0) {
            setPopularBooks(data);
            addBooks(data);
          } else {
            console.error("No books found");
          }
        })
        .catch((error) => console.error("Error when receiving books:", error));
    }
  }, [setPopularBooks, addBooks, popularBooks.length]);

  const handleSearch = (query) => {
    setIsSearching(true);
    searchBooks(query)
      .then((results) => {
        setSearchResults(results);
        addBooks(results);
        setIsSearching(false);
      })
      .catch((error) => {
        console.error("Error while searching books: ", error);
        setIsSearching(false);
      });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && activeModal) {
        handleModalClose();
      }
    };

    if (activeModal) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModal]);

  return (
    <HashRouter>
      <div className="page">
        <section className="page__content">
          <Header
            handleLoginClick={handleLoginClick}
            handleRegistrationClick={handleRegistrationClick}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  handleSearch={handleSearch}
                  isSearching={isSearching}
                  searchResults={searchResults}
                  popularBooks={popularBooks}
                  handleBookClick={handleBookClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  readingGoal={readingGoal}
                  goalAchieved={goalAchieved}
                  readBooks={readBooks}
                  setGoal={setGoal}
                  favorites={favorites}
                  findBookById={findBookById}
                  markAsRead={markAsRead}
                  yearBooks={yearBooks}
                  handleBookClick={handleBookClick}
                  handleGoalClick={handleGoalClick}
                  handleUpdateProfileClick={handleUpdateProfileClick}
                />
              }
            />
          </Routes>
        </section>
        <Footer />
        {activeModal === "book" && selectedBook && (
          <BookModal
            book={selectedBook}
            isOpen={true}
            onClose={handleModalClose}
            toggleFavorite={toggleFavorite}
            toggleRead={toggleRead}
            favorites={favorites}
            readBooks={readBooks}
            className="modal"
          />
        )}
        {activeModal === "goal" && (
          <SetGoalModal
            isOpen={true}
            onClose={handleModalClose}
            onSave={setGoal}
            className="modal"
          />
        )}
        {activeModal === "login" && (
          <LoginModal
            onClose={handleModalClose}
            redirectButtonClick={handleRegistrationClick}
          />
        )}
        {activeModal === "registration" && (
          <RegistrationModal
            onClose={handleModalClose}
            redirectButtonClick={handleLoginClick}
          />
        )}
        {activeModal === "update-profile" && (
          <UpdateProfile onClose={handleModalClose} />
        )}
      </div>
    </HashRouter>
  );
}

export default App;
