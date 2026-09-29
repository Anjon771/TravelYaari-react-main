import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const {
    user: { name, email, role }
  } = isAuthenticated();

  return (
    <Layout
      title="Admin Operations Console - TravelYaari"
      description="Manage destinations, reservations, and categories."
      className="p-0 m-0"
    >
      <div style={{ backgroundColor: "#FAF9F6", borderBottom: "1px solid #ECE8E0" }} className="py-4">
        <div className="container">
          <span className="text-uppercase" style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.15em", color: "#0F5132" }}>
            Management Desk
          </span>
          <h1
            className="mt-1 mb-0"
            style={{
              fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
              fontSize: "32px",
              fontWeight: "700",
              color: "#111827"
            }}
          >
            Admin Operations Portal
          </h1>
        </div>
      </div>

      <div className="container py-5">
        <div className="row">
          
          {/* Admin Profile */}
          <div className="col-lg-4 mb-4 mb-lg-0">
            <div className="bg-white rounded shadow-sm p-4 mb-4" style={{ border: '1px solid #E5E7EB', borderRadius: '14px' }}>
              <div className="d-flex align-items-center mb-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center text-white font-weight-bold mr-3"
                  style={{ width: '48px', height: '48px', backgroundColor: '#0F5132', fontSize: '18px' }}
                >
                  {(name && name[0]) ? name[0].toUpperCase() : 'A'}
                </div>
                <div>
                  <h5 className="font-weight-bold mb-0" style={{ fontSize: '16px', color: '#111827' }}>{name}</h5>
                  <small className="text-muted">{email}</small>
                </div>
              </div>
              <div className="pt-2 border-top">
                <span className="badge badge-success px-2 py-1" style={{ backgroundColor: '#E8F5E9', color: '#0F5132', fontSize: '12px', fontWeight: '500' }}>
                  {role === 1 ? 'System Administrator' : 'Staff Member'}
                </span>
              </div>
            </div>

            <div className="bg-white rounded shadow-sm p-4" style={{ border: '1px solid #E5E7EB', borderRadius: '14px' }}>
              <h6 className="font-weight-bold mb-3" style={{ fontSize: '14px' }}>System Overview</h6>
              <p className="text-muted mb-0" style={{ fontSize: '13px', lineHeight: '1.6' }}>
                Use this console to publish new boutique sanctuaries, edit pricing tiers, manage experience categories, and oversee guest reservation records.
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="col-lg-8">
            <div className="bg-white rounded shadow-sm p-4" style={{ border: '1px solid #E5E7EB', borderRadius: '14px' }}>
              <h4 className="font-weight-bold mb-4 pb-2 border-bottom" style={{ fontSize: '18px', color: '#111827' }}>
                Administrative Controls
              </h4>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="p-3 rounded border h-100 d-flex flex-column justify-content-between" style={{ backgroundColor: '#FAF9F6' }}>
                    <div>
                      <h5 className="font-weight-bold mb-1" style={{ fontSize: '15px' }}>
                        <i className="fa fa-map-marker text-success mr-2"></i> Destinations
                      </h5>
                      <p className="text-muted" style={{ fontSize: '13px' }}>
                        Add, review, or adjust published boutique properties and pricing.
                      </p>
                    </div>
                    <div className="d-flex" style={{ gap: '8px' }}>
                      <Link to="/create/product" className="btn btn-sm text-white" style={{ backgroundColor: '#0F5132', borderRadius: '6px' }}>
                        + Add Place
                      </Link>
                      <Link to="/admin/products" className="btn btn-sm btn-outline-secondary" style={{ borderRadius: '6px' }}>
                        Manage Places
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="p-3 rounded border h-100 d-flex flex-column justify-content-between" style={{ backgroundColor: '#FAF9F6' }}>
                    <div>
                      <h5 className="font-weight-bold mb-1" style={{ fontSize: '15px' }}>
                        <i className="fa fa-tags text-success mr-2"></i> Categories
                      </h5>
                      <p className="text-muted" style={{ fontSize: '13px' }}>
                        Organize destination collections by terrain, season, and style.
                      </p>
                    </div>
                    <div className="d-flex" style={{ gap: '8px' }}>
                      <Link to="/create/category" className="btn btn-sm text-white" style={{ backgroundColor: '#0F5132', borderRadius: '6px' }}>
                        + New Category
                      </Link>
                      <Link to="/admin/categories" className="btn btn-sm btn-outline-secondary" style={{ borderRadius: '6px' }}>
                        Manage
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="p-3 rounded border h-100 d-flex flex-column justify-content-between" style={{ backgroundColor: '#FAF9F6' }}>
                    <div>
                      <h5 className="font-weight-bold mb-1" style={{ fontSize: '15px' }}>
                        <i className="fa fa-calendar-check-o text-success mr-2"></i> Guest Reservations
                      </h5>
                      <p className="text-muted" style={{ fontSize: '13px' }}>
                        Inspect incoming booking transactions, adjust status, and view guest contact info.
                      </p>
                    </div>
                    <div>
                      <Link to="/admin/orders" className="btn btn-sm text-white" style={{ backgroundColor: '#0F5132', borderRadius: '6px' }}>
                        View Orders & Bookings
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="p-3 rounded border h-100 d-flex flex-column justify-content-between" style={{ backgroundColor: '#FAF9F6' }}>
                    <div>
                      <h5 className="font-weight-bold mb-1" style={{ fontSize: '15px' }}>
                        <i className="fa fa-eye text-success mr-2"></i> Live Storefront
                      </h5>
                      <p className="text-muted" style={{ fontSize: '13px' }}>
                        Preview how guests experience your curated destination listings.
                      </p>
                    </div>
                    <div>
                      <Link to="/shop" className="btn btn-sm btn-outline-secondary" style={{ borderRadius: '6px' }}>
                        Visit Catalog
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
