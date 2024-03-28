import { useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import AdminModaldatabase from "../component/AdminModaldatabase";

function CardDatabase({ bookData }) {
  //const for Modal
  const [show, setShow] = useState(false);
  const [bookItem, setItem] = useState();

  return (
    <Container className="mt-5">
      <Row>
        {bookData &&
          bookData.map((book, index) => {
            return (
              <Col key={index} xs={6} md={3}>
                <div
                  className="card"
                  onClick={() => {
                    setShow(true);
                    setItem(book);
                  }}
                >
                  <img src={book.img_link} alt="" />
                  <div className="bottom">
                    <h3 className="title">{book.book_title}</h3>
                  </div>
                </div>
                <AdminModaldatabase
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

export default CardDatabase;
