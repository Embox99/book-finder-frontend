import { useBooks } from "../../contexts/BooksContext";
import "./Profile.css";
import Navigation from "../Navigation/Navigation";
import BookSection from "../BookSection/BookSection";
import Sidebar from "../SideBar/SideBar";
import SetGoalModal from "../SetGoalModal/SetGoalModal";
import { useState, useEffect } from "react";
import { getBookByYear } from "../../utils/Books";

function Profile() {
  const {
    allBooks,
    readBooks,
    favorites,
    readingGoal,
    goalAchieved,
    markAsRead,
    setGoal,
    popularBooks,
    searchResults,
  } = useBooks();
  const [yearBooks, setYearBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const findBookById = (bookId) =>
    yearBooks.find((book) => book.id === bookId) ||
    popularBooks.find((book) => book.id === bookId) ||
    searchResults.find((book) => book.id === bookId) ||
    allBooks.find((book) => book.id === bookId);

  return (
    <div className="profile">
      <div className="profile__sidebar">
        <Sidebar />
      </div>
      <div className="profile__content">
        <Navigation />
        <div className="profile__goals" id="goals">
          <h2 className="profile__goals-title">Your Reading Goal</h2>
          {readingGoal ? (
            <div className="profile__goals-content">
              <p className="profile__goal-info">
                Goal: Read{" "}
                <span className="profile__goal-number">{readingGoal}</span>{" "}
                books.
              </p>
              <p className="profile__goal-progress">
                Progress:{" "}
                <span className="profile__goal-number">{readBooks.length}</span>{" "}
                / <span className="profile__goal-number">{readingGoal}</span>
              </p>
              {goalAchieved && (
                <div className="profile__goal-achieved">
                  <p>
                     Congratulations! You've achieved your reading goal!
                  </p>
                </div>
              )}
              <button
                className="profile__goals-btn profile__goals-btn--change"
                onClick={() => setIsModalOpen(true)}
              >
                Change the goal
              </button>
            </div>
          ) : (
            <button
              className="profile__goals-btn profile__goals-btn--set"
              onClick={() => setIsModalOpen(true)}
            >
              Set your reading goal
            </button>
          )}
          <SetGoalModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={setGoal}
          />
        </div>
        <BookSection
          id="favorites"
          title="Your favorite books"
          books={favorites.map(findBookById)}
          markAsRead={markAsRead}
        />
        <BookSection
          id="read-books"
          title="Finished books"
          books={readBooks.map(findBookById)}
          markAsRead={markAsRead}
        />
        <BookSection
          id="year-of-birth"
          title="Popular books that came out on your year of birth"
          books={yearBooks}
          markAsRead={markAsRead}
        />
      </div>
    </div>
  );
}

export default Profile;
