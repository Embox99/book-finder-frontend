import "./Main.css";
import { getPopularBooks, searchBooks } from "../../utils/Books";
import { useEffect, useState } from "react";
import MainSection from "../MainSection/MainSection";
import SearchBar from "../SearchBar/SearchBar";

function Main() {
  const [popularBooks, setPopularBooks] = useState([]);
  const [searchResults, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    getPopularBooks()
      .then((data) => {
        if (data && data.length > 0) {
          setPopularBooks(data);
        } else {
          console.error("No books found");
        }
      })
      .catch((error) => console.error("Error when receiving books:", error));
  }, []);

  const handleSearch = (query) => {
    setIsSearching(true);
    searchBooks(query)
      .then((results) => {
        setSearchResult(results);
        setIsSearching(false);
      })
      .catch((error) => {
        console.error("Error while searching books: ", error);
        setIsSearching(false);
      });
  };

  return (
    <main className="main-container">
      <div className="main__search-tool">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="main__content">
        {isSearching ? (
          <p>Loading search results...</p>
        ) : searchResults.length > 0 ? (
          <MainSection title="Search Results" books={searchResults} />
        ) : (
          <MainSection title="Most popular right now" books={popularBooks} />
        )}
      </div>
    </main>
  );
}

export default Main;
