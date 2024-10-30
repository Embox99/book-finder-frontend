import "./Profile.css";
import Navigation from "../Navigation/Navigation";
import ProfileSection from "../ProfileSection/ProfileSection";
import Sidebar from "../SideBar/SideBar";

function Profile() {
  return (
    <div className="profile">
      <div className="profile__sidebar">
        <Sidebar />
      </div>
      <div className="profile__content">
        <Navigation />
        <ProfileSection id="favorites" title="Your favorite books" />
        <ProfileSection id="read-books" title="Finished books" />
        <ProfileSection
          id="year-of-birth"
          title="Books that came out on your year of birth"
        />
        <div className="profile__goals" id="goals"></div>
      </div>
    </div>
  );
}

export default Profile;
