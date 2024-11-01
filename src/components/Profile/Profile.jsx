import { useState, useEffect } from "react";
import "./Profile.css";
import Navigation from "../Navigation/Navigation";
import ProfileSection from "../ProfileSection/ProfileSection";
import Sidebar from "../SideBar/SideBar";
import { getBookByYear } from "../../utils/Books";

function Profile() {
  const [yearBooks, setYearBooks] = useState([]);

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
          title="Popular books that came out on your year of birth"
          books={yearBooks}
        />
        <div className="profile__goals" id="goals"></div>
      </div>
    </div>
  );
}

export default Profile;
