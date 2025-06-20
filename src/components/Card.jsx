import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function BookCard(props) {
  const navigate = useNavigate();
  return (
    <Card style={{ width: "18rem", margin: "10px" }}>
      <Card.Img variant="top" src={props.url} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          This book has a title <i>{props.name}</i> and this book is sold by{" "}
          {props.dispayName} and this book costs Rs.{props.price}
        </Card.Text>
        <Button onClick={(e) => navigate(props.link)} variant="primary">
          View
        </Button>
      </Card.Body>
    </Card>
  );
}

export default BookCard;
