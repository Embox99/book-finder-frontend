import "./BookModal.css";

function BookModal({
  book,
  isOpen,
  onClose,
  onAddToFavorites,
  markAsRead,
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
            onClick={() => onAddToFavorites(book.id)}
          >
            Add to Favorites
          </button>
          {!readBooks.includes(book.id) && (
            <button
              className="book-modal__read-btn"
              onClick={() => markAsRead(book.id)}
            >
              Mark as Read
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookModal;
