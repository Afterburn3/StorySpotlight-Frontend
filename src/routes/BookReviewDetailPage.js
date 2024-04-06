import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Reviews from "../component/Reviews";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Image from "react-bootstrap/Image";
import StarRating from "../component/StarRating";

const BookEdit = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [userPostCheck, setUserPostCheck] = useState([]);

  const [values, setValues] = useState({
    review: "",
    rating: 3,
  });

  const storedUsername = localStorage.getItem("username");

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    checkSamePost();
  }, [data]);

  function fetchData() {
    fetch(`http://localhost:4000/allBooks/${id}`)
      .then((response) => response.json())
      .then((json) => setData(json.data))
      .catch((error) => console.error("Error fetching books:", error));
  }

  function checkSamePost() {
    if (data && data.review) {
      const reviewUser = data.review.find(
        (reviewArray) => reviewArray.user_username === storedUsername
      );
      setUserPostCheck(reviewUser);
    }
  }

  function onChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const handleUpdate = async () => {
    await checkSamePost();
    navigate(`/userReviewUpdate/${userPostCheck.id}`);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:4000/addBookReview/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_username: storedUsername,
            review: values.review,
            rating: values.rating,
          }),
        }
      );
      if (response.ok) {
        console.log("Review submitted successfully");
        setValues({ review: "", rating: "" });
        setError("");
        setSuccess("Review submitted successfully");
        fetchData();
        checkSamePost();
      } else {
        setError(
          "Failed to submit review, Note: User can only submit one review per book! Click Edit Your Review!"
        );
        setSuccess("");
        console.log("Failed to submit review");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <>
        <h1 className="display-1 text-center">
          {data && data.bookslist && data.bookslist.book_title}
        </h1>
        <div className="text-center">
          <Image
            src={data && data.bookslist && data.bookslist.img_link}
            thumbnail
            className="big-image"
          />
        </div>
        <div className="text-center">
          {data && data.averageRating && (
            <StarRating rating={data.averageRating.avg} />
          )}
          <br />
          <br />
        </div>
        <div className="container mt-3">
          {data && data.review && <Reviews data={data.review} />}
          {!isAuthenticated ? (
            <>
              <br />
              <br />
              <Button className="my-3" variant="link" href="/login">
                Want to post a review? Login!
              </Button>
            </>
          ) : (
            <>
              {" "}
              <br />
              {userPostCheck ? (
                <Button variant="warning link" onClick={handleUpdate}>
                  Edit Your Review
                </Button>
              ) : (
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>
                    Write Your Review{" "}
                    {storedUsername
                      ? storedUsername
                      : "Username Not Found! Error!"}
                    !
                  </Form.Label>
                  <Form.Control
                    placeholder="Write Your Review Here"
                    as="textarea"
                    rows={8}
                    name="review"
                    value={values.review}
                    onChange={(e) => onChange(e)}
                  />
                  <div className="input-group mb-3 my-2">
                    <label
                      className="input-group-text"
                      for="inputGroupSelect01"
                    >
                      Rating
                    </label>
                    <select
                      className="form-select"
                      id="inputGroupSelect01"
                      name="rating"
                      value={values.rating}
                      onChange={(e) => onChange(e)}
                    >
                      <option value="1">⭐️</option>
                      <option value="2">⭐️⭐️</option>
                      <option value="3">⭐️⭐️⭐️</option>
                      <option value="4">⭐️⭐️⭐️⭐️</option>
                      <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
                    </select>
                  </div>
                  <div class="text-end">
                    <Button
                      className="col-1"
                      variant="primary"
                      onClick={onSubmit}
                    >
                      Submit
                    </Button>
                  </div>
                </Form.Group>
              )}
              <div style={{ color: "green", margin: "10px 0" }}> {success}</div>
              <div style={{ color: "red", margin: "10px 0" }}> {error}</div>
            </>
          )}
        </div>
      </>
    </div>
  );
};

export default BookEdit;
