import React, { useState } from "react";
import Card from "../component/Card";

const BookCreate = () => {
  //State for search and book data from google api!
  const [search, setSearch] = useState("");
  const [allBook, setAllBook] = useState([]);

  const apiKey = process.env.REACT_APP_API_KEY;

  //Function to submit data to google API
  function submitButton(e) {
    e.preventDefault();
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${apiKey}`
    )
      .then((response) => response.json())
      .then((json) => setAllBook(json.items))
      .catch((error) => console.error("Error fetching books:", error));
  }

  return (
    <>
      <div className="container searchForm">
        <h2 className="container text-center my-3">Find Your Book</h2>
        <form onSubmit={submitButton}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Find Your Book"
              aria-label="Find Your Book"
              aria-describedby="button-addon2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              type="submit"
              id="button-addon2"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <Card allBook={allBook} />
    </>
  );
};

export default BookCreate;
