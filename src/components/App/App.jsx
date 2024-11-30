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

  const transformBookData = (book) => {
    return {
      bookId: book.id,
      title: book.volumeInfo?.title || "Unknown Title",
      author: book.volumeInfo?.authors?.[0] || "Unknown Author",
      description: book.volumeInfo?.description || "",
      publishedDate: book.volumeInfo?.publishedDate || "",
      coverImage: book.volumeInfo?.imageLinks?.thumbnail || "",
      isbn: book.volumeInfo?.industryIdentifiers?.[0]?.identifier || "",
    };
  };

  const transformServerBookData = (book) => {
    return {
      kind: "books#volume",
      id: book.bookId,
      etag: book._id,
      volumeInfo: {
        title: book.title,
        authors: [book.author],
        description: book.description || "",
        publishedDate: book.publishedDate || "",
        imageLinks: {
          thumbnail: book.coverImage || "",
        },
        industryIdentifiers: [
          {
            type: "ISBN",
            identifier: book.isbn || "Unknown ISBN",
          },
        ],
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
        const transformedReadBooks = readBooksRes.readBooks.map(
          transformServerBookData
        );
        const transformedFavoriteBooks = favoriteBooksRes.favoriteBooks.map(
          transformServerBookData
        );

        setReadBooks(transformedReadBooks);
        setFavorites(transformedFavoriteBooks);
      })
      .catch(console.error);
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
    setReadingGoal(goal);
    setGoalAchieved(false);
    setReadBooks([]);
  };

  const toggleFavorite = (bookData) => {
    const token = getToken();
    const transformedBookData = transformBookData(bookData);

    if (
      !transformedBookData.bookId ||
      !transformedBookData.title ||
      !transformedBookData.author
    ) {
      console.error(
        "Invalid book data for adding to favorites:",
        transformedBookData
      );
      return;
    }

    if (favorites.some((book) => book.bookId === transformedBookData.bookId)) {
      console.log("Removing book from favorites:", transformedBookData.bookId);
      removeFavoriteBook(transformedBookData.bookId, token)
        .then(() => {
          setFavorites((prev) =>
            prev.filter((book) => book.bookId !== transformedBookData.bookId)
          );
        })
        .catch((err) => {
          console.error("Error while removing book from favorites:", err);
        });
    } else {
      console.log("Adding book to favorites:", transformedBookData.bookId);
      addFavoriteBook(transformedBookData, token)
        .then(() => {
          setFavorites((prev) => [...prev, transformedBookData]);
        })
        .catch((err) => {
          console.error("Error while adding book to favorites:", err);
        });
    }
  };

  const toggleRead = (bookData) => {
    const token = getToken();
    const transformedBookData = transformBookData(bookData);

    if (
      !transformedBookData.bookId ||
      !transformedBookData.title ||
      !transformedBookData.author
    ) {
      console.error(
        "Invalid book data for adding to read list:",
        transformedBookData
      );
      return;
    }

    if (readBooks.some((book) => book.bookId === transformedBookData.bookId)) {
      console.log("Removing book from read list:", transformedBookData.bookId);
      removeReadBook(transformedBookData.bookId, token)
        .then(() => {
          setReadBooks((prev) =>
            prev.filter((book) => book.bookId !== transformedBookData.bookId)
          );
        })
        .catch((err) => {
          console.error("Error while removing book from read list:", err);
        });
    } else {
      console.log("Adding book to read list:", transformedBookData.bookId);
      addReadBook(transformedBookData, token)
        .then(() => {
          setReadBooks((prev) => [...prev, transformedBookData]);
        })
        .catch((err) => {
          console.error("Error while adding book to read list:", err);
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
                      markAsRead={toggleRead}
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
