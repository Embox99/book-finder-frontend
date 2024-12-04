import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../assets/header-logo(optimized).png";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({ handleLoginClick, handleRegistrationClick }) {
  const { isLoggedIn, userData } = useContext(CurrentUserContext);
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="header-logo" className="header__logo" />
      </Link>
      <section className="header__btn-container">
        <button
          type="button"
          className={`header__btn ${
            isLoggedIn ? "header__element-hidden" : ""
          }`}
          onClick={handleRegistrationClick}
        >
          Sign Up
        </button>
        <button
          type="button"
          className={`header__btn ${
            isLoggedIn ? "header__element-hidden" : ""
          }`}
          onClick={handleLoginClick}
        >
          Log in
        </button>
        <section
          className={`header__user-container ${
            !isLoggedIn ? "header__element-hidden" : ""
          }`}
        >
          <Link to="/profile">
            <p className="header__username">{userData.name}</p>{" "}
          </Link>
        </section>
      </section>
    </header>
  );
}

export default Header;
