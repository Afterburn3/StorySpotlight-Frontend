import React from "react";
import "../App.css";

function BooksInformation({ bookData }) {
  return (
    <section className="books-section">
      <div className="carousel">
        {bookData &&
          bookData.map((book, index) => (
            <div key={index} className="book-card">
              <img src={book.img_link} alt="" />
              <p>{book.book_title}</p>
            </div>
          ))}
      </div>
    </section>
  );
}

{
  /* <div style={{ display: "flex", justifyContent: "center" }}>
  <Carousel data-bs-theme="dark" style={{ width: "20rem" }}>
    <Carousel.Item>
      <img
        className="d-flex w-100"
        src={bookData.length > 0 ? bookData[0].img_link : ""}
        alt="First slide"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={bookData.length > 0 ? bookData[2].img_link : ""}
        alt="Second slide"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={bookData.length > 0 ? bookData[4].img_link : ""}
        alt="Third slide"
      />
    </Carousel.Item>
  </Carousel>
</div>; */
}

export default BooksInformation;
