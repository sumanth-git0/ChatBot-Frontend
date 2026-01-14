import React, { useEffect, useState } from "react";
import keycloak from "../keycloak.js";
import fetchuser from "../utils/user.js";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [user, setUser] = useState<any>("");

  useEffect(() => {
    const init = async () => {
      const current_user = await fetchuser();
      setUser(current_user);
    };

    init();
  }, []);

  const handleLogout = () => {
    keycloak.logout({
      redirectUri: "http://localhost:5173/",
    });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Ingest" className="nav-link">
                  Ingestion
                </Link>
              </li>
            </ul>
            <div className="d-flex align-items-center gap-3">
              <span className="badge bg-primary px-3 py-2">
                <i className="bi bi-person-circle me-2"></i>
                {user?.name}
              </span>

              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-1"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
