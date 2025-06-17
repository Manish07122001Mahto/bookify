import React from "react";
import { Button, Card } from "react-bootstrap";
function BookCard(props) {
  return (
    <Card style={{ width: "18rem", margin: "10px" }}>
      <Card.Img variant="top" src={props.url} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          This book has a title <i>{props.name}</i> and this book is sold by{" "}
          {props.dispayNAme} and this book costs Rs.{props.price}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default BookCard;
