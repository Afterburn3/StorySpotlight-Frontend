import StarRating from "./StarRating";
import Card from "react-bootstrap/Card";

const Reviews = ({ data }) => {
  console.log(data);
  return (
    <div className="row row-cols-3">
      {data.map((array, index) => {
        return (
          <Card
            bg={"Primary".toLowerCase()}
            key={index++}
            text="white"
            style={{ width: "18rem" }}
            className="mb-2 mx-3"
          >
            <Card.Header>
              <StarRating rating={array.rating} />
            </Card.Header>
            <Card.Body>
              <Card.Title> {array.user_username} </Card.Title>
              <Card.Text>{array.review}</Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default Reviews;
