import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCartContext } from '../../context/userCart/UserCartProvider';
import { Helmet } from 'react-helmet-async';
import './Payment.scss';
import { USER_CART_ACTION } from '../../context/userCart/UserCartReducer';

const Payment = () => {
  const navigate = useNavigate();

  // Global state variables
  const { paymentMethod, dispatch } = useContext(UserCartContext);

  // Local state variable
  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || 'PayPal'
  );

  // Submit payment
  const submitPayment = async (e) => {
    try {
      e.preventDefault();
      dispatch({
        type: USER_CART_ACTION.PAYMENT_METHOD,
        payload: paymentMethodName,
      });
      localStorage.setItem('paymentMethod', paymentMethodName);
      navigate('/place-order');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="payment-page">
      <Helmet>
        <title> Payment </title>
      </Helmet>

      <section className="payment-container">
        <h1 className="payment-title"> Payment Methods </h1>

        <form onSubmit={submitPayment} action="" className="payment-form">
          <div className="payment-input">
            <input
              type="radio"
              id="payPal"
              label="payPal"
              value="payPal"
              checked={paymentMethodName === 'payPal'}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            />
            <label htmlFor="payPal">PayPal</label>
          </div>

          <div className="payment-input">
            <input
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === 'Stripe'}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            />

            <label htmlFor="stripe">Stripe</label>
          </div>

          <button className="payment-btn"> Next </button>
        </form>
      </section>
    </main>
  );
};

export default Payment;
