import "./Header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import logo from "../../assets/header-logo.png";

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="header-logo" className="header__logo" />
      </Link>
      <div className="header__btn-container">
      <button type="button" className="header__btn">
        Sign Up
      </button>
      <button type="button" className="header__btn">
        Log in
      </button>
      </div>
    </header>
  );
}

export default Header;
