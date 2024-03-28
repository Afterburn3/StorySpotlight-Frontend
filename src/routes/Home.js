import React from "react";
import About from "../component/About";
import BooksInformation from "../component/BooksInfomation";

function App({ bookData }) {
  return (
    <>
      <About />
      <BooksInformation bookData={bookData} />
    </>
  );
}

export default App;
