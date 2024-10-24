import "./Footer.css";
import About from "../About/About";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__about">
        <About />
      </div>
      <div className="footer__description">
      <p className="footer__description-author">
        Developed by Tripleten student Eduard Vilensky
      </p>
      <p className="footer__description-year">2024</p>
      </div>
    </footer>
  );
}

export default Footer;