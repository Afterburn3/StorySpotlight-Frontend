import { Link } from "react-router-dom";
import { useState } from "react";
import CardDatabase from "../component/CardDatabase";
import Button from "react-bootstrap/esm/Button";

const BookFilter = ({ bookData, isAuthenticated }) => {
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="container searchForm">
        <h2 className="container text-center my-3">Find Review</h2>
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
      <CardDatabase bookData={bookData} search={search} />
      {!isAuthenticated ? (
        <>
          <Button
            className="d-block text-center mx-auto mb-3"
            variant="link"
            href="/login"
          >
            Want to post reviews? Login!
          </Button>
        </>
      ) : (
        <Link to="/bookcreate" className="d-block text-center mx-auto mb-3">
          <Button variant="primary" size="lg">
            Can't find your book in our library? Click here to add a new book
          </Button>
        </Link>
      )}
    </>
  );
};

export default BookFilter;
