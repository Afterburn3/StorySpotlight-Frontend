function DefaultAdmin() {
  return (
    <>
      <div className="px-4 pt-5 mb-5 text-center border-bottom">
        <h1 className="display-4 fw-bold text-body-emphasis">Admin Page</h1>
        <br />
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            In the Admin Page, user can view all their reviews and write new
            reviews!
          </p>
          <p className="lead mb-4">
            Select My Book Reviews to view all your review history.
          </p>
          <p className="lead mb-4">
            Select Add Book Review to create a new book review.
          </p>
        </div>
      </div>
    </>
  );
}

export default DefaultAdmin;
