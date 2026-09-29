import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import "../CSS/menu.css";

const Menu = ({ history }) => {
  const [navCollapsed, setNavCollapsed] = useState(true);

  const isActive = path => {
    return history.location.pathname.toLowerCase() === path.toLowerCase();
  };

  const handleToggle = () => {
    setNavCollapsed(!navCollapsed);
  };

  const closeNav = () => {
    setNavCollapsed(true);
  };

  const auth = isAuthenticated();

  return (
    <nav className="navbar navbar-expand-lg travelyaari-navbar">
      <div className="container-fluid d-flex align-items-center justify-content-between p-0">
        
        {/* Zone 1: Single text element wordmark */}
        <Link className="brand-wordmark mr-4" to="/" onClick={closeNav}>
          TravelYaari
        </Link>

        {/* Mobile menu toggle */}
        <button
          className="navbar-toggler p-2 border-0"
          type="button"
          onClick={handleToggle}
          aria-controls="travelyaariNav"
          aria-expanded={!navCollapsed}
          aria-label="Toggle navigation"
          style={{ outline: "none", color: "#0F5132" }}
        >
          <i className={`fa ${navCollapsed ? "fa-bars" : "fa-times"}`} style={{ fontSize: "20px" }}></i>
        </button>

        {/* Collapsible Container */}
        <div className={`collapse navbar-collapse ${!navCollapsed ? "show" : ""}`} id="travelyaariNav">
          
          {/* Zone 2: 4-6 clean text navigation links */}
          <ul className="navbar-nav mx-auto align-items-lg-center">
            <li className="nav-item">
              <Link
                className={`travel-nav-link ${isActive("/shop") ? "active-link" : ""}`}
                to="/shop"
                onClick={closeNav}
              >
                Destinations
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`travel-nav-link ${isActive("/gallery") ? "active-link" : ""}`}
                to="/gallery"
                onClick={closeNav}
              >
                Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`travel-nav-link ${isActive("/about") ? "active-link" : ""}`}
                to="/about"
                onClick={closeNav}
              >
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`travel-nav-link ${isActive("/team") ? "active-link" : ""}`}
                to="/team"
                onClick={closeNav}
              >
                Our Team
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`travel-nav-link ${isActive("/contact") ? "active-link" : ""}`}
                to="/contact"
                onClick={closeNav}
              >
                Contact
              </Link>
            </li>

            {/* Dashboard if authenticated */}
            {auth && auth.user && auth.user.role === 1 && (
              <li className="nav-item">
                <Link
                  className={`travel-nav-link ${isActive("/admin/dashboard") ? "active-link" : ""}`}
                  to="/admin/dashboard"
                  onClick={closeNav}
                >
                  Admin Console
                </Link>
              </li>
            )}
            {auth && auth.user && auth.user.role === 0 && (
              <li className="nav-item">
                <Link
                  className={`travel-nav-link ${isActive("/user/dashboard") ? "active-link" : ""}`}
                  to="/user/dashboard"
                  onClick={closeNav}
                >
                  My Bookings
                </Link>
              </li>
            )}
          </ul>

          {/* Zone 3: 1-2 primary actions */}
          <div className="d-flex align-items-center flex-wrap gap-2 mt-3 mt-lg-0">
            {/* Cart / Saved Stays */}
            <Link className="cart-icon-btn mr-2" to="/cart" onClick={closeNav} title="Saved Destinations & Itinerary">
              <i className="fa fa-suitcase mr-1" style={{ fontSize: "14px", color: "#0F5132" }}></i>
              <span>Itinerary</span>
              <span className="cart-counter">{itemTotal()}</span>
            </Link>

            {/* Auth Buttons */}
            {!auth ? (
              <Fragment>
                <Link className="auth-btn-signin mr-1" to="/signin" onClick={closeNav}>
                  Sign In
                </Link>
                <Link className="auth-btn-signup" to="/signup" onClick={closeNav}>
                  Register
                </Link>
              </Fragment>
            ) : (
              <button
                className="btn btn-sm btn-outline-danger"
                style={{ borderRadius: '8px', fontSize: '13px', fontWeight: '500', padding: '6px 12px' }}
                onClick={() => {
                  signout(() => {
                    closeNav();
                    history.push("/");
                  });
                }}
              >
                <i className="fa fa-sign-out mr-1"></i> Sign Out
              </button>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default withRouter(Menu);
