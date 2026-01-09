import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import ChatBot from "./components/ChatBot.js";
import Navbar from "./components/Navbar.js";

function App() {
  return (
    <>
      <Navbar />
      <ChatBot />
    </>
  );
}

export default App;
