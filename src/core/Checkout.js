import React, { useState, useEffect } from 'react';
import {
  getBraintreeClientToken,
  processPayment,
  createOrder
} from './apiCore';
import { emptyCart } from './cartHelpers';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({ products, setRun = f => f, run = undefined }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: ''
  });

  const userId = isAuthenticated() && isAuthenticated().user && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    if (!userId || !token) return;
    getBraintreeClientToken(userId, token).then(resData => {
      if (resData && resData.clientToken) {
        setData(d => ({ ...d, clientToken: resData.clientToken }));
      }
    }).catch(() => {});
  };

  useEffect(() => {
    if (userId && token) {
      getToken(userId, token);
    }
  }, [userId, token]);

  const handleAddress = event => {
    setData({ ...data, address: event.target.value });
  };

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      const count = nextValue.count || 1;
      return currentValue + count * nextValue.price;
    }, 0);
  };

  const confirmDemoBooking = () => {
    setData(d => ({ ...d, loading: true }));
    const createOrderData = {
      products: products,
      transaction_id: "demo_txn_" + Date.now(),
      amount: getTotal(),
      address: data.address || "Heritage Guest Address, Civil Lines"
    };
    createOrder(userId, token, createOrderData)
      .then(() => {
        emptyCart(() => {
          setRun(!run);
          setData(d => ({
            ...d,
            loading: false,
            success: true
          }));
        });
      })
      .catch(() => {
        setData(d => ({ ...d, loading: false, error: "Booking could not be finalized. Please try again." }));
      });
  };

  const buy = () => {
    setData({ ...data, loading: true });
    let nonce;
    data.instance
      .requestPaymentMethod()
      .then(res => {
        nonce = res.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal()
        };

        processPayment(userId, token, paymentData)
          .then(response => {
            const createOrderData = {
              products: products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: data.address
            };

            createOrder(userId, token, createOrderData)
              .then(() => {
                emptyCart(() => {
                  setRun(!run);
                  setData(d => ({
                    ...d,
                    loading: false,
                    success: true
                  }));
                });
              })
              .catch(() => {
                setData(d => ({ ...d, loading: false }));
              });
          })
          .catch(() => {
            setData(d => ({ ...d, loading: false }));
          });
      })
      .catch(error => {
        setData(d => ({ ...d, error: error.message }));
      });
  };

  const showDropIn = () => (
    <div onBlur={() => setData(d => ({ ...d, error: '' }))}>
      {products.length > 0 && (
        <div>
          {/* Guest Contact / Check-in Notes */}
          <div className="form-group mb-3">
            <label className="text-muted font-weight-bold" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Guest Name & Contact Address:
            </label>
            <textarea
              onChange={handleAddress}
              className="form-control"
              value={data.address}
              rows="3"
              style={{ borderRadius: '8px', fontSize: '13.5px' }}
              placeholder="e.g. John Doe, +91 9876543210, Mumbai, MH (Include any dietary or check-in requests)"
            />
          </div>

          {data.clientToken ? (
            <>
              <DropIn
                options={{
                  authorization: data.clientToken,
                  paypal: { flow: 'vault' }
                }}
                onInstance={instance => (data.instance = instance)}
              />
              <button
                onClick={buy}
                disabled={data.loading}
                className="btn btn-block text-white py-3 font-weight-bold shadow-sm"
                style={{ backgroundColor: '#0F5132', borderRadius: '10px', fontSize: '15px' }}
              >
                {data.loading ? 'Processing...' : `Pay ₹${getTotal().toLocaleString('en-IN')}`}
              </button>
            </>
          ) : (
            <button
              onClick={confirmDemoBooking}
              disabled={data.loading}
              className="btn btn-block text-white py-3 font-weight-bold shadow-sm"
              style={{
                backgroundColor: '#0F5132',
                borderRadius: '10px',
                fontSize: '15px',
                transition: 'background-color 0.2s'
              }}
            >
              {data.loading ? (
                <span><i className="fa fa-spinner fa-spin mr-2"></i> Confirming Reservation...</span>
              ) : (
                <span>Confirm Reservation (Instant Book) <i className="fa fa-arrow-right ml-1"></i></span>
              )}
            </button>
          )}

          <div className="mt-3 text-center" style={{ fontSize: '12px', color: '#6B7280' }}>
            <i className="fa fa-shield text-success mr-1"></i> 256-bit Secure Encryption · Free Date Alteration
          </div>
        </div>
      )}
    </div>
  );

  const showError = error => (
    <div className="alert alert-danger py-2 px-3 mt-2" style={{ display: error ? '' : 'none', fontSize: '13px', borderRadius: '8px' }}>
      <i className="fa fa-exclamation-circle mr-1"></i> {error}
    </div>
  );

  const showSuccess = success => (
    <div
      className="p-4 text-center my-3 bg-white rounded shadow-sm border"
      style={{ display: success ? '' : 'none', borderColor: '#A7F3D0', borderRadius: '12px' }}
    >
      <div className="text-success mb-2" style={{ fontSize: '32px' }}>
        <i className="fa fa-check-circle"></i>
      </div>
      <h5 className="font-weight-bold mb-1" style={{ color: '#065F46' }}>Reservation Confirmed!</h5>
      <p className="text-muted mb-3" style={{ fontSize: '13.5px' }}>
        Your boutique retreat booking has been accepted. Our concierge team has forwarded itinerary documentation to your email.
      </p>
      <Link to="/user/dashboard" className="btn btn-sm text-white" style={{ backgroundColor: '#0F5132', borderRadius: '8px' }}>
        View in Dashboard
      </Link>
    </div>
  );

  const totalAmount = getTotal().toLocaleString('en-IN');

  return (
    <div>
      {/* Price breakdown */}
      <div className="py-2 mb-3" style={{ fontSize: '14px', color: '#4B5563' }}>
        <div className="d-flex justify-content-between mb-2">
          <span>Stays Subtotal:</span>
          <span className="font-weight-medium tabular-nums">₹{totalAmount}</span>
        </div>
        <div className="d-flex justify-content-between mb-2 text-muted">
          <span>Concierge & Booking Fee:</span>
          <span className="text-success font-weight-medium">Complimentary</span>
        </div>
        <div className="d-flex justify-content-between mb-2 text-muted">
          <span>Government Taxes:</span>
          <span>Included</span>
        </div>
        <div className="d-flex justify-content-between pt-3 border-top mt-2 font-weight-bold" style={{ fontSize: '17px', color: '#111827' }}>
          <span>Total Payable:</span>
          <span className="tabular-nums" style={{ color: '#0F5132' }}>₹{totalAmount}</span>
        </div>
      </div>

      {showSuccess(data.success)}
      {showError(data.error)}

      {!data.success && (
        isAuthenticated() ? (
          <div>{showDropIn()}</div>
        ) : (
          <div className="p-3 bg-light rounded text-center border">
            <p className="text-muted mb-3" style={{ fontSize: '13.5px' }}>
              Please sign in or register to complete your reservation and view your booking records.
            </p>
            <Link
              to="/signin"
              className="btn btn-block text-white font-weight-bold py-2"
              style={{ backgroundColor: '#0F5132', borderRadius: '8px', fontSize: '14px' }}
            >
              Sign In to Reserve
            </Link>
          </div>
        )
      )}
    </div>
  );
};

export default Checkout;
