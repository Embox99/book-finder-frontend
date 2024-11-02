import { useState, useEffect } from "react";
import "./Profile.css";
import Navigation from "../Navigation/Navigation";
import ProfileSection from "../ProfileSection/ProfileSection";
import Sidebar from "../SideBar/SideBar";
import SetGoalModal from "../SetGoalModal/SetGoalModal";
import { getBookByYear } from "../../utils/Books";

function Profile() {
  const [yearBooks, setYearBooks] = useState([]);
  const [readingGoal, setReadingGoal] = useState(null);
  const [booksRead, setBooksRead] = useState(0);
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

  const handleSetGoal = (goal) => {
    setReadingGoal(goal);
    setBooksRead(0);
  };

  const handleMarkAsRead = () => {
    setBooksRead((prev) => Math.min(prev + 1, readingGoal));
  };

  return (
    <div className="profile">
      <div className="profile__sidebar">
        <Sidebar />
      </div>
      <div className="profile__content">
        <Navigation />
        <div className="profile__goals" id="goals">
          <h2>Your reading goal</h2>
          {readingGoal ? (
            <div>
              <p>Goal: read {readingGoal} books.</p>
              <p>
                Progress: {booksRead} / {readingGoal}
              </p>
              <button
                className="profile__goals-btn"
                onClick={() => setIsModalOpen(true)}
              >
                Change the goal
              </button>
            </div>
          ) : (
            <button
              className="profile__goals-btn"
              onClick={() => setIsModalOpen(true)}
            >
              Set your reading goal
            </button>
          )}
          <SetGoalModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSetGoal}
          />
        </div>
        <ProfileSection
          id="favorites"
          title="Your favorite books"
          markAsRead={handleMarkAsRead}
        />
        <ProfileSection
          id="read-books"
          title="Finished books"
          markAsRead={handleMarkAsRead}
        />
        <ProfileSection
          id="year-of-birth"
          title="Popular books that came out on your year of birth"
          books={yearBooks}
          markAsRead={handleMarkAsRead}
        />
      </div>
    </div>
  );
}

export default Profile;
