import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import Home from "./Home";
import BookCreate from "./BookCreate";
import BookEdit from "./BookEdit";
import BookList from "./BookList";
import BookReview from "./BookReview";
import BookFilter from "./BookFilter";
import ErrorPage from "./ErrorPage";
import Header from "../component/Header";
import Admin from "./Admin";
import DefaultAdmin from "./DefaultAmin";
import AdminCreateReview from "./AdminCreateReview";
import Login from "./Login";
import Register from "./Register";

const Router = () => {
  // State for review books inside database
  const [bookData, setBookData] = useState([]);

  // Search for unreview books, and put a list
  const [search, setSearch] = useState("");
  const [allBook, setAllBook] = useState([]);

  //State for select each Book to review page
  const [selectBook, setSelectBook] = useState([]);

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
    fetch("http://localhost:4000/allBooks")
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
    return !isAuthenticated ? element : <Navigate to="/admin" />;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home bookData={bookData} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "admin",
      element: <PrivateRoute element={<Admin />} />,
      children: [
        { index: true, element: <DefaultAdmin /> },
        { path: "booklist", element: <BookList bookData={bookData} /> },
        {
          path: "admincreatereview",
          element: <AdminCreateReview bookData={bookData} />,
        },
      ],
    },
    {
      path: "bookcreate",
      element: (
        <BookCreate
          search={search}
          setSearch={setSearch}
          setAllBook={setAllBook}
          allBook={allBook}
        />
      ),
    },
    {
      path: "bookfilter",
      element: <BookFilter bookData={bookData} />,
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
    { path: "bookreview/:id", element: <BookReview /> },
    { path: "BookEdit/:id", element: <BookEdit /> },
  ]);

  return (
    <>
      <Header
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <RouterProvider router={router} />
    </>
  );
};

export default Router;
