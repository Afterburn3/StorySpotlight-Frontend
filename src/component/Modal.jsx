import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Modal({ show, bookItem, onClose }) {
  if (!show) {
    return null;
  }

  function addBookToDatabase(e) {
    e.preventDefault();

    fetch("http://localhost:4000/allBooks", {
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
            </div>
          </div>
          <br />
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Write Your Review</Form.Label>
            <Form.Control
              placeholder="Write Your Review Here"
              as="textarea"
              rows={8}
            />
            <Form.Label>Review Rate Placeholder</Form.Label>
            <Form.Range />
            <Button onClick={addBookToDatabase} variant="primary" type="submit">
              Submit
            </Button>
          </Form.Group>
        </div>
      </div>
    </>
  );
}

export default Modal;
