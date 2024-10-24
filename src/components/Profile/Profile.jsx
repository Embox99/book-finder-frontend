import "./Profile.css";
import BookSection from "../BookSection/BookSection";
import Navigation from "../Navigation/Navigation";

function Profile() {
  return (
    <div className="profile">
      <div className="profile__navigation">
        <Navigation />
      </div>
      <div className="profile__book-section">
        <BookSection />
      </div>
    </div>
  );
}

export default Profile;
