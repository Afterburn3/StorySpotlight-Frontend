import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Register() {
  const [values, setValues] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  function onChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://storyspotlight-backend.onrender.com/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: values.username,
            password: values.password,
            email: values.email,
          }),
        }
      ).then((response) => response.json());

      if (response.errors && response.errors.length > 0) {
        const errorMessages = response.errors.map((error) => error.msg);
        console.log(errorMessages);
        setError(errorMessages.join(", "));
        setSuccess("");
      } else {
        setError("");
        setSuccess(response.message);
        setValues({ username: "", password: "", email: "" });
      }
    } catch (error) {
      console.log(error);
      setError("Server Error");
    }
  };

  return (
    <div className="container">
      <Button className="my-3" variant="link" href="/login">
        Already have an account? Login!
      </Button>
      <Form className="container my-5" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Create email"
            value={values.email}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            type="text"
            placeholder="Create Username"
            value={values.username}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Create Password"
            value={values.password}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <div style={{ color: "red", margin: "10px 0" }}> {error}</div>
        <div style={{ color: "green", margin: "10px 0" }}> {success}</div>
      </Form>
      <div></div>
    </div>
  );
}

export default Register;
