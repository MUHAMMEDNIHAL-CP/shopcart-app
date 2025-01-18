import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../../api';

const PaymentStatusPage = ({ setNumberCartItems }) => {
  const [statusMessage, setStatusMessage] = useState('Verifying your payment...');
  const [statusSubMessage, setStatusSubMessage] = useState('Please wait while we process your payment.');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paymentId = queryParams.get('paymentId');
    const payId = queryParams.get('PayerID');
    const ref = queryParams.get('ref');
    const status = queryParams.get('status');
    const txRef = queryParams.get('tx_ref');
    const transactionId = queryParams.get('transaction_id');

    const verifyPayment = async () => {
      try {
        let response;

        if (paymentId && payId && ref) {
          response = await api.post(`paypal_payment_callback/?paymentId=${paymentId}&PayerID=${payId}&ref=${ref}`);
        } else if (status && txRef && transactionId) {
          response = await api.post('payment_callback/', { status, tx_ref: txRef, transaction_id: transactionId });
        } else {
          throw new Error('Missing or invalid payment details.');
        }

        setStatusMessage(response.data.message);
        setStatusSubMessage(response.data.subMessage);

        // Clear cart data
        localStorage.removeItem('cart_code');
        setNumberCartItems(0);
      } catch (err) {
        setError(err.message || 'Payment verification failed.');
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [location, setNumberCartItems]);

  return (
    <header className="py-5" style={{ backgroundColor: '#6050DC', marginTop: "100px", marginBottom: "143px" }}>
      <div className="container px-4 px-lg-5 my-5" >
        <div className="text-center text-white">
          {loading ? (
            <h2 className="display-4 fw-bold">Processing...</h2>
          ) : error ? (
            <>
              <h2 className="display-4 fw-bold">Payment Verification Failed</h2>
              <p className="lead fw-normal text-white-75 mb-4">{error}</p>
            </>
          ) : (
            <>
              <h2 className="display-4 fw-bold">{statusMessage}</h2>
              <p className="lead fw-normal text-white-75 mb-4">{statusSubMessage}</p>
              <span>
                <Link to="/profile" className="btn btn-light btn-lg px-4 py-2 mx-3">
                  View Order Details
                </Link>
                <Link to="/" className="btn btn-light btn-lg px-4 py-2 m-2">
                  Continue Shopping
                </Link>
              </span>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default PaymentStatusPage;
