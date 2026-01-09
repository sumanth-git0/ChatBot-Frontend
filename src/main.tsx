import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "bootstrap/dist/css/bootstrap.css";
import keycloak from "./keycloak.js";

// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

keycloak
  .init({
    onLoad: "login-required",
    pkceMethod: "S256",
    redirectUri: "http://localhost:5173/",
  })
  .then(() => {
    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  })
  .catch(console.error);
