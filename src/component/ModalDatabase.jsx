function Modaldatabase({ show, bookItem, onClose }) {
  if (!show) {
    return null;
  }

  function goToReview(e) {
    e.preventDefault();
  }

  return (
    <>
      <div className="overlay">
        <div className="overlay-inner">
          <button className="close" onClick={onClose}>
            <i class="fas fa-times"></i>
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
              <button onClick={goToReview}>Review</button>
            </div>
          </div>
          <h4 className="description">{bookItem.book_description}</h4>
        </div>
      </div>
    </>
  );
}

export default Modaldatabase;
