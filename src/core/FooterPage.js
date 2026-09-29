import React, { useState } from "react";
import { Link } from "react-router-dom";

const FooterPagePro = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = e => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <footer style={{ backgroundColor: "#111827", color: "#9CA3AF", borderTop: "1px solid #1F2937" }}>
      {/* Upper Footer: Newsletter & Social */}
      <div style={{ borderBottom: "1px solid #1F2937" }} className="py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-3 mb-lg-0">
              <h5 className="text-white mb-1" style={{ fontFamily: "var(--font-serif, 'Playfair Display', serif)", fontSize: '20px' }}>
                Join the TravelYaari Journal
              </h5>
              <p className="mb-0" style={{ fontSize: "14px", color: "#9CA3AF" }}>
                Receive private villa openings, seasonal travel essays, and exclusive escape invites.
              </p>
            </div>
            <div className="col-lg-6">
              {subscribed ? (
                <div className="alert alert-success py-2 px-3 mb-0" style={{ fontSize: '13px', borderRadius: '8px' }}>
                  <i className="fa fa-check mr-2"></i> Thank you for subscribing. Look out for our seasonal guide!
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="d-flex">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={e => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="form-control mr-2"
                    style={{
                      borderRadius: "8px",
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      color: "#FFFFFF",
                      fontSize: "14px"
                    }}
                  />
                  <button
                    type="submit"
                    className="btn text-white font-weight-bold px-4"
                    style={{
                      backgroundColor: "#0F5132",
                      borderRadius: "8px",
                      fontSize: "14px",
                      whiteSpace: "nowrap"
                    }}
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container py-5">
        <div className="row">
          
          {/* Brand info */}
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <Link to="/" style={{ textDecoration: "none" }}>
              <span
                className="d-block text-white mb-3"
                style={{
                  fontFamily: "var(--font-serif, 'Playfair Display', serif)",
                  fontSize: "24px",
                  fontWeight: "700"
                }}
              >
                TravelYaari
              </span>
            </Link>
            <p style={{ fontSize: "14px", lineHeight: "1.7", color: "#9CA3AF" }}>
              Curated boutique sanctuaries, royal heritage palaces, and remote mountain chalets across India. Dedicated to transformative travel experiences and mindful hospitality.
            </p>
            <div className="d-flex align-items-center mt-3" style={{ gap: "12px" }}>
              <a href="#facebook" className="text-muted" style={{ fontSize: "16px" }} aria-label="Facebook">
                <i className="fa fa-facebook"></i>
              </a>
              <a href="#instagram" className="text-muted" style={{ fontSize: "16px" }} aria-label="Instagram">
                <i className="fa fa-instagram"></i>
              </a>
              <a href="#twitter" className="text-muted" style={{ fontSize: "16px" }} aria-label="Twitter">
                <i className="fa fa-twitter"></i>
              </a>
              <a href="#linkedin" className="text-muted" style={{ fontSize: "16px" }} aria-label="LinkedIn">
                <i className="fa fa-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 className="text-white text-uppercase font-weight-bold mb-3" style={{ fontSize: "12px", letterSpacing: "0.1em" }}>
              Experiences
            </h6>
            <ul className="list-unstyled" style={{ fontSize: "14px", lineHeight: "2" }}>
              <li><Link to="/shop" className="text-muted text-decoration-none">Hill Stations</Link></li>
              <li><Link to="/shop" className="text-muted text-decoration-none">Coastal Resorts</Link></li>
              <li><Link to="/shop" className="text-muted text-decoration-none">Heritage Palaces</Link></li>
              <li><Link to="/shop" className="text-muted text-decoration-none">Spiritual Havens</Link></li>
              <li><Link to="/gallery" className="text-muted text-decoration-none">Visual Gallery</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 className="text-white text-uppercase font-weight-bold mb-3" style={{ fontSize: "12px", letterSpacing: "0.1em" }}>
              Company
            </h6>
            <ul className="list-unstyled" style={{ fontSize: "14px", lineHeight: "2" }}>
              <li><Link to="/about" className="text-muted text-decoration-none">Our Story</Link></li>
              <li><Link to="/team" className="text-muted text-decoration-none">Curators & Team</Link></li>
              <li><Link to="/contact" className="text-muted text-decoration-none">Concierge Desk</Link></li>
              <li><Link to="/cart" className="text-muted text-decoration-none">Saved Itinerary</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="col-lg-4 col-md-6">
            <h6 className="text-white text-uppercase font-weight-bold mb-3" style={{ fontSize: "12px", letterSpacing: "0.1em" }}>
              Concierge & Enquiries
            </h6>
            <ul className="list-unstyled" style={{ fontSize: "13.5px", lineHeight: "2" }}>
              <li className="d-flex align-items-baseline mb-2">
                <i className="fa fa-map-marker text-success mr-2"></i>
                <span>Heritage Trail Complex, Civil Lines, Gorakhpur, UP 274203</span>
              </li>
              <li className="d-flex align-items-center mb-2">
                <i className="fa fa-envelope text-success mr-2"></i>
                <span>concierge@travelyaari.com</span>
              </li>
              <li className="d-flex align-items-center mb-2">
                <i className="fa fa-phone text-success mr-2"></i>
                <span>+91 98765 43210 / 1800-TY-ESCAPE</span>
              </li>
              <li className="d-flex align-items-center">
                <i className="fa fa-clock-o text-success mr-2"></i>
                <span>Concierge Desk: 24/7 Priority Support</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="py-3 text-center" style={{ borderTop: "1px solid #1F2937", fontSize: "13px", color: "#6B7280" }}>
        <div className="container d-flex flex-wrap justify-content-between align-items-center">
          <span>&copy; {new Date().getFullYear()} TravelYaari Hospitality Private Limited. All rights reserved.</span>
          <div className="d-flex" style={{ gap: "16px" }}>
            <span className="text-muted">Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span className="text-muted">Terms of Reservation</span>
            <span aria-hidden="true">·</span>
            <span className="text-muted">Guest Safety Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterPagePro;
