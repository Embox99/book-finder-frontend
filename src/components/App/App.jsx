import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPopularBooks, searchBooks, getBookByYear } from "../../utils/Books";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import {
  getCurrentUser,
  updateCurrentUser,
  getUserFavoriteBooks,
  getUserReadBooks,
  addFavoriteBook,
  addReadBook,
  removeFavoriteBook,
  removeReadBook,
  getUserGoal,
  setUserGoal,
} from "../../utils/Api.js";
import { setToken, getToken, removeToken } from "../../utils/token.js";
import { registration, authorization, isTokenValid } from "../../utils/auth.js";

function App() {
  const [isSearching, setIsSearching] = useState(false);
  const [readBooks, setReadBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [readingGoal, setReadingGoal] = useState(null);
  const [goalAchieved, setGoalAchieved] = useState(false);
  const [popularBooks, setPopularBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [yearBooks, setYearBooks] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    yearOfBirth: "",
  });

  const transformBookDataToServerFormat = (bookData) => {
    return {
      id: bookData.key || bookData.cover_edition_key || bookData.id,
      volumeInfo: {
        title: bookData.title || "Unknown Title",
        authors: bookData.author_name || ["Unknown Author"], 
        description: bookData.description?.value || bookData.description || "",
        publishedDate: bookData.first_publish_year || "", 
        imageLinks: {
          thumbnail: bookData.cover_i
            ? `https://covers.openlibrary.org/b/id/${bookData.cover_i}-L.jpg`
            : "",
        }, 
        industryIdentifiers: bookData.isbn || [],
      },
    };
  };

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    getCurrentUser(token)
      .then((res) => {
        setIsLoggedIn(true);
        setUserData(res);
        return Promise.all([
          getUserReadBooks(token),
          getUserFavoriteBooks(token),
        ]);
      })
      .then(([readBooksRes, favoriteBooksRes]) => {
        setReadBooks(readBooksRes.readBooks);
        setFavorites(favoriteBooksRes.favoriteBooks);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    getUserGoal(token)
      .then((goalData) => {
        setReadingGoal(goalData.goal);
      })
      .catch((err) => {
        console.error("Error fetching user goal:", err);
      });
  }, []);

  useEffect(() => {
    getBookByYear(userData.yearOfBirth)
      .then((data) => {
        if (data && data.length > 0) {
          setYearBooks(data);
        } else {
          console.error("No books found for the specified year");
        }
      })
      .catch((error) => console.error("Error when receiving books:", error));
  }, [userData.yearOfBirth]);

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

  const handleRegistration = (values, resetCurrentForm) => {
    registration(values)
      .then((res) => {
        setIsLoggedIn(true);
        setToken(res.token);
        setUserData({
          id: res._id,
          name: res.name,
          email: res.email,
          yearOfBirth: res.yearOfBirth,
        });
        resetCurrentForm();
        handleModalClose();
      })
      .catch(console.error);
  };

  const handleLogIn = (values, resetCurrentForm) => {
    if (!values) return Promise.reject("No values provided");

    return authorization(values)
      .then((res) => {
        const token = res.token;
        setToken(token);
        return isTokenValid(token);
      })
      .then((res) => {
        setIsLoggedIn(true);
        setUserData(res);
        return Promise.all([
          getUserReadBooks(getToken()),
          getUserFavoriteBooks(getToken()),
        ]);
      })
      .then(([readBooksRes, favoriteBooksRes]) => {
        setReadBooks(readBooksRes.readBooks);
        setFavorites(favoriteBooksRes.favoriteBooks);
        resetCurrentForm();
        handleModalClose();
      })
      .catch((err) => {
        console.error("Authorization failed:", err);
        return Promise.reject(err);
      });
  };

  const handleLogOut = () => {
    removeToken();
    setIsLoggedIn(false);
    setUserData({ id: "", name: "", avatarUrl: "" });
  };

  const handleUpdateUser = (data, resetCurrentForm) => {
    const token = getToken();
    updateCurrentUser(data, token)
      .then((res) => {
        setUserData(res);
        resetCurrentForm();
        handleModalClose();
      })
      .catch(console.error);
  };

  const setGoal = (goal) => {
    const token = getToken();
    setUserGoal(goal, token)
      .then(() => {
        setReadingGoal(goal);
      })
      .catch((err) => {
        console.error("Error setting user goal:", err);
      });
  };

  const toggleFavorite = (bookData) => {
    const token = getToken();

    const transformedBookData = transformBookDataToServerFormat(bookData);

    if (
      !transformedBookData.id ||
      !transformedBookData.volumeInfo?.title ||
      !transformedBookData.volumeInfo?.authors
    ) {
      console.error(
        "Invalid book data for adding to favorites:",
        transformedBookData
      );
      return;
    }

    const isFavorite = favorites.some(
      (book) => book.id === transformedBookData.id
    );

    if (isFavorite) {
      setFavorites((prev) =>
        prev.filter((book) => book.id !== transformedBookData.id)
      );

      removeFavoriteBook(transformedBookData.id, token).catch((err) => {
        console.error("Error while removing book from favorites:", err);
        setFavorites((prev) => [...prev, transformedBookData]);
      });
    } else {
      setFavorites((prev) => [...prev, transformedBookData]);

      addFavoriteBook(transformedBookData, token).catch((err) => {
        console.error("Error while adding book to favorites:", err);
        setFavorites((prev) =>
          prev.filter((book) => book.id !== transformedBookData.id)
        );
      });
    }
  };

  const toggleRead = (bookData) => {
    const token = getToken();
    const transformedBookData = transformBookDataToServerFormat(bookData);

    if (
      !transformedBookData.id ||
      !transformedBookData.volumeInfo?.title ||
      !transformedBookData.volumeInfo?.authors
    ) {
      console.error(
        "Invalid book data for adding to read list:",
        transformedBookData
      );
      return;
    }

    const isRead = readBooks.some((book) => book.id === transformedBookData.id);

    if (isRead) {
      setReadBooks((prev) =>
        prev.filter((book) => book.id !== transformedBookData.id)
      );

      removeReadBook(transformedBookData.id, token).catch((err) => {
        console.error("Error while removing book from read list:", err);
        setReadBooks((prev) => [...prev, transformedBookData]);
      });
    } else {
      setReadBooks((prev) => [...prev, transformedBookData]);

      addReadBook(transformedBookData, token).catch((err) => {
        console.error("Error while adding book to read list:", err);
        setReadBooks((prev) =>
          prev.filter((book) => book.id !== transformedBookData.id)
        );
      });
    }
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
          } else {
            console.error("No books found");
          }
        })
        .catch((error) => console.error("Error when receiving books:", error));
    }
  }, [setPopularBooks, popularBooks.length]);

  const handleSearch = (query) => {
    setIsSearching(true);
    searchBooks(query)
      .then((results) => {
        setSearchResults(results);
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

  const currentUser = {
    isLoggedIn,
    userData,
  };

  return (
    <BrowserRouter>
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
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
                  <ProtectedRoute>
                    <Profile
                      readingGoal={readingGoal}
                      goalAchieved={goalAchieved}
                      readBooks={readBooks}
                      setGoal={setGoal}
                      favorites={favorites}
                      yearBooks={yearBooks}
                      handleBookClick={handleBookClick}
                      handleGoalClick={handleGoalClick}
                      handleUpdateProfileClick={handleUpdateProfileClick}
                      handleLogOut={handleLogOut}
                    />
                  </ProtectedRoute>
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
              handleLogIn={handleLogIn}
            />
          )}
          {activeModal === "registration" && (
            <RegistrationModal
              onClose={handleModalClose}
              redirectButtonClick={handleLoginClick}
              handleRegistration={handleRegistration}
            />
          )}
          {activeModal === "update-profile" && (
            <UpdateProfile
              onClose={handleModalClose}
              handleUpdateUser={handleUpdateUser}
            />
          )}
        </CurrentUserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
