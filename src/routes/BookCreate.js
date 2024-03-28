import Card from "../component/Card";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const BookFilter = ({ allBook, search, setSearch, setAllBook }) => {
  const apiKey = "AIzaSyB7jaVlGZzvjAz6FB1NBIf6xYSNIAmqKWU";

  function submitButton(e) {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${apiKey}`
    )
      .then((response) => response.json())
      .then((json) => setAllBook(json.items))
      .catch((error) => console.error("Error fetching books:", error));
    e.preventDefault();
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
      <Card allBook={allBook} />
    </>
  );
};

export default BookFilter;
