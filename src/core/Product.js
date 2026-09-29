import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from './Layout';
import { read, listRelated } from './apiCore';
import Card from './Card';
import ShowImage from './ShowImage';
import { addItem } from './cartHelpers';

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  /* eslint-disable no-unused-vars */
  const [error, setError] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [nights, setNights] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const loadSingleProduct = productId => {
    read(productId).then(data => {
      if (!data) return;
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products
        listRelated(data._id).then(relData => {
          if (relData && !relData.error && Array.isArray(relData)) {
            setRelatedProduct(relData);
          }
        }).catch(() => {});
      }
    }).catch(() => {});
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
    window.scrollTo(0, 0);
  }, [props]);

  const addToCart = () => {
    addItem({ ...product, count: nights }, () => {
      setRedirect(true);
    });
  };

  const handleNightsChange = (delta) => {
    setNights(prev => Math.max(1, prev + delta));
  };

  const formattedPrice = product.price ? Number(product.price).toLocaleString('en-IN') : '0';
  const totalPrice = product.price ? (Number(product.price) * nights).toLocaleString('en-IN') : '0';
  const categoryName = product.category && (product.category.name || product.category);

  return (
    <Layout
      title={product && product.name ? `${product.name} - TravelYaari` : "Destination Details"}
      description={product && product.description ? product.description.substring(0, 160) : "Luxury sanctuary retreat"}
      className="p-0 m-0"
    >
      {redirect && <Redirect to="/cart" />}

      {/* Breadcrumb Bar */}
      <div style={{ backgroundColor: "#FAF9F6", borderBottom: "1px solid #ECE8E0" }} className="py-3">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-transparent p-0 m-0" style={{ fontSize: "13px" }}>
              <li className="breadcrumb-item">
                <Link to="/" className="text-muted text-decoration-none">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/shop" className="text-muted text-decoration-none">Destinations</Link>
              </li>
              {categoryName && (
                <li className="breadcrumb-item text-muted">
                  {categoryName}
                </li>
              )}
              <li className="breadcrumb-item active text-dark font-weight-medium" aria-current="page">
                {product.name || 'Sanctuary'}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main PDP Container */}
      <div className="container py-5">
        <div className="row">
          
          {/* Left Column: Visual Showcase & Sanctuary Story */}
          <div className="col-lg-8 mb-5 mb-lg-0">
            {/* Image Showcase */}
            <div
              className="position-relative overflow-hidden mb-4 shadow-sm"
              style={{
                borderRadius: '16px',
                aspectRatio: '16/10',
                border: '1px solid rgba(0, 0, 0, 0.08)'
              }}
            >
              <ShowImage item={product} url="product" />
            </div>

            {/* Title & Location */}
            <div className="mb-4">
              <div className="d-flex align-items-center mb-2" style={{ fontSize: '13px', color: '#6B7280' }}>
                {categoryName && <span className="text-uppercase font-weight-bold">{categoryName}</span>}
                <span className="mx-2" aria-hidden="true">·</span>
                <span>{product.quantity > 0 ? 'Verified Available' : 'Limited Season'}</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <span className="text-warning">
                  <i className="fa fa-star mr-1" style={{ color: '#F59E0B' }}></i>
                  <strong className="text-dark">{product.rating || '4.9'}</strong> (120+ verified guests)
                </span>
              </div>

              <h1
                style={{
                  fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
                  fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                  fontWeight: '700',
                  color: '#111827',
                  lineHeight: '1.2'
                }}
              >
                {product.name}
              </h1>

              {product.subname && (
                <p className="lead text-muted mt-1 mb-0" style={{ fontSize: '16px' }}>
                  <i className="fa fa-map-marker text-success mr-2"></i>{product.subname}
                </p>
              )}
            </div>

            <hr />

            {/* Sanctuary Highlights / Amenities */}
            <div className="my-4">
              <h4 className="font-weight-bold mb-3" style={{ fontSize: '18px', color: '#111827' }}>
                Sanctuary Inclusions & Highlights
              </h4>
              <div className="row">
                <div className="col-sm-6 mb-3">
                  <div className="d-flex align-items-center">
                    <div className="mr-3 text-center" style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#E8F5E9', lineHeight: '36px', color: '#0F5132' }}>
                      <i className="fa fa-coffee"></i>
                    </div>
                    <div>
                      <h6 className="mb-0 font-weight-bold" style={{ fontSize: '14px' }}>Gourmet Breakfast</h6>
                      <small className="text-muted">Artisanal farm-to-table morning spread</small>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 mb-3">
                  <div className="d-flex align-items-center">
                    <div className="mr-3 text-center" style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#E8F5E9', lineHeight: '36px', color: '#0F5132' }}>
                      <i className="fa fa-wifi"></i>
                    </div>
                    <div>
                      <h6 className="mb-0 font-weight-bold" style={{ fontSize: '14px' }}>High-Speed Wi-Fi</h6>
                      <small className="text-muted">Seamless remote connectivity</small>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 mb-3">
                  <div className="d-flex align-items-center">
                    <div className="mr-3 text-center" style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#E8F5E9', lineHeight: '36px', color: '#0F5132' }}>
                      <i className="fa fa-tint"></i>
                    </div>
                    <div>
                      <h6 className="mb-0 font-weight-bold" style={{ fontSize: '14px' }}>Private Plunge Pool / Spa</h6>
                      <small className="text-muted">Heated baths & panoramic sundeck</small>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 mb-3">
                  <div className="d-flex align-items-center">
                    <div className="mr-3 text-center" style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#E8F5E9', lineHeight: '36px', color: '#0F5132' }}>
                      <i className="fa fa-shield"></i>
                    </div>
                    <div>
                      <h6 className="mb-0 font-weight-bold" style={{ fontSize: '14px' }}>24/7 Dedicated Concierge</h6>
                      <small className="text-muted">Private transfers & bespoke itineraries</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr />

            {/* Description & Narrative */}
            <div className="my-4">
              <h4 className="font-weight-bold mb-3" style={{ fontSize: '18px', color: '#111827' }}>
                About This Experience
              </h4>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#374151' }}>
                {product.description}
              </p>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#374151' }}>
                TravelYaari guarantees each guest private, uninterrupted access to the resort grounds with daily housekeeping, luggage assistance, and personalized recommendations from resident experts.
              </p>
            </div>

            <hr />

            {/* Host Policy & Policies */}
            <div className="my-4">
              <h4 className="font-weight-bold mb-3" style={{ fontSize: '18px', color: '#111827' }}>
                Reservation & Stay Notes
              </h4>
              <div className="p-3 rounded" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', fontSize: '13.5px', lineHeight: '1.7', color: '#4B5563' }}>
                <p className="mb-1"><strong>Check-in:</strong> 2:00 PM · <strong>Check-out:</strong> 11:00 AM</p>
                <p className="mb-1"><strong>Cancellation:</strong> Complimentary date changes or full refunds up to 48 hours before check-in.</p>
                <p className="mb-0"><strong>Safety & Hygiene:</strong> Fully sanitized between stays according to national luxury hospitality guidelines.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Contiguous Booking Module */}
          <div className="col-lg-4">
            <div
              className="p-4 bg-white rounded shadow-sm sticky-top"
              style={{
                top: '90px',
                border: '1px solid #E5E7EB',
                borderRadius: '16px'
              }}
            >
              <div className="d-flex align-items-baseline justify-content-between pb-3 mb-3 border-bottom">
                <div>
                  <span className="text-muted" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>From</span>
                  <div className="d-flex align-items-baseline">
                    <span className="font-weight-bold mr-1 tabular-nums" style={{ fontSize: '26px', color: '#0F5132' }}>
                      ₹{formattedPrice}
                    </span>
                    <span className="text-muted" style={{ fontSize: '13px' }}>/ night</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="badge badge-success px-2 py-1" style={{ backgroundColor: '#E8F5E9', color: '#0F5132', fontSize: '11px', fontWeight: '600' }}>
                    Direct Partner Rate
                  </span>
                </div>
              </div>

              {/* Booking Controls */}
              <div className="mb-3">
                <label className="text-uppercase font-weight-bold d-block mb-1" style={{ fontSize: '11px', letterSpacing: '0.08em', color: '#6B7280' }}>
                  Duration of Stay
                </label>
                <div className="d-flex align-items-center justify-content-between p-2 rounded" style={{ border: '1px solid #D1D5DB' }}>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                    {nights} {nights === 1 ? 'Night' : 'Nights'}
                  </span>
                  <div className="d-flex align-items-center" style={{ gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => handleNightsChange(-1)}
                      disabled={nights <= 1}
                      className="btn btn-sm btn-outline-secondary p-0 d-flex align-items-center justify-content-center"
                      style={{ width: '28px', height: '28px', borderRadius: '6px' }}
                    >
                      <i className="fa fa-minus" style={{ fontSize: '10px' }}></i>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNightsChange(1)}
                      className="btn btn-sm btn-outline-secondary p-0 d-flex align-items-center justify-content-center"
                      style={{ width: '28px', height: '28px', borderRadius: '6px' }}
                    >
                      <i className="fa fa-plus" style={{ fontSize: '10px' }}></i>
                    </button>
                  </div>
                </div>
              </div>

              {/* Price Calculation breakdown */}
              <div className="py-2 mb-3" style={{ fontSize: '13.5px', color: '#4B5563' }}>
                <div className="d-flex justify-content-between mb-1">
                  <span>₹{formattedPrice} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
                  <span className="tabular-nums font-weight-medium">₹{totalPrice}</span>
                </div>
                <div className="d-flex justify-content-between mb-1 text-muted">
                  <span>Taxes & Service fees</span>
                  <span>Included</span>
                </div>
                <div className="d-flex justify-content-between pt-2 border-top mt-2 font-weight-bold text-dark" style={{ fontSize: '15px' }}>
                  <span>Total Due</span>
                  <span className="text-success tabular-nums">₹{totalPrice}</span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={addToCart}
                className="btn btn-block text-white py-3 font-weight-bold shadow-sm"
                style={{
                  backgroundColor: '#0F5132',
                  borderRadius: '10px',
                  fontSize: '15px',
                  transition: 'background-color 0.2s'
                }}
              >
                Reserve Stay Now <i className="fa fa-arrow-right ml-2"></i>
              </button>

              <div className="mt-3 text-center" style={{ fontSize: '12px', color: '#6B7280' }}>
                <i className="fa fa-lock mr-1 text-success"></i> Instant confirmation · No booking fee
              </div>

              <div className="mt-4 pt-3 border-top text-center">
                <Link to="/contact" className="text-muted text-decoration-none" style={{ fontSize: '13px' }}>
                  <i className="fa fa-question-circle mr-1"></i> Have custom requests? Ask our Concierge
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section: Related Curated Escapes */}
        {relatedProduct.length > 0 && (
          <div className="mt-5 pt-5 border-top">
            <div className="d-flex align-items-end justify-content-between mb-4 flex-wrap">
              <div>
                <span className="text-uppercase" style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '0.15em', color: '#0F5132' }}>
                  You May Also Love
                </span>
                <h3
                  className="mt-1 mb-0"
                  style={{
                    fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
                    fontSize: '28px',
                    fontWeight: '700',
                    color: '#111827'
                  }}
                >
                  Similar Curated Sanctuaries
                </h3>
              </div>
              <Link to="/shop" className="text-decoration-none" style={{ fontSize: '14px', fontWeight: '600', color: '#0F5132' }}>
                Explore All <i className="fa fa-arrow-right ml-1"></i>
              </Link>
            </div>

            <div className="row">
              {relatedProduct.map((product, i) => (
                <div key={i} className="col-lg-4 col-md-6 mb-4">
                  <Card product={product} />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
};

export default Product;
