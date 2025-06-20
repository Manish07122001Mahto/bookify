import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import BookCard from "../components/Card";

function ViewOrder() {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    firebase.fetchMyBooks().then((books) => setBooks(books.docs));
  }, [firebase.isLoggedIn]);
  return (
    <div>
      {books.map((book) => (
        <BookCard
          link={`/books/orders/${book.id}`}
          id={book.id}
          key={book.id}
          {...book.data()}
        />
      ))}
    </div>
  );
}

export default ViewOrder;
