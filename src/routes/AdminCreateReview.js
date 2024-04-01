import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/esm/Button";
import AdminCarddatabase from "../component/AdminCarddatabase";

function AdminCreateReview({ bookData }) {
  function submitButton(e) {
    e.preventDefault();
  }
  return (
    <>
      <div className="container searchForm">
        <h2 className="container text-center">Find Review</h2>
        <form onSubmit={submitButton}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search For Book Name"
              aria-label="Search For Book Name"
              aria-describedby="button-addon2"
              // value={}
              // onChange={(e) => setSearch(e.target.value)}
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
        <DropdownButton
          className="my-4"
          variant="Secondary"
          id="dropdown-basic"
          title="Sort By"
          size="lg"
        >
          <Dropdown.Item href="#/action-1">Title</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Rating</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Recency</Dropdown.Item>
        </DropdownButton>
      </div>
      <AdminCarddatabase bookData={bookData} />
      <Link
        to="/admin/bookcreate" // Update this to point to the correct route
        className="d-block mx-auto mb-3"
        style={{
          width: "fit-content",
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Button variant="primary" size="lg">
          Can't find your book in our library? Click here to add a new book
        </Button>
      </Link>
    </>
  );
}

export default AdminCreateReview;
