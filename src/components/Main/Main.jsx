import "./Main.css";
import { getPopularBooks, searchBooks } from "../../utils/Books";
import { useEffect, useState } from "react";
import BookSection from "../BookSection/BookSection";
import SearchBar from "../SearchBar/SearchBar";
import { useBooks } from "../../contexts/BooksContext";

function Main() {
  const [isSearching, setIsSearching] = useState(false);

  const {
    popularBooks,
    setPopularBooks,
    searchResults,
    setSearchResult,
    addBooks,
  } = useBooks();

  useEffect(() => {
    if (!popularBooks.length) {
      getPopularBooks()
        .then((data) => {
          if (data && data.length > 0) {
            setPopularBooks(data);
            addBooks(data);
          } else {
            console.error("No books found");
          }
        })
        .catch((error) => console.error("Error when receiving books:", error));
    }
  }, [setPopularBooks, addBooks, popularBooks.length]);

  const handleSearch = (query) => {
    setIsSearching(true);
    searchBooks(query)
      .then((results) => {
        setSearchResult(results);
        addBooks(results);
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
          <BookSection title="Search Results" books={searchResults} />
        ) : (
          <BookSection title="Most popular right now" books={popularBooks} />
        )}
      </div>
    </main>
  );
}

export default Main;
