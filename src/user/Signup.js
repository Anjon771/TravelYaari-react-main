import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signup } from "../auth";
import sideImage from "../assets/images/kashmir_dal_lake_shikara_1790702637557.jpg";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const { name, email, password, success, error } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password }).then(data => {
      if (!data || data.error) {
        setValues({ ...values, error: data ? data.error : "Signup failed", success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true
        });
      }
    }).catch(() => {
      setValues({ ...values, error: "Signup request failed", success: false });
    });
  };

  return (
    <Layout
      title="Create Account - TravelYaari"
      description="Register for a TravelYaari guest account."
      className="p-0 m-0"
    >
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
                alt="Kashmir Shikara"
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
                  Join the Circle
                </span>
                <h4
                  className="font-weight-bold mt-1 mb-2 text-white"
                  style={{ fontFamily: "var(--font-serif, 'Playfair Display', serif)" }}
                >
                  Embark on New Horizons
                </h4>
                <p style={{ fontSize: "13px", lineHeight: "1.6", color: "#E5E7EB", marginBottom: 0 }}>
                  Unlock personalized travel recommendations, priority boutique reservations, and complimentary upgrades.
                </p>
              </div>
            </div>

            {/* Form Column */}
            <div className="col-md-7 p-4 p-lg-5">
              <div className="mb-4">
                <span className="text-uppercase font-weight-bold" style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#0F5132" }}>
                  Guest Registration
                </span>
                <h2
                  className="mt-1 font-weight-bold"
                  style={{
                    fontFamily: "var(--font-serif, 'Playfair Display', serif)",
                    fontSize: "28px",
                    color: "#111827"
                  }}
                >
                  Create Your Account
                </h2>
                <p className="text-muted" style={{ fontSize: "14px" }}>
                  Register to manage your stays and receive bespoke itinerary planning.
                </p>
              </div>

              {error && (
                <div className="alert alert-danger py-2 px-3 mb-3" style={{ fontSize: "13px", borderRadius: "8px" }}>
                  <i className="fa fa-exclamation-circle mr-1"></i> {error}
                </div>
              )}

              {success && (
                <div className="alert alert-success py-2 px-3 mb-3" style={{ fontSize: "13px", borderRadius: "8px" }}>
                  <i className="fa fa-check-circle mr-1"></i> New account created! Please{" "}
                  <Link to="/signin" className="font-weight-bold text-success">
                    Sign in here
                  </Link>.
                </div>
              )}

              <form onSubmit={clickSubmit}>
                <div className="form-group mb-3">
                  <label className="font-weight-medium text-muted" style={{ fontSize: "13px" }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Maya Sharma"
                    value={name}
                    onChange={handleChange("name")}
                    style={{ borderRadius: "8px", fontSize: "14px", padding: "10px 14px" }}
                  />
                </div>

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
                  <label className="font-weight-medium text-muted" style={{ fontSize: "13px" }}>
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    className="form-control"
                    placeholder="Create a secure password"
                    value={password}
                    onChange={handleChange("password")}
                    style={{ borderRadius: "8px", fontSize: "14px", padding: "10px 14px" }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-block text-white py-2 font-weight-bold"
                  style={{
                    backgroundColor: "#0F5132",
                    borderRadius: "8px",
                    fontSize: "14px",
                    transition: "background-color 0.2s"
                  }}
                >
                  Register Account
                </button>
              </form>

              <div className="mt-4 pt-3 border-top text-center" style={{ fontSize: "13.5px" }}>
                <span className="text-muted">Already registered? </span>
                <Link to="/signin" className="font-weight-bold" style={{ color: "#0F5132" }}>
                  Sign in here
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
