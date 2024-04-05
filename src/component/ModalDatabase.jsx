import { Link } from "react-router-dom";

function Modaldatabase({ show, bookItem, onClose }) {
  if (!show) {
    return null;
  }

  return (
    <>
      <div className="overlay">
        <div className="overlay-inner">
          <button className="close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
          <div className="inner-box">
            <img src={bookItem.img_link} alt="" />
            <div className="info">
              <h1>{bookItem.book_title}</h1>
              <h3>{bookItem.author.replace(/[{"}]/g, "")}</h3>
              <span>{bookItem.categories.replace(/[{"}]/g, "")}</span>
              <br />
              <a href={bookItem.book_snippet}>
                <button>More</button>
              </a>
              {"  "}
              <Link to={`/bookreview/${bookItem.id}`}>
                <button>Review</button>
              </Link>
            </div>
          </div>
          <h4 className="description">{bookItem.book_description}</h4>
        </div>
      </div>
    </>
  );
}

export default Modaldatabase;
