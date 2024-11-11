import { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      onSearch(query);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        className="search-bar__input"
        value={query}
        onChange={handleInputChange}
        placeholder="Enter book title or author"
      />
      <button type="submit" className="search-bar__button">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
