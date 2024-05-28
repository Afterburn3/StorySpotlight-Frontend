import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import Home from "./Home";
import BookCreate from "./BookCreate";
import BookReviewDetailPage from "./BookReviewDetailPage";
import UserReviewList from "./UserReviewList";
import BookLists from "./BookLists";
import ErrorPage from "./ErrorPage";
import Header from "../component/Header";
import Login from "./Login";
import Register from "./Register";
import UserReviewUpdate from "./UserReviewUpdate";

const Router = () => {
  // State for review books inside database
  const [bookData, setBookData] = useState([]);

  //State for user is authenticated or not, initial is false, once authenticate user can have access to admin
  //and can edit the review once log in
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  //fetch All Books data
  useEffect(() => {
    fetch("https://storyspotlight-backend.onrender.com/allBooks")
      .then((response) => response.json())
      .then((json) => setBookData(json.data.bookslist))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  //Function to check Route for admin
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  //Function to check Route for login and signup
  const RestrictedRoute = ({ element }) => {
    return !isAuthenticated ? element : <Navigate to="/userReviewList" />;
  };

  const router = createBrowserRouter([
    {
      //Home route
      path: "/",
      element: <Home bookData={bookData} />,
      errorElement: <ErrorPage />,
    },
    {
      //User login review list
      path: "userReviewList",
      element: <PrivateRoute element={<UserReviewList />} />,
    },
    {
      //Book list for user and guest
      path: "bookLists",
      element: (
        <BookLists bookData={bookData} isAuthenticated={isAuthenticated} />
      ),
    },
    { path: "register", element: <RestrictedRoute element={<Register />} /> },
    {
      path: "login",
      element: (
        <RestrictedRoute
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
      ),
    },
    {
      //Detail page for list of reviewers for one book
      path: "bookReviewDetailPage/:id",
      element: <BookReviewDetailPage isAuthenticated={isAuthenticated} />,
    },
    {
      //Update user book for user login
      path: "userReviewUpdate/:id",
      element: <PrivateRoute element={<UserReviewUpdate />} />,
    },
    {
      //Create a new book that is not in the data base, for user login
      path: "bookcreate",
      element: <PrivateRoute element={<BookCreate />} />,
    },
  ]);

  return (
    <>
      {/* Header apprear everywhere */}
      <Header
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <RouterProvider router={router} />
    </>
  );
};

export default Router;
