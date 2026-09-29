import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = items => {
    return (
      <div>
        <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
          <h4 className="font-weight-bold mb-0" style={{ fontSize: '18px', color: '#111827' }}>
            Reserved Escapes ({items.length})
          </h4>
          <Link to="/shop" className="text-decoration-none" style={{ fontSize: '13px', fontWeight: '600', color: '#0F5132' }}>
            + Add Another Stay
          </Link>
        </div>

        <div className="d-flex flex-column" style={{ gap: '20px' }}>
          {items.map((product, i) => (
            <Card
              key={i}
              product={product}
              showAddToCartButton={false}
              cartUpdate={true}
              showRemoveProductButton={true}
              setRun={setRun}
              run={run}
            />
          ))}
        </div>
      </div>
    );
  };

  const noItemsMessage = () => (
    <div className="text-center py-5 my-4 bg-white rounded shadow-sm p-4" style={{ border: '1px solid #E5E7EB', borderRadius: '16px' }}>
      <div className="mb-3 text-muted">
        <i className="fa fa-suitcase" style={{ fontSize: '48px', color: '#9CA3AF' }}></i>
      </div>
      <h3
        style={{
          fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
          fontSize: '26px',
          fontWeight: '700',
          color: '#111827'
        }}
      >
        Your Travel Itinerary is Empty
      </h3>
      <p className="text-muted mx-auto mb-4" style={{ maxWidth: '440px', fontSize: '14px', lineHeight: '1.6' }}>
        You haven't added any boutique sanctuaries or resorts to your wishlist yet. Explore our curated collections to start planning your next journey.
      </p>
      <Link
        to="/shop"
        className="btn text-white px-4 py-2 font-weight-bold"
        style={{ backgroundColor: '#0F5132', borderRadius: '8px', fontSize: '14px' }}
      >
        Explore Destinations <i className="fa fa-arrow-right ml-1"></i>
      </Link>
    </div>
  );

  return (
    <Layout
      title="Your Itinerary & Reservation - TravelYaari"
      description="Review your reserved boutique stays and finalize your journey with TravelYaari."
      className="p-0 m-0"
    >
      {/* Header */}
      <div style={{ backgroundColor: "#FAF9F6", borderBottom: "1px solid #ECE8E0" }} className="py-4">
        <div className="container">
          <span className="text-uppercase" style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.15em", color: "#0F5132" }}>
            Reservation Desk
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
            Review Your Travel Itinerary
          </h1>
        </div>
      </div>

      <div className="container py-5">
        {items.length > 0 ? (
          <div className="row">
            {/* Left Column: Items */}
            <div className="col-lg-7 col-md-12 mb-4 mb-lg-0">
              {showItems(items)}
            </div>

            {/* Right Column: Reservation Checkout */}
            <div className="col-lg-5 col-md-12">
              <div
                className="p-4 bg-white rounded shadow-sm sticky-top"
                style={{
                  top: '90px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '16px'
                }}
              >
                <h4 className="font-weight-bold mb-3 pb-2 border-bottom" style={{ fontSize: '18px', color: '#111827' }}>
                  Reservation Summary
                </h4>
                <Checkout products={items} setRun={setRun} run={run} />
              </div>
            </div>
          </div>
        ) : (
          noItemsMessage()
        )}
      </div>
    </Layout>
  );
};

export default Cart;
