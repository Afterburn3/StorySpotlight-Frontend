function Modal({ show, bookItem, onClose }) {
  if (!show) {
    return null;
  }

  function addBookToDatabase(e) {
    e.preventDefault();

    fetch("https://storyspotlight-backend.onrender.com/allBooks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        book_title: bookItem.volumeInfo.title,
        author: bookItem.volumeInfo.authors,
        book_id: bookItem.id,
        year: bookItem.volumeInfo.publishedDate,
        book_snippet: bookItem.volumeInfo.previewLink,
        img_link:
          bookItem.volumeInfo.imageLinks &&
          bookItem.volumeInfo.imageLinks.smallThumbnail,
        categories: bookItem.volumeInfo.categories,
        book_description: bookItem.volumeInfo.description,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Book added successfully:", data);
      })
      .catch((error) => {
        console.error("Error adding book:", error);
      });
    onClose();
  }

  return (
    <>
      <div className="overlay">
        <div className="overlay-inner">
          <button className="close" onClick={onClose}>
            <i class="fas fa-times"></i>
          </button>
          <div className="inner-box">
            <img
              src={
                bookItem.volumeInfo.imageLinks &&
                bookItem.volumeInfo.imageLinks.smallThumbnail
              }
              alt=""
            />
            <div className="info">
              <h1>{bookItem.volumeInfo.title}</h1>
              <h3>{bookItem.volumeInfo.authors}</h3>
              <h4>{bookItem.volumeInfo.publisher}</h4>
              <span>{bookItem.volumeInfo.publishedDate}</span>
              <br />
              <a href={bookItem.volumeInfo.previewLink}>
                <button>More</button>
              </a>
              {"  "}
              <button onClick={addBookToDatabase}>Add</button>
            </div>
          </div>
          <h4 className="description">{bookItem.volumeInfo.description}</h4>
        </div>
      </div>
    </>
  );
}

export default Modal;
