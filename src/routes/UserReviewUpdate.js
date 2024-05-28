import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Image from "react-bootstrap/Image";
import StarRating from "../component/StarRating";

function UpdateButton() {
  const storedUsername = localStorage.getItem("username");

  const { id } = useParams();

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [values, setValues] = useState({
    review: "",
    rating: "",
    bookName: "",
    bookImage: "",
    bookAvgRating: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(
        `https://storyspotlight-backend.onrender.com/revieweditdata/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch review data");
      }
      const json = await response.json();
      setValues({
        review: json.data.review.review,
        rating: json.data.review.rating,
        bookName: json.data.review.book_title,
        bookImage: json.data.review.img_link,
        bookAvgRating: json.data.review.rating,
      });
    } catch (error) {
      console.error("Error fetching review data:", error);
      setError("Failed to fetch review data");
    }
  }

  function onChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/alterreview/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username_name: storedUsername,
          review: values.review,
          rating: values.rating,
        }),
      });
      if (response.ok) {
        console.log("Review submitted successfully");
        setError("");
        setSuccess("Review submitted successfully");
        fetchData();
      } else {
        setError("Failed to submit review");
        setSuccess("");
        console.error("Failed to submit review");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <>
        <h1 className="display-1 text-center">{values.bookName}</h1>
        <div className="text-center">
          <Image src={values.bookImage} thumbnail className="big-image" />
        </div>
        <div className="text-center">
          <StarRating rating={values.bookAvgRating} />
          <br />
          <br />
        </div>
        <div className="container mt-3">
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Edit Your Review {storedUsername}!</Form.Label>
            <Form.Control
              placeholder="Edit Your Review Here"
              as="textarea"
              rows={8}
              name="review"
              value={values.review}
              onChange={(e) => onChange(e)}
            />
            <div className="input-group mb-3 my-2">
              <label className="input-group-text" for="inputGroupSelect01">
                Select
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
            <div className="text-end">
              <Button variant="primary" onClick={onSubmit}>
                Submit
              </Button>
            </div>
          </Form.Group>
          <div style={{ color: "red", margin: "10px 0" }}> {error}</div>
          <div style={{ color: "green", margin: "10px 0" }}> {success}</div>
        </div>
      </>
    </div>
  );
}

export default UpdateButton;
