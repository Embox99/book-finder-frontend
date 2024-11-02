import "./SideBar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <button type="button" className="sidebar__btn sidebar__edit-btn">
        Edit profile
      </button>
      <button type="button" className="sidebar__btn sidebar__logout-btn">
        Log out
      </button>
    </div>
  );
}

export default Sidebar;
