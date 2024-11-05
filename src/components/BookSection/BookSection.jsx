import { useState } from "react";
import "./BookSection.css";
import BookModal from "../BookModal/BookModal";
import { useBooks } from "../../contexts/BooksContext";

function BookSection({ id, title, books = [] }) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { markAsRead, toggleFavorite, favorites, readBooks, toggleRead } =
    useBooks();

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <div id={id} className="profile-section">
      <h2>{title}</h2>
      <div className="profile-section__books">
        {books.length > 0 ? (
          books.map((book) =>
            book && book.volumeInfo ? (
              <div
                key={book.id}
                className="profile-section__book"
                onClick={() => handleBookClick(book)}
              >
                <h3 className="profile-section__book-title">
                  {book.volumeInfo.title}
                </h3>
                <p>{book.volumeInfo.authors?.join(", ")}</p>
                <img
                  src={book.volumeInfo.imageLinks?.thumbnail}
                  alt={`${book.volumeInfo.title} cover`}
                />
              </div>
            ) : null
          )
        ) : (
          <p>There are no available books</p>
        )}
      </div>
      {selectedBook && (
        <BookModal
          book={selectedBook}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          toggleFavorite={toggleFavorite}
          toggleRead={toggleRead}
          markAsRead={markAsRead}
          favorites={favorites}
          readBooks={readBooks}
        />
      )}
    </div>
  );
}

export default BookSection;
