import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Header({ isAuthenticated, setIsAuthenticated }) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/logout", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("username");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <>
      <Navbar expand="lg" className="p-3 text-bg-dark" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand style={{ fontSize: "2rem", marginRight: "40px" }}>
            StorySpotlight
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ fontSize: "1.5rem", maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
              {!isAuthenticated ? (
                <></>
              ) : (
                <Nav.Link href="/userReviewList">Reviews</Nav.Link>
              )}
              <Nav.Link href="/bookLists">Books</Nav.Link>
            </Nav>
            {!isAuthenticated ? (
              <>
                <Button
                  href="/login"
                  variant="outline-success"
                  className="btn btn-outline-light me-2"
                  style={{ fontSize: "20px", maxHeight: "100px" }}
                >
                  Log In
                </Button>
                <Button
                  href="/register"
                  className="btn btn-warning"
                  style={{ fontSize: "20px", maxHeight: "100px" }}
                >
                  Sign-up
                </Button>
              </>
            ) : (
              <Button
                variant="btn btn-danger"
                className="btn btn-outline-light me-2"
                style={{ fontSize: "20px", maxHeight: "100px" }}
                onClick={handleSubmit}
              >
                Log Out
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
