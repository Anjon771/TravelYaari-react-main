import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import { addItem, updateItem, removeItem } from './cartHelpers';

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count || 1);

  const addToCart = () => {
    addItem(product, () => setRedirect(true));
  };

  const shouldRedirect = () => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const handleChange = productId => event => {
    const val = event.target.value < 1 ? 1 : Number(event.target.value);
    setCount(val);
    setRun(!run);
    updateItem(productId, val);
  };

  const formattedPrice = Number(product.price).toLocaleString('en-IN');
  const categoryName = product.category && (product.category.name || product.category);

  return (
    <div
      className="card h-100 border-0 shadow-sm"
      style={{
        borderRadius: '14px',
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {shouldRedirect()}

      {/* Image Container with subtle zoom on hover */}
      <div className="position-relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
        <ShowImage item={product} url="product" />
      </div>

      {/* Content Area */}
      <div className="card-body p-3 d-flex flex-column justify-content-between" style={{ flexGrow: 1 }}>
        <div>
          {/* Unboxed Metadata (Zero-Pill Discipline) */}
          <div className="d-flex align-items-center flex-wrap mb-1" style={{ fontSize: '12px', color: '#6B7280', letterSpacing: '0.02em' }}>
            {categoryName && (
              <>
                <span className="font-weight-medium text-uppercase">{categoryName}</span>
                <span className="mx-1" aria-hidden="true">·</span>
              </>
            )}
            <span>{product.quantity > 0 ? 'In Season' : 'Limited Dates'}</span>
            <span className="mx-1" aria-hidden="true">·</span>
            <span className="d-inline-flex align-items-center text-warning">
              <i className="fa fa-star mr-1" style={{ fontSize: '11px', color: '#F59E0B' }}></i>
              <span style={{ color: '#374151', fontWeight: '600' }}>{product.rating || '4.9'}</span>
            </span>
          </div>

          {/* Title */}
          <h5
            className="font-weight-bold mb-1"
            style={{
              fontSize: '17px',
              lineHeight: '1.3',
              color: '#111827',
              fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)"
            }}
          >
            <Link to={`/product/${product._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
              {product.name}
            </Link>
          </h5>

          {/* Subtitle / Location */}
          {product.subname && (
            <p className="mb-2 text-truncate" style={{ fontSize: '13px', color: '#4B5563' }}>
              <i className="fa fa-map-marker text-muted mr-1" style={{ fontSize: '12px' }}></i>
              {product.subname}
            </p>
          )}

          {/* Description snippet */}
          <p
            className="text-muted mb-3"
            style={{
              fontSize: '13px',
              lineHeight: '1.5',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              color: '#6B7280'
            }}
          >
            {product.description}
          </p>
        </div>

        {/* Price & Action Module */}
        <div>
          <div className="d-flex align-items-baseline justify-content-between pt-2 border-top mb-2">
            <div>
              <span className="text-muted" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>From</span>
              <div className="d-flex align-items-baseline">
                <span className="font-weight-bold mr-1 tabular-nums" style={{ fontSize: '19px', color: '#0F5132' }}>
                  ₹{formattedPrice}
                </span>
                <span className="text-muted" style={{ fontSize: '12px' }}>/ night</span>
              </div>
            </div>

            <div className="d-flex align-items-center">
              {showViewProductButton && (
                <Link
                  to={`/product/${product._id}`}
                  className="btn btn-sm btn-outline-secondary mr-2"
                  style={{
                    borderRadius: '8px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    border: '1px solid #D1D5DB',
                    color: '#374151'
                  }}
                >
                  Details
                </Link>
              )}
              {showAddToCartButton && (
                <button
                  onClick={addToCart}
                  className="btn btn-sm text-white"
                  style={{
                    backgroundColor: '#0F5132',
                    borderRadius: '8px',
                    padding: '6px 14px',
                    fontSize: '12px',
                    fontWeight: '600',
                    border: 'none',
                    transition: 'background-color 0.2s'
                  }}
                >
                  Book Stay
                </button>
              )}
            </div>
          </div>

          {/* Cart Quantity & Remove Controls */}
          {cartUpdate && (
            <div className="mt-2 pt-2 border-top">
              <div className="d-flex align-items-center justify-content-between">
                <label className="text-muted mb-0" style={{ fontSize: '12px', fontWeight: '500' }}>
                  Nights / Rooms:
                </label>
                <div style={{ width: '100px' }}>
                  <input
                    type="number"
                    min="1"
                    className="form-control form-control-sm text-center font-weight-bold"
                    value={count}
                    onChange={handleChange(product._id)}
                    style={{ borderRadius: '6px', fontSize: '13px' }}
                  />
                </div>
              </div>
            </div>
          )}

          {showRemoveProductButton && (
            <button
              onClick={() => {
                removeItem(product._id);
                setRun(!run);
              }}
              className="btn btn-sm btn-outline-danger btn-block mt-2"
              style={{ borderRadius: '8px', fontSize: '12px', fontWeight: '500' }}
            >
              <i className="fa fa-trash-o mr-1"></i> Remove from Itinerary
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
