import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";
import sideImage from "../assets/images/travel_hero_luxury_resort_1790702626445.jpg";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false
  });

  const { email, password, loading, error, redirectToReferrer } = values;
  const auth = isAuthenticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then(data => {
      if (!data || data.error) {
        setValues({ ...values, error: data ? data.error : "Failed to sign in", loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true
          });
        });
      }
    }).catch(() => {
      setValues({ ...values, error: "Sign in error", loading: false });
    });
  };

  const fillQuickDemo = (demoEmail, demoPass) => {
    setValues(v => ({ ...v, email: demoEmail, password: demoPass, error: "" }));
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (auth && auth.user && auth.user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Layout
      title="Sign In - TravelYaari"
      description="Access your luxury travel bookings and curated itineraries."
      className="p-0 m-0"
    >
      {redirectUser()}

      <div style={{ backgroundColor: "#FAF9F6", minHeight: "80vh" }} className="py-5 d-flex align-items-center">
        <div className="container">
          <div
            className="row no-gutters mx-auto shadow-sm bg-white overflow-hidden"
            style={{
              maxWidth: "960px",
              borderRadius: "16px",
              border: "1px solid #E5E7EB"
            }}
          >
            {/* Visual Column */}
            <div className="col-md-5 d-none d-md-block position-relative">
              <img
                src={sideImage}
                alt="Travel Sanctuary"
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
              />
              <div
                className="position-absolute"
                style={{
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "linear-gradient(180deg, rgba(15, 81, 50, 0.4) 0%, rgba(17, 24, 39, 0.85) 100%)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "2rem",
                  color: "#FFFFFF"
                }}
              >
                <span className="text-uppercase" style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#D1D5DB" }}>
                  TravelYaari Guest Portal
                </span>
                <h4
                  className="font-weight-bold mt-1 mb-2 text-white"
                  style={{ fontFamily: "var(--font-serif, 'Playfair Display', serif)" }}
                >
                  Return to Serenity
                </h4>
                <p style={{ fontSize: "13px", lineHeight: "1.6", color: "#E5E7EB", marginBottom: 0 }}>
                  Manage your reserved mountain chalets, seaside villas, and private concierge itineraries in one place.
                </p>
              </div>
            </div>

            {/* Form Column */}
            <div className="col-md-7 p-4 p-lg-5">
              <div className="mb-4">
                <span className="text-uppercase font-weight-bold" style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#0F5132" }}>
                  Welcome Back
                </span>
                <h2
                  className="mt-1 font-weight-bold"
                  style={{
                    fontFamily: "var(--font-serif, 'Playfair Display', serif)",
                    fontSize: "28px",
                    color: "#111827"
                  }}
                >
                  Sign In to Your Account
                </h2>
                <p className="text-muted" style={{ fontSize: "14px" }}>
                  Enter your credentials to access your reserved retreats.
                </p>
              </div>

              {error && (
                <div className="alert alert-danger py-2 px-3 mb-3" style={{ fontSize: "13px", borderRadius: "8px" }}>
                  <i className="fa fa-exclamation-circle mr-1"></i> {error}
                </div>
              )}

              {/* Quick Demo Credentials for Fast Testing */}
              <div className="p-3 mb-4 rounded" style={{ backgroundColor: "#F3F4F6", border: "1px solid #E5E7EB", fontSize: "12.5px" }}>
                <span className="font-weight-bold d-block mb-1 text-dark">Quick Demo Access:</span>
                <div className="d-flex flex-wrap" style={{ gap: "8px" }}>
                  <button
                    type="button"
                    onClick={() => fillQuickDemo("traveler@travelyaari.com", "password123")}
                    className="btn btn-sm btn-outline-dark py-1 px-2"
                    style={{ borderRadius: "6px", fontSize: "12px" }}
                  >
                    Demo Traveler
                  </button>
                  <button
                    type="button"
                    onClick={() => fillQuickDemo("admin@travelyaari.com", "password123")}
                    className="btn btn-sm btn-outline-success py-1 px-2"
                    style={{ borderRadius: "6px", fontSize: "12px" }}
                  >
                    Demo Admin
                  </button>
                </div>
              </div>

              <form onSubmit={clickSubmit}>
                <div className="form-group mb-3">
                  <label className="font-weight-medium text-muted" style={{ fontSize: "13px" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="form-control"
                    placeholder="you@domain.com"
                    value={email}
                    onChange={handleChange("email")}
                    style={{ borderRadius: "8px", fontSize: "14px", padding: "10px 14px" }}
                  />
                </div>

                <div className="form-group mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label className="font-weight-medium text-muted mb-0" style={{ fontSize: "13px" }}>
                      Password
                    </label>
                  </div>
                  <input
                    type="password"
                    required
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handleChange("password")}
                    style={{ borderRadius: "8px", fontSize: "14px", padding: "10px 14px" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-block text-white py-2 font-weight-bold"
                  style={{
                    backgroundColor: "#0F5132",
                    borderRadius: "8px",
                    fontSize: "14px",
                    transition: "background-color 0.2s"
                  }}
                >
                  {loading ? (
                    <span><i className="fa fa-spinner fa-spin mr-2"></i> Signing In...</span>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              <div className="mt-4 pt-3 border-top text-center" style={{ fontSize: "13.5px" }}>
                <span className="text-muted">New to TravelYaari? </span>
                <Link to="/signup" className="font-weight-bold" style={{ color: "#0F5132" }}>
                  Create an account
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signin;
