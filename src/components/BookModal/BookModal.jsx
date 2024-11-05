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
  if (!isOpen) {
    return null;
  }

  const { volumeInfo } = book;

  return (
    <div className="book-modal">
      <div className="book-modal__content">
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
        <div className="book-modal__buttons">
          <button
            className="book-modal__favorite-btn"
            onClick={() => toggleFavorite(book.id)}
          >
            {favorites.includes(book.id)
              ? "Remove from Favorites"
              : "Add to Favorites"}
          </button>
          <button
            className="book-modal__read-btn"
            onClick={() => toggleRead(book.id)}
          >
            {readBooks.includes(book.id) ? "Remove from Read" : "Mark as Read"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookModal;
