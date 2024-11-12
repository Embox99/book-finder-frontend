import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../assets/header-logo(optimized).png";

function Header({ handleLoginClick, handleRegistrationClick }) {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="header-logo" className="header__logo" />
      </Link>
      <section className="header__btn-container">
        <button
          type="button"
          className="header__btn"
          onClick={handleRegistrationClick}
        >
          Sign Up
        </button>
        <button
          type="button"
          className="header__btn"
          onClick={handleLoginClick}
        >
          Log in
        </button>
      </section>
    </header>
  );
}

export default Header;
