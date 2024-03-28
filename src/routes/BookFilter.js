import CardDatabase from "../component/CardDatabase";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const BookFilter = ({ bookData }) => {
  function submitButton(e) {
    e.preventDefault();
  }
  return (
    <>
      <div className="container searchForm">
        <h2 className="container text-center my-3">Find Review</h2>
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
      <CardDatabase bookData={bookData} />
    </>
  );
};

export default BookFilter;
