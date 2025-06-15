import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useFirebase } from "../context/Firebase.jsx";

function ListPage() {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const [name, setName] = useState("");
  const [isbnNumber, setIsbnNumber] = useState("");
  const [price, setPrice] = useState("");
  const [coverPic, setCoverPic] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.addListing(name, isbnNumber, PeriodicWave, coverPic);
  };

  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter Book Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Book Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Enter ISBN</Form.Label>
          <Form.Control
            type="text"
            placeholder="ISBN Number"
            onChange={(e) => setIsbnNumber(e.target.value)}
            value={isbnNumber}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Enter Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Cover Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setCoverPic(e.target.value[0])}
            value={price}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
}

export default ListPage;
