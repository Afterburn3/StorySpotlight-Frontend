import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const BookList = ({ bookData }) => {
  const starImage = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-star-fill"
      viewBox="0 0 16 16"
    >
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    </svg>
  );

  const handleBookReviewSelect = (id) => {
    // history.push;
  };

  return (
    <>
      <div className="container">
        <DropdownButton
          variant="Secondary"
          id="dropdown-basic"
          title="Sort By"
          size="lg"
        >
          <Dropdown.Item href="#/action-1">Title</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Rating</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Recency</Dropdown.Item>
        </DropdownButton>
        <Table striped bordered responsive="sm my-5" className="table-dark">
          <thead>
            <tr>
              <th>Book ID</th>
              <th>Cover</th>
              <th>Title</th>
              <th>Author</th>
              <th>Your Rating</th>
              <th>Your Review</th>
              <th>Date Last Edit</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {bookData &&
              bookData.map((book, index) => {
                return (
                  <tr
                    onClick={() => {
                      handleBookReviewSelect(book.id);
                    }}
                    key={book.id}
                  >
                    <td>{index + 1}</td>
                    <td>
                      <img src={book.img_link} alt="" />
                    </td>
                    <td>{book.book_title}</td>
                    <td>{book.author.replace(/[{}]/g, "")}</td>
                    <td>
                      {starImage} {starImage} {starImage} {starImage}
                    </td>
                    <td>{book.reading_time}</td>
                    <td>{book.year}</td>
                    <td>
                      <Button variant="outline-warning">Update</Button>
                      {/* onClick(e) => handleUpdate(e, restaurant.id) */}
                      {/* e.stipPropagation() */}
                    </td>
                    <td>
                      <Button variant="outline-danger">Delete</Button>
                      {/* onClick(e) => handleUpdate(e, restaurant.id) */}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default BookList;
