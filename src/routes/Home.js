import React from "react";
import About from "../component/About";
import BooksInformation from "../component/BooksInfomation";
import "../App.css";

function App({ bookData }) {
  return (
    <div className="home-container">
      <header className="banner">
        <h1>Welcome to StorySpotlight</h1>
        <p>Quickly write down reviews and rate your top favorite books.</p>
      </header>
      <About />
      <BooksInformation bookData={bookData} />
    </div>
  );
}

export default App;
