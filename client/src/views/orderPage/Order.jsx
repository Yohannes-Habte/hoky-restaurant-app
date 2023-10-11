import React, { useContext, useEffect, useState } from 'react';
import { UserCartContext } from '../../context/userCart/UserCartProvider';
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { GetOrderContext } from '../../context/order/OrderProvider';
import { usePayPalScriptReducer, PayPalButtons } from '@paypal/react-paypal-js';
import { GET_ORDER_ACTION } from '../../context/order/OrderReducer';
import { toast } from 'react-toastify';
import axios from 'axios';
import ErrorMessage from '../../compenents/messages/ErrorMessage';
import { Helmet } from 'react-helmet-async';
import PageSpinner from '../../compenents/loader/PageSpinner';
import './Order.scss';

const Order = () => {
  const navigate = useNavigate();
  // Global state variable
  const { user, totalPrice } = useContext(UserCartContext);
  const {
    order,
    error,
    loading,
    successPay,
    loadingPay,
    successDeliver,
    dispatch,
  } = useContext(GetOrderContext);

  // useParams is used to find the "orderId" from the url
  const params = useParams();
  const { id: orderId } = params;

  // ordered id using useLocation
  const location = useLocation();
  const id = location.pathname.split('/')[2];

  // PayPal Step 5: paypal loading and "paypalDispatch" function from "usePayPalScriptReducer"
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  //============================================================
  // Function that handle when you click on the paypal button
  //============================================================
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  };

  //============================================================
  // Function that handle successful paypal payment
  //============================================================
  const onApprove = (data, actions) => {
    // "details" contain user info and payment info in the payPal side
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: GET_ORDER_ACTION.PAY_REQUEST });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          { withCredentials: true }
        );
        dispatch({ type: GET_ORDER_ACTION.PAY_SUCCESS, payload: data });
        toast.success('Order is successfully paid!');
      } catch (err) {
        dispatch({ type: GET_ORDER_ACTION.PAY_FAIL, payload: err });
        toast.error(ErrorMessage(err));
      }
    });
  };

  //============================================================
  // Function that handle error in paying the order using paypal
  //============================================================
  const onError = (err) => {
    toast.error(ErrorMessage(err));
  };

  //============================================================
  // useEffect hook to display order, paPayl on the browser
  //============================================================
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: GET_ORDER_ACTION.ORDER_FETCH_REQUEST });
        const { data } = await axios.get(
          process.env.REACT_APP_BACKEND_URL + `/api/orders/${orderId}`,
          { withCredentials: true }
        );

        dispatch({ type: GET_ORDER_ACTION.ORDER_FETCH_SUCCESS, payload: data });
      } catch (err) {
        dispatch({
          type: GET_ORDER_ACTION.ORDER_FETCH_FAIL,
          payload: ErrorMessage(err),
        });
      }
    };

    // IF there is no user
    if (!user) {
      return navigate('/login');
    }

    // If there is no "order._id" and if "order._id and order._id" is not equal to "orderId" call "fetchOrder()" function
    if (!order._id || successPay || successDeliver || order._id !== orderId) {
      // call fetch order function
      fetchOrder();

      // Reset if pay is successful
      if (successPay) {
        dispatch({ type: GET_ORDER_ACTION.PAY_RESET });
      }
    } else {
      // PayPal Step 6: Implement loadPayPalScript function
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get(
          process.env.REACT_APP_SERVER_URL + '/api/keys/paypal',
          { withCredentials: true }
        );
        // In the paypalDispatch funtion, set the type and the value of the paypal
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'EUR',
          },
        });
        //Set the "setLoadingStatus" to "pending"
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      loadPaypalScript();
    }
  }, [user, orderId, navigate, successPay]);

  // =======================================================================================
  // Customer clicks pay on success page to load stripe payment (order already in database)
  //========================================================================================
  const stripePayment = async () => {
    const pay = {
      totalPrice: totalPrice,
    };

    const settings = {
      method: 'POST',
      body: JSON.stringify(pay),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + '/api/payment',
      settings
    );
    const result = await response.json();
    try {
      if (response.ok) {
        window.location.href = result.url;
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <main className="order-display-page">
      <Helmet>
        <title> Order ID {orderId} </title>
      </Helmet>
      {loading ? (
        <PageSpinner />
      ) : error ? (
        error
      ) : (
        <section className="order-display-container">
          <h1 className="order-title"> Your Order ID - {order._id} </h1>
          {/* Order details and summary container  */}
          <div className="order-wrapper">
            <div className="ordered-meals-infos">
              {/* Detail Order Preview container  */}
              <section className="ordered-meals">
                <h3 className="subTitle"> Ordered Meals and Payment </h3>

                {/* Ordered meals name, image, quantity and price infos container */}
                {/* <div className="order-data">
                  {order.orderMeals.map((dish) => {
                    return (
                      <section key={dish._id} className="order-wrapper">
                        <figure className="image-container">
                          <NavLink to={`/meals/${dish._id}`}>
                            <img
                              className="image"
                              src={dish.image}
                              alt={dish.name}
                            />
                          </NavLink>
                        </figure>

                        <p className="paragraph">
                          <NavLink to={`/meals/${dish._id}`}>
                            {dish.name}
                          </NavLink>
                        </p>

                        <p className="paragraph"> {dish.quantity} </p>

                        <h3 className="subTitle"> ${dish.price} </h3>
                      </section>
                    );
                  })}
                </div> */}

                {/* Payment Method infos */}
                <article className="payment-method">
                  <h4 className="subTitle">Order Payment Information</h4>
                  <p className="paragraph">Method: {order.paymentMethod}</p>

                  {/* Check order payment */}
                  {order.isPaid ? (
                    <p className="paragraph">Paid at {order.paidAt}</p>
                  ) : (
                    <p className="not-yet-paid"> Not Paid </p>
                  )}

                  {/*  Check Delivery to customers */}
                  {order.isDelivered ? (
                    <p className="paragraph">
                      Delivered at {order.deliveredAt}
                    </p>
                  ) : (
                    <p className="not-yet-delivered">Not yet delivered!</p>
                  )}
                </article>
              </section>
            </div>

            {/* Order summary  */}
            <article className="order-summary">
              <h4 className="sutTitle">Order Summary</h4>
              <div className="order-summary-details">
                <article className="summary-box">
                  <p className="paragraph">Price</p>
                  <p className="paragraph">{order.mealsPrice} €</p>
                </article>

                <div className="summary-box">
                  <p className="paragraph">Tax</p>
                  <p className="paragraph">{order.taxPrice} €</p>
                </div>

                <hr className="horizontal-line" />

                <div className="summary-box total">
                  <p className="paragraph">Total</p>
                  <p className="paragraph">{order.totalPrice} €</p>
                </div>
              </div>

              {/* Paypal Step 7:	Render PayPal button */}
              {!order.isPaid && (
                <div>
                  {isPending ? (
                    <PageSpinner />
                  ) : (
                    <div>
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      />
                    </div>
                  )}
                  {loadingPay && <PageSpinner />}
                </div>
              )}

              <aside className="payment">
                <h1 className="title">Contintue to Stripe Payment</h1>
                <button onClick={stripePayment} className="stripe-btn">
                  Pay
                </button>
              </aside>
            </article>
          </div>
        </section>
      )}
    </main>
  );
};

export default Order;
