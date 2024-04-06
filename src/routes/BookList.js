import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import StarRating from "../component/StarRating";

const BookList = () => {
  const storedUsername = localStorage.getItem("username");
  const [search, setSearch] = useState("");
  const [bookData, setBookData] = useState([]);
  const navigate = useNavigate();

  const handleBookReviewSelect = (id) => {
    navigate(`/bookreview/${id}`);
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    navigate(`/bookupdatebutton/${id}`);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await fetch(`http://localhost:4000/deletereview/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Review deleted successfully");
        fetchData();
      } else {
        console.error("Failed to delete review");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  });

  function fetchData() {
    fetch(`http://localhost:4000/review/${storedUsername}`)
      .then((response) => response.json())
      .then((json) => setBookData(json.data.review))
      .catch((error) => console.error("Error fetching books:", error));
  }

  return (
    <>
      <div className="container searchForm">
        <h2 className="container text-center my-3">Find Your Review</h2>
        <form>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search For Book Name"
              aria-label="Search For Book Name"
              aria-describedby="button-addon2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>
      </div>
      <div className="container">
        <Table
          striped
          bordered
          responsive="sm my-5"
          className="table table-hover table-dark"
        >
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
              bookData
                .filter((book) => {
                  return search.toLowerCase() === ""
                    ? book
                    : book.book_title.toLowerCase().includes(search);
                })
                .map((book, index) => {
                  return (
                    <tr
                      onClick={() => {
                        handleBookReviewSelect(book.bookslist_id);
                      }}
                      key={index + 1}
                    >
                      <td>{index + 1}</td>
                      <td>
                        <img src={book.img_link} alt="" />
                      </td>
                      <td>{book.book_title}</td>
                      <td>{book.author.replace(/[{}]/g, "")}</td>
                      <td>
                        <StarRating rating={book.rating} />
                      </td>
                      <td>{book.review}</td>
                      <td>{book.created_at.substring(0, 10)}</td>
                      <td>
                        <Button
                          onClick={(e) => handleUpdate(e, book.id)}
                          variant="outline-warning"
                        >
                          Update
                        </Button>
                      </td>
                      <td>
                        <Button
                          onClick={(e) => handleDelete(e, book.id)}
                          variant="outline-danger"
                        >
                          Delete
                        </Button>
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
