import { useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Modaldatabase from "./ModalDatabase";

function CardDatabase({ bookData, search }) {
  //const for Modal
  const [show, setShow] = useState(false);
  const [bookItem, setItem] = useState();

  return (
    <Container className="mt-5">
      <Row>
        {bookData &&
          bookData
            .filter((book) => {
              return search.toLowerCase() === ""
                ? book
                : book.book_title.toLowerCase().includes(search);
            })
            .map((book, index) => {
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
                  <Modaldatabase
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
