import "./BookSection.css";

function BookSection({ id, title, books = [], handleBookClick }) {
  return (
    <div id={id} className="book-section">
      <h2>{title}</h2>
      <div className="book-section__books">
        {books.length > 0 ? (
          books.map((book) =>
            book && book.volumeInfo ? (
              <div
                key={book.id}
                className="book-section__book"
                onClick={() => handleBookClick(book)}
              >
                <h3 className="book-section__book-title">
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
    </div>
  );
}

export default BookSection;
