import "./ProfileSection.css";

function ProfileSection({ id, title, books = [] }) {
  return (
    <div id={id} className="profile-section">
      <h2>{title}</h2>
      <div className="profile-section__books">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className="profile-section__book">
              <h3>{book.volumeInfo.title}</h3>
              <p>{book.volumeInfo.authors?.join(", ")}</p>
              <img
                src={book.volumeInfo.imageLinks?.thumbnail}
                alt={`${book.volumeInfo.title} cover`}
              />
            </div>
          ))
        ) : (
          <p>There are no books available to display </p>
        )}
      </div>
    </div>
  );
}

export default ProfileSection;
