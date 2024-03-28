import { useEffect } from "react";
import { useParams } from "react-router-dom";

const BookReview = () => {
  const { id } = useParams();

  useEffect(() => {});

  return (
    <>
      <h1>Single Page of Book review</h1>
    </>
  );
};

export default BookReview;
