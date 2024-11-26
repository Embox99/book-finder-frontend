import "./Profile.css";
import Navigation from "../Navigation/Navigation";
import BookSection from "../BookSection/BookSection";
import Sidebar from "../SideBar/SideBar";

function Profile({
  readingGoal,
  goalAchieved,
  readBooks,
  favorites,
  findBookById,
  markAsRead,
  yearBooks,
  handleBookClick,
  handleGoalClick,
  handleUpdateProfileClick,
  handleLogOut,
}) {
  return (
    <div className="profile">
      <div className="profile__sidebar">
        <Sidebar
          handleUpdateProfileClick={handleUpdateProfileClick}
          handleLogOut={handleLogOut}
        />
      </div>
      <div className="profile__content">
        <Navigation />
        <section className="profile__goals" id="goals">
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
                  <p>Congratulations! You've achieved your reading goal!</p>
                </div>
              )}
              <button
                className="profile__goals-btn profile__goals-btn--change"
                onClick={handleGoalClick}
              >
                Change the goal
              </button>
            </div>
          ) : (
            <button
              className="profile__goals-btn profile__goals-btn--set"
              onClick={handleGoalClick}
            >
              Set your reading goal
            </button>
          )}
        </section>
        <BookSection
          id="favorites"
          title="Your favorite books"
          books={favorites.map(findBookById)}
          markAsRead={markAsRead}
          handleBookClick={handleBookClick}
        />
        <BookSection
          id="read-books"
          title="Finished books"
          books={readBooks.map(findBookById)}
          markAsRead={markAsRead}
          handleBookClick={handleBookClick}
        />
        <BookSection
          id="year-of-birth"
          title="Popular books that came out on your year of birth"
          books={yearBooks}
          markAsRead={markAsRead}
          handleBookClick={handleBookClick}
        />
      </div>
    </div>
  );
}

export default Profile;
