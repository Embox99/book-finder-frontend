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
      <section className="search-tool">
        <SearchBar onSearch={handleSearch} />
      </section>
      <section className="main__content">
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
      </section>
    </main>
  );
}

export default Main;
