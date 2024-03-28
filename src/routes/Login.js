import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Login({ setIsAuthenticated }) {
  const [values, setValues] = useState({
    password: "",
    email: "",
  });

  const [error, setError] = useState(false);

  function onChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: values.password,
          email: values.email,
        }),
      });
      if (response.ok) {
        const { token } = await response.json();
        setIsAuthenticated(true);
        localStorage.setItem("token", token);
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.log(error);
      setError("Server Error");
    }
  };

  return (
    <div className="container">
      <Button className="my-3" variant="link" href="/register">
        No account? Create one!
      </Button>
      <Form className="container my-5" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            value={values.email}
            onChange={(e) => onChange(e)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            value={values.password}
            onChange={(e) => onChange(e)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <div style={{ color: "red", margin: "10px 0" }}> {error}</div>
      </Form>
    </div>
  );
}

export default Login;
