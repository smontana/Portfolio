import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Navbar } from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { About, Home, Work } from "./pages";
import "./styles/index.scss";
import 'react-tooltip/dist/react-tooltip.css'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
      <App />
    </Router>
  </React.StrictMode>
);
