import { useEffect, useState } from "react";
import "./BookModal.css";

function BookModal({
  book,
  isOpen,
  onClose,
  toggleFavorite,
  toggleRead,
  favorites = [],
  readBooks = [],
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    if (book) {
      const bookId = book.id;

      console.log("Favorites:", favorites);
      console.log("ReadBooks:", readBooks);
      setIsFavorite(favorites.some((favBook) => favBook.bookId === bookId));
      setIsRead(readBooks.some((readBook) => readBook.bookId === bookId));
    }
  }, [book, favorites, readBooks]);

  if (!isOpen) {
    return null;
  }

  const handleToggleFavorite = () => {
    toggleFavorite(book);
  };

  const handleToggleRead = () => {
    toggleRead(book);
  };

  const { volumeInfo } = book;

  return (
    <section className="book-modal">
      <section className="book-modal__content">
        <button className="book-modal__close-btn" onClick={onClose}>
          ×
        </button>
        <h2 className="book-modal__title">
          {volumeInfo?.title || "No Title Available"}
        </h2>
        {volumeInfo?.imageLinks?.thumbnail && (
          <img
            className="book-modal__image"
            src={volumeInfo.imageLinks.thumbnail}
            alt={`${volumeInfo.title} cover`}
          />
        )}
        <p className="book-modal__description">
          {volumeInfo?.description || "No description available"}
        </p>
        <section className="book-modal__buttons">
          <button
            className="book-modal__favorite-btn"
            onClick={handleToggleFavorite}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
          <button className="book-modal__read-btn" onClick={handleToggleRead}>
            {isRead ? "Remove from Read" : "Mark as Read"}
          </button>
        </section>
      </section>
    </section>
  );
}

export default BookModal;
