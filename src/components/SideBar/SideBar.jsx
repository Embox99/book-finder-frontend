import "./SideBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  return (
    <div className="sidebar">
      <button type="button" className="sidebar__btn sidebar__edit-btn">
        <FontAwesomeIcon icon={faUserEdit} /> Edit profile
      </button>
      <button type="button" className="sidebar__btn sidebar__logout-btn">
        <FontAwesomeIcon icon={faSignOutAlt} /> Log out
      </button>
    </div>
  );
}

export default Sidebar;
