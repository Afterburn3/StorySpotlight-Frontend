import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../App.css";

function Header({ isAuthenticated, setIsAuthenticated }) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://storyspotlight-backend.onrender.com/logout",
        {
          method: "GET",
          credentials: "include",
        }
      );
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
    <Navbar expand="lg" className="custom-navbar">
      <Container fluid>
        <Navbar.Brand href="/" className="custom-brand">
          StorySpotlight
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 custom-nav" navbarScroll>
            <Nav.Link href="/" className="custom-nav-link">
              Home
            </Nav.Link>
            {isAuthenticated && (
              <Nav.Link href="/userReviewList" className="custom-nav-link">
                Reviews
              </Nav.Link>
            )}
            <Nav.Link href="/bookLists" className="custom-nav-link">
              Books
            </Nav.Link>
          </Nav>
          {!isAuthenticated ? (
            <>
              <Button href="/login" className="custom-button login-button">
                Log In
              </Button>
              <Button href="/register" className="custom-button signup-button">
                Sign-up
              </Button>
            </>
          ) : (
            <Button
              className="custom-button logout-button"
              onClick={handleSubmit}
            >
              Log Out
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
