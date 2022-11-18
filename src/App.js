import React from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home.js";
import Login from "./pages/Login/Login.js";
import Cart from "./pages/Cart/Cart.js";
import Update from "./pages/Update/Update.js";
import Orders from "./pages/Orders/Orders.js";
import Register from "./pages/Register/Register.js";
import Navbar from "./pages/Navbar/Navbar.js";
import Product from "./pages/Product/Product.js";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/update" element={<Update />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/product" element={<Product />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
