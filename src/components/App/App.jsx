import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import logo from "../../assets/logo.svg";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="page">
        <Header />
      </div>
    </BrowserRouter>
  );
}

export default App;
