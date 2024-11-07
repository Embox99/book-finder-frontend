import "./Main.css";
import BookSection from "../BookSection/BookSection";
import SearchBar from "../SearchBar/SearchBar";

function Main({
  handleSearch,
  isSearching,
  searchResults,
  popularBooks,
  handleBookClick,
}) {
  return (
    <main className="main-container">
      <div className="main__search-tool">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="main__content">
        {isSearching ? (
          <p>Loading search results...</p>
        ) : searchResults.length > 0 ? (
          <BookSection
            title="Search Results"
            books={searchResults}
            handleBookClick={handleBookClick}
          />
        ) : (
          <BookSection
            title="Most popular right now"
            books={popularBooks}
            handleBookClick={handleBookClick}
          />
        )}
      </div>
    </main>
  );
}

export default Main;
