import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <a href="#favorites">Favorite Books</a>
        </li>
        <li className="navigation__item">
          <a href="#read-books">Finished Books</a>
        </li>
        <li className="navigation__item">
          <a href="#year-of-birth">Birth year</a>
        </li>
        <li className="navigation__item">
          <a href="#goals">You goals</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
