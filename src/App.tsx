import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import ChatBot from "./components/ChatBot.js";
import Navbar from "./components/Navbar.js";
import { Route, Routes } from "react-router-dom";
import Ingest from "./components/Ingest.js";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ChatBot />} />
        <Route path="/Chat" element={<ChatBot />} />
        <Route path="/Ingest" element={<Ingest />} />
      </Routes>
    </>
  );
}

export default App;
