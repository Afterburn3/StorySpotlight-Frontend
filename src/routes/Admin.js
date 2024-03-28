import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const Admin = () => {
  return (
    <div className="container">
      <ButtonGroup size="lg" className="container my-4">
        <Link className="btn btn-dark" to="booklist">
          My Book Reviews
        </Link>
        <Link className="btn btn-dark" to="admincreatereview">
          Add Book Review
        </Link>
      </ButtonGroup>
      <Outlet />
    </div>
  );
};

export default Admin;
