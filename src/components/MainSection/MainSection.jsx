import "./MainSection.css";

function MainSection({ title, books = [] }) {
  return (
    <div className="main-section">
      <h2>{title}</h2>
      <div className="main-section__books">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className="main-section__book">
              <h3 className="main-section__book-title">
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
    </div>
  );
}

export default MainSection;
