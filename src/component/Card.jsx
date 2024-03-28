import { useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Modal from "./Modal";

function Card({ allBook }) {
  //const for Modal
  //new state for modal
  const [show, setShow] = useState(false);
  const [bookItem, setItem] = useState();

  //destructing bookItem to make it more reusable

  return (
    <Container className="mt-5">
      <Row>
        {allBook &&
          allBook.map((book, index) => {
            return (
              <Col key={index} xs={6} md={3}>
                <div
                  className="card"
                  onClick={() => {
                    setShow(true);
                    setItem(book);
                  }}
                >
                  <img
                    src={
                      book.volumeInfo.imageLinks &&
                      book.volumeInfo.imageLinks.smallThumbnail
                    }
                    alt=""
                  />
                  <div className="bottom">
                    <h3 className="title">{book.volumeInfo.title}</h3>
                  </div>
                </div>
                <Modal
                  show={show}
                  bookItem={bookItem}
                  onClose={() => setShow(false)}
                />
              </Col>
            );
          })}
      </Row>
    </Container>
  );
}

export default Card;
