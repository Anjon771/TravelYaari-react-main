import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser";
import moment from "moment";

const Dashboard = () => {
  const [history, setHistory] = useState([]);

  const {
    user: { _id, name, email, role }
  } = isAuthenticated();
  const token = isAuthenticated().token;

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then(data => {
      if (!data) return;
      if (data.error) {
        console.log(data.error);
      } else if (Array.isArray(data)) {
        setHistory(data);
      }
    }).catch(() => {});
  };

  useEffect(() => {
    init(_id, token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout
      title="Guest Account & Bookings - TravelYaari"
      description="Manage your bookings and profile."
      className="p-0 m-0"
    >
      <div style={{ backgroundColor: "#FAF9F6", borderBottom: "1px solid #ECE8E0" }} className="py-4">
        <div className="container">
          <span className="text-uppercase" style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.15em", color: "#0F5132" }}>
            Guest Portal
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
            Welcome, {name || 'Traveler'}
          </h1>
        </div>
      </div>

      <div className="container py-5">
        <div className="row">
          
          {/* Left Column: Account Navigation & Profile Card */}
          <div className="col-lg-4 mb-4 mb-lg-0">
            <div className="bg-white rounded shadow-sm p-4 mb-4" style={{ border: '1px solid #E5E7EB', borderRadius: '14px' }}>
              <div className="d-flex align-items-center mb-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center text-white font-weight-bold mr-3"
                  style={{ width: '48px', height: '48px', backgroundColor: '#0F5132', fontSize: '18px' }}
                >
                  {(name && name[0]) ? name[0].toUpperCase() : 'G'}
                </div>
                <div>
                  <h5 className="font-weight-bold mb-0" style={{ fontSize: '16px', color: '#111827' }}>{name}</h5>
                  <small className="text-muted">{email}</small>
                </div>
              </div>
              <div className="pt-2 border-top">
                <span className="badge badge-success px-2 py-1" style={{ backgroundColor: '#E8F5E9', color: '#0F5132', fontSize: '12px', fontWeight: '500' }}>
                  {role === 1 ? 'Administrator' : 'Verified Guest'}
                </span>
              </div>
            </div>

            <div className="bg-white rounded shadow-sm overflow-hidden" style={{ border: '1px solid #E5E7EB', borderRadius: '14px' }}>
              <div className="px-4 py-3 border-bottom font-weight-bold text-dark" style={{ fontSize: '14px' }}>
                Quick Navigation
              </div>
              <div className="list-group list-group-flush">
                <Link to="/cart" className="list-group-item list-group-item-action d-flex align-items-center justify-content-between text-dark" style={{ fontSize: '13.5px' }}>
                  <span><i className="fa fa-suitcase mr-2 text-muted"></i> Saved Itinerary</span>
                  <i className="fa fa-angle-right text-muted"></i>
                </Link>
                <Link to={`/profile/${_id}`} className="list-group-item list-group-item-action d-flex align-items-center justify-content-between text-dark" style={{ fontSize: '13.5px' }}>
                  <span><i className="fa fa-user-circle mr-2 text-muted"></i> Update Profile</span>
                  <i className="fa fa-angle-right text-muted"></i>
                </Link>
                <Link to="/shop" className="list-group-item list-group-item-action d-flex align-items-center justify-content-between text-dark" style={{ fontSize: '13.5px' }}>
                  <span><i className="fa fa-compass mr-2 text-muted"></i> Explore Destinations</span>
                  <i className="fa fa-angle-right text-muted"></i>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Reservation History */}
          <div className="col-lg-8">
            <div className="bg-white rounded shadow-sm p-4" style={{ border: '1px solid #E5E7EB', borderRadius: '14px' }}>
              <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
                <h4 className="font-weight-bold mb-0" style={{ fontSize: '18px', color: '#111827' }}>
                  Reservation History ({history.length})
                </h4>
                <Link to="/shop" className="text-decoration-none" style={{ fontSize: '13px', fontWeight: '600', color: '#0F5132' }}>
                  Book Another Retreat
                </Link>
              </div>

              {history.length === 0 ? (
                <div className="text-center py-5">
                  <i className="fa fa-calendar-o text-muted mb-3" style={{ fontSize: '36px' }}></i>
                  <h5 className="font-weight-bold mb-1">No Reservations Found</h5>
                  <p className="text-muted mb-4" style={{ fontSize: '14px' }}>
                    You have not completed any bookings yet.
                  </p>
                  <Link to="/shop" className="btn text-white px-3 py-2 font-weight-bold" style={{ backgroundColor: '#0F5132', borderRadius: '8px', fontSize: '13px' }}>
                    Explore Sanctuaries
                  </Link>
                </div>
              ) : (
                <div className="d-flex flex-column" style={{ gap: '16px' }}>
                  {history.map((order, i) => (
                    <div
                      key={i}
                      className="p-3 rounded border"
                      style={{ backgroundColor: '#FAF9F6', borderColor: '#E5E7EB', borderRadius: '10px' }}
                    >
                      <div className="d-flex align-items-center justify-content-between flex-wrap pb-2 border-bottom mb-2">
                        <div>
                          <span className="font-weight-bold text-dark mr-2" style={{ fontSize: '14px' }}>
                            Booking #{order._id || `TY-${i + 1001}`}
                          </span>
                          <span className="text-muted" style={{ fontSize: '12px' }}>
                            · {order.createdAt ? moment(order.createdAt).format("MMM Do YYYY") : "Recent"}
                          </span>
                        </div>
                        <div>
                          <span className="badge badge-success px-2 py-1" style={{ backgroundColor: '#E8F5E9', color: '#0F5132', fontSize: '11px', fontWeight: '600' }}>
                            {order.status || 'Confirmed'}
                          </span>
                        </div>
                      </div>

                      <div className="mb-2">
                        {order.products && order.products.map((p, pIdx) => (
                          <div key={pIdx} className="d-flex justify-content-between align-items-center py-1" style={{ fontSize: '13.5px' }}>
                            <div>
                              <strong className="text-dark">{p.name}</strong>
                              <span className="text-muted ml-2">× {p.count || 1} {p.count === 1 ? 'night' : 'nights'}</span>
                            </div>
                            <span className="tabular-nums font-weight-medium">₹{(Number(p.price) * (p.count || 1)).toLocaleString('en-IN')}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-top d-flex justify-content-between align-items-center text-muted" style={{ fontSize: '12px' }}>
                        <span>Destination / Contact: {order.address || "Heritage Guest Booking"}</span>
                        <span className="font-weight-bold text-dark" style={{ fontSize: '14px' }}>
                          Total: ₹{Number(order.amount || 0).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
