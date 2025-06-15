import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useFirebase } from "../context/Firebase.jsx";

function Login() {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signing in a user...");
    const result = await firebase.signin(email, password);
    console.log(`Signin Successfull: ${result}`);
  };
  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/");
    }
  }, [firebase, navigate]);
  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <h1 className="mt-5 mb-5">OR</h1>
      <Button variant="danger" onClick={firebase.signinWithGoogle}>
        Signin with Google
      </Button>
    </div>
  );
}

export default Login;
