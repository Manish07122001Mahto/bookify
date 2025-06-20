import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { Button, Form } from "react-bootstrap";

function BookDetail() {
  const params = useParams();
  const firebase = useFirebase();
  const bookId = params.bookId;
  const [data, setData] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    firebase.getBookById(bookId).then((value) => setData(value.data()));
  }, []);
  if (data == null) {
    return <h1>Loading...</h1>;
  }
  const handlePlaceOrder = async () => {
    const result = await firebase.placeOrder(bookId, qty);
    console.log("Order Placed:", result);
  };
  return (
    <div className="container mt-5">
      <h1>{data.name}</h1>
      <img src={data.url} alt="" width="50%" style={{ borderRadius: "10px" }} />
      <h1>Details</h1>
      <h4>Price: Rs {data.price}</h4>
      <h1>Owner Details</h1>
      <p>Name: {data.displayName}</p>
      <p>Name: {data.userEmail}</p>
      <img
        src={data.photoUrl}
        alt=""
        style={{
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          display: "block",
        }}
      />
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          placeholder="Quantity"
          onChange={(e) => setQty(e.target.value)}
          value={qty}
        />
      </Form.Group>
      <Button variant="success" className="mt-2" onClick={handlePlaceOrder}>
        Buy Now
      </Button>
    </div>
  );
}

export default BookDetail;
