import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [product, setProduct] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logout");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  const fetchProducts = async () => {
    try {
      const url = "https://authentication-7s8l.onrender.com/api/v1/products";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      setProduct(result);
      console.log(result);
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <h1>{loggedInUser}</h1>
      <div>
        {product &&
          product.map((item, index) => {
            return (
              <ul key={index}>
                <span>
                  {item.name} : {item.price}
                </span>
              </ul>
            );
          })}
      </div>
      <button onClick={handleLogout}>Logout</button>

      <ToastContainer />
    </div>
  );
};

export default Home;
