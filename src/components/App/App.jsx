import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import logo from "../../assets/logo.svg";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="page">
        <div className="page__content">
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
