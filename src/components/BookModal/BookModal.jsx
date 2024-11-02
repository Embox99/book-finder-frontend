import "./BookModal.css";

function BookModal({ book, isOpen, onClose, onAddToFavorites, markAsRead }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="book-modal">
      <div className="book-modal__content">
        <button className="book-modal__close-btn" onClick={onClose}>
          ×
        </button>
        <h2 className="book-modal__title">{book.volumeInfo.title}</h2>
        <img
          className="book-modal__image"
          src={book.volumeInfo.imageLinks?.thumbnail}
          alt={`${book.volumeInfo.title} cover`}
        />
        <p className="book-modal__description">{book.volumeInfo.description}</p>
        <div className="book-modal__buttons">
          <button
            className="book-modal__favorite-btn"
            onClick={() => onAddToFavorites(book)}
          >
            Add to Favorites
          </button>
          <button
            className="book-modal__read-btn"
            onClick={() => markAsRead(book)}
          >
            Mark as Read
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookModal;
