import { useState } from "react";
import "./ProfileSection.css";
import BookModal from "../BookModal/BookModal";

function ProfileSection({ id, title, books = [], markAsRead }) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          books.map((book) => (
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
          ))
        ) : (
          <p>There are no available books</p>
        )}
      </div>
      {selectedBook && (
        <BookModal
          book={selectedBook}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          markAsRead={markAsRead}
        />
      )}
    </div>
  );
}

export default ProfileSection;
