import "./Footer.css";
import About from "../About/About";

function Footer() {
  return (
    <footer className="footer">
      <section className="footer__about">
        <About />
      </section>
      <section className="footer__description">
        <p className="footer__description-author">
          Developed by Tripleten student Eduard Vilensky
        </p>
        <p className="footer__description-year">2024</p>
      </section>
    </footer>
  );
}

export default Footer;
