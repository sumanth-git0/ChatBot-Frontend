import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "bootstrap/dist/css/bootstrap.css";
import keycloak from "./keycloak.js";
import { BrowserRouter } from "react-router-dom";

// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

keycloak
  .init({
    onLoad: "login-required",
    pkceMethod: "S256",
  })
  .then(() => {
    ReactDOM.createRoot(document.getElementById("root")!).render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  })
  .catch(console.error);
