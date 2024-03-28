import Carousel from "react-bootstrap/Carousel";

export default function BooksInformation({ bookData }) {
  console.log(bookData);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
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
            src={bookData.length > 0 ? bookData[1].img_link : ""}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={bookData.length > 0 ? bookData[2].img_link : ""}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
