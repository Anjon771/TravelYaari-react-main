import React, { useState } from 'react';
import Layout from './Layout';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = name => e => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout
      title="Contact Concierge - TravelYaari"
      description="Connect with TravelYaari's 24/7 dedicated concierge desk for personalized retreat bookings."
      className="p-0 m-0"
    >
      {/* Header */}
      <div style={{ backgroundColor: "#FAF9F6", borderBottom: "1px solid #ECE8E0" }} className="py-5">
        <div className="container">
          <span className="text-uppercase" style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.15em", color: "#0F5132" }}>
            The Concierge Desk
          </span>
          <h1
            className="mt-1 mb-2"
            style={{
              fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
              fontSize: "36px",
              fontWeight: "700",
              color: "#111827"
            }}
          >
            Connect With Our Travel Curators
          </h1>
          <p className="text-muted mb-0" style={{ maxWidth: "640px", fontSize: "15px", lineHeight: "1.6" }}>
            Whether you seek a bespoke wedding itinerary, a private mountain chalet buyout, or local excursion advice, our team is at your service.
          </p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row">
          
          {/* Left Column: Form */}
          <div className="col-lg-7 mb-5 mb-lg-0">
            <div
              className="p-4 p-md-5 bg-white rounded shadow-sm"
              style={{ border: '1px solid #E5E7EB', borderRadius: '16px' }}
            >
              <h3
                className="font-weight-bold mb-2"
                style={{ fontFamily: "var(--font-serif, 'Playfair Display', serif)", fontSize: '24px', color: '#111827' }}
              >
                Send Us an Enquiry
              </h3>
              <p className="text-muted mb-4" style={{ fontSize: '14px' }}>
                We typically respond within 2 business hours with verified destination availability.
              </p>

              {submitted ? (
                <div className="alert alert-success p-4 rounded text-center" style={{ borderRadius: '12px' }}>
                  <i className="fa fa-check-circle text-success mb-2" style={{ fontSize: '32px' }}></i>
                  <h5 className="font-weight-bold">Enquiry Received!</h5>
                  <p className="mb-3 text-muted" style={{ fontSize: '14px' }}>
                    Thank you, {formData.name || 'valued guest'}. A senior travel curator has been assigned to your request and will reach out via email shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', destination: '', message: '' });
                    }}
                    className="btn btn-sm btn-outline-success font-weight-bold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 form-group mb-3">
                      <label className="text-muted font-weight-medium" style={{ fontSize: '13px' }}>
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        placeholder="e.g. Radhika Kapoor"
                        value={formData.name}
                        onChange={handleChange('name')}
                        style={{ borderRadius: '8px', fontSize: '14px', padding: '10px 12px' }}
                      />
                    </div>

                    <div className="col-md-6 form-group mb-3">
                      <label className="text-muted font-weight-medium" style={{ fontSize: '13px' }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        className="form-control"
                        placeholder="radhika@example.com"
                        value={formData.email}
                        onChange={handleChange('email')}
                        style={{ borderRadius: '8px', fontSize: '14px', padding: '10px 12px' }}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 form-group mb-3">
                      <label className="text-muted font-weight-medium" style={{ fontSize: '13px' }}>
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange('phone')}
                        style={{ borderRadius: '8px', fontSize: '14px', padding: '10px 12px' }}
                      />
                    </div>

                    <div className="col-md-6 form-group mb-3">
                      <label className="text-muted font-weight-medium" style={{ fontSize: '13px' }}>
                        Desired Destination
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Auli, Goa, Kashmir, Agra..."
                        value={formData.destination}
                        onChange={handleChange('destination')}
                        style={{ borderRadius: '8px', fontSize: '14px', padding: '10px 12px' }}
                      />
                    </div>
                  </div>

                  <div className="form-group mb-4">
                    <label className="text-muted font-weight-medium" style={{ fontSize: '13px' }}>
                      Message or Specific Requirements
                    </label>
                    <textarea
                      rows="4"
                      required
                      className="form-control"
                      placeholder="Tell us about your expected travel dates, party size, special celebrations, or dietary preferences..."
                      value={formData.message}
                      onChange={handleChange('message')}
                      style={{ borderRadius: '8px', fontSize: '14px', padding: '10px 12px' }}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn text-white py-3 px-4 font-weight-bold shadow-sm"
                    style={{ backgroundColor: '#0F5132', borderRadius: '8px', fontSize: '14px' }}
                  >
                    Submit Concierge Request <i className="fa fa-arrow-right ml-1"></i>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Direct Info & Support */}
          <div className="col-lg-5">
            <div
              className="p-4 p-md-5 bg-white rounded shadow-sm mb-4"
              style={{ border: '1px solid #E5E7EB', borderRadius: '16px' }}
            >
              <h4 className="font-weight-bold mb-3" style={{ fontSize: '18px', color: '#111827' }}>
                Headquarters & Guest Desk
              </h4>

              <div className="mb-4">
                <div className="d-flex align-items-baseline mb-3">
                  <div className="mr-3 text-center" style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#E8F5E9', lineHeight: '32px', color: '#0F5132' }}>
                    <i className="fa fa-map-marker"></i>
                  </div>
                  <div>
                    <h6 className="mb-0 font-weight-bold" style={{ fontSize: '14px' }}>Civil Lines Office</h6>
                    <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
                      Heritage Complex, Civil Lines, Gorakhpur, UP 274203, India
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-baseline mb-3">
                  <div className="mr-3 text-center" style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#E8F5E9', lineHeight: '32px', color: '#0F5132' }}>
                    <i className="fa fa-envelope"></i>
                  </div>
                  <div>
                    <h6 className="mb-0 font-weight-bold" style={{ fontSize: '14px' }}>Email Desk</h6>
                    <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
                      concierge@travelyaari.com<br />
                      bookings@travelyaari.com
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-baseline mb-3">
                  <div className="mr-3 text-center" style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#E8F5E9', lineHeight: '32px', color: '#0F5132' }}>
                    <i className="fa fa-phone"></i>
                  </div>
                  <div>
                    <h6 className="mb-0 font-weight-bold" style={{ fontSize: '14px' }}>Toll-Free & Direct Line</h6>
                    <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
                      1800-TY-ESCAPE (Toll-Free)<br />
                      +91 98765 43210 (International)
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-baseline">
                  <div className="mr-3 text-center" style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#E8F5E9', lineHeight: '32px', color: '#0F5132' }}>
                    <i className="fa fa-clock-o"></i>
                  </div>
                  <div>
                    <h6 className="mb-0 font-weight-bold" style={{ fontSize: '14px' }}>Operating Hours</h6>
                    <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
                      Concierge Support: 24 Hours, 7 Days a Week
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', fontSize: '13px' }}>
                <span className="font-weight-bold text-dark d-block mb-1">
                  <i className="fa fa-shield text-success mr-1"></i> Emergency Guest Support
                </span>
                <span className="text-muted">
                  Guests currently on active retreats receive direct private WhatsApp access to their assigned destination manager.
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
