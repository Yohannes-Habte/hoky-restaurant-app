import React, { useContext, useEffect } from 'react';
import { UserCartContext } from '../../context/userCart/UserCartProvider';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { GetOrderContext } from '../../context/order/OrderProvider';
import { usePayPalScriptReducer, PayPalButtons } from '@paypal/react-paypal-js';
import { GET_ORDER_ACTION } from '../../context/order/OrderReducer';
import { toast } from 'react-toastify';
import axios from 'axios';
import ErrorMessage from '../../compenents/messages/ErrorMessage';
import { Helmet } from 'react-helmet-async';
import PageSpinner from '../../compenents/loader/PageSpinner';
import "./Order.scss"

const Order = () => {
  const navigate = useNavigate();
  // Global state variable
  const { user } = useContext(UserCartContext);
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

  // Using useEffect display in the browser
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: GET_ORDER_ACTION.FETCH_REQUEST });
        const { data } = await axios.get(
          process.env.REACT_APP_BACKEND_URL + `/api/orders/${orderId}`,
          { withCredentials: true }
        );

        dispatch({ type: GET_ORDER_ACTION.FETCH_SUCCESS, payload: data });
      } catch (err) {
        dispatch({
          type: GET_ORDER_ACTION.FETCH_FAIL,
          payload: ErrorMessage(err),
        });
      }
    };

    // If there is no user, navigate to login page
    if (!user) {
      return navigate('/login');
    }

    // If there is no "order._id" and if "order._id and order._id" is not equal to "orderId" call "fetchOrder()" function
    if (
      !order._id ||
      successPay ||
      successDeliver ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();

      // Reset
      if (successPay) {
        dispatch({ type: GET_ORDER_ACTION.PAY_RESET });
      }
    } else {
      // PayPal Step 6: Implement loadPayPalScript function
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get(
          process.env.REACT_APP_BACKEND_URL + '/api/keys/paypal',
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
  }, [order, user, orderId, navigate, paypalDispatch, successPay]);

  return (
    <main className="order-display-page">
      <Helmet>
        <title> Order ID {orderId} </title>
      </Helmet>

      <section className="order-display-container">
        <h1 className="order-title"> Your Order ID - {order._id} </h1>

        <div className="order-details">
          <div className="ordered-meals-payment">
            {/* Ordered meals */}
            <article className="ordered-items">
              <h4 className="subTitle"> Ordered Items </h4>
              <div className="items-info">
                {/* {order.orderMeals.map((item) => {
                  return (
                    <div key={item._id} className="item-container">
                      <div className="image-name">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="image"
                        />
                      </div>

                      <div className="name">
                        <NavLink to={`/meals/${item._id}`}>{item.name}</NavLink>
                      </div>

                      <div> {item.quantity} </div>

                      <div className="item-price"> ${item.price} </div>
                    </div>
                  );
                })} */}
              </div>
            </article>

            {/* Payment methods and status of payment */}
            <article className="payment-method">
              <h4>Payment</h4>
              <p>
                <strong>Method:</strong> {order.paymentMethod}
              </p>
              {/* //! Check order payment */}
              {order.isPaid ? (
                <div>Paid at {order.paidAt}</div>
              ) : (
                <div variant="danger"> Not Paid </div>
              )}
            </article>
          </div>

          {/* Order summary  */}
          <article className="order-summary">
            <h4 className="sutTitle">Order Summary</h4>
            <div className="order-summary-details">
              <article className="summary-box">
                <p className="paragraph">Price</p>
                {/* <p className="paragraph">{order.mealsPrice.toFixed(2)} €</p> */}
              </article>

              <div className="summary-box">
                <p className="paragraph">Tax</p>
                {/* <p className="paragraph">{order.taxPrice.toFixed(2)} €</p> */}
              </div>

              <hr className="horizontal-line" />

              <div className="summary-box total">
                <p className="paragraph">Total</p>
                {/* <p className="paragraph">{order.totalPrice.toFixed(2)} €</p> */}
              </div>
            </div>
            {/* // Paypal Step 7:	Render PayPal button */}
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
                    ></PayPalButtons>
                  </div>
                )}
                {loadingPay && <PageSpinner />}
              </div>
            )}
          </article>
        </div>
      </section>
    </main>
  );
};

export default Order;
