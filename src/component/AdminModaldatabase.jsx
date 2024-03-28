import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";

function AdminModaldatabase({ show, bookItem, onClose }) {
  if (!show) {
    return null;
  }

  function goToReview(e) {
    e.preventDefault();
  }

  return (
    <>
      <div className="overlay">
        <div className="overlay-inner">
          <button className="close" onClick={onClose}>
            <i class="fas fa-times"></i>
          </button>
          <div className="inner-box">
            <img src={bookItem.img_link} alt="" />
            <div className="info">
              <h1>{bookItem.book_title}</h1>
              <h3>{bookItem.author.replace(/[{"}]/g, "")}</h3>
              <span>{bookItem.categories.replace(/[{"}]/g, "")}</span>
              <br />
              <a href={bookItem.book_snippet}>
                <button>More</button>
              </a>
              {"  "}
              <button onClick={goToReview}>Review</button>
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
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form.Group>
        </div>
      </div>
    </>
  );
}

export default AdminModaldatabase;
