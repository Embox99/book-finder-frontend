import { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim() !== "") {
      onSearch(query);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-bar__input"
        value={query}
        onChange={handleInputChange}
        placeholder="Enter book title or author"
      />
      <button className="search-bar__button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
