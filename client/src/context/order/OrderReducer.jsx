// Order Object
export const GET_ORDER_ACTION = {
  // Order
  FETCH_REQUEST: 'FETCH_REQUEST',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAIL: 'FETCH_FAIL',
  // Payment
  PAY_REQUEST: 'PAY_REQUEST',
  PAY_SUCCESS: 'PAY_SUCCESS',
  PAY_FAIL: 'PAY_FAIL',
  PAY_RESET: 'PAY_RESET',
  // Delivery
  DELIVER_REQUEST: 'DELIVER_REQUEST',
  DELIVER_SUCCESS: 'DELIVER_SUCCESS',
  DELIVER_FAIL: 'DELIVER_FAIL',
  DELIVER_RESET: 'DELIVER_RESET',
};

const OrderReducer = (state, action) => {
  switch (action.type) {
    // Get Order
    case GET_ORDER_ACTION.FETCH_REQUEST:
      return { ...state, loading: true, error: '' };
    case GET_ORDER_ACTION.FETCH_SUCCESS:
      return { ...state, order: action.payload, loading: false, error: '' };
    case GET_ORDER_ACTION.FETCH_FAIL:
      return { ...state, error: action.payload, loading: false };

    // Payment
    case GET_ORDER_ACTION.PAY_REQUEST:
      return { ...state, loadingPay: true };
    case GET_ORDER_ACTION.PAY_SUCCESS:
      return { ...state, loadingPay: false, successPay: true };
    case GET_ORDER_ACTION.PAY_FAIL:
      return { ...state, loadingPay: false };
    case GET_ORDER_ACTION.PAY_RESET:
      return { ...state, loadingPay: false, successPay: false };

    // Delivery
    case GET_ORDER_ACTION.DELIVER_REQUEST:
      return { ...state, loadingDeliver: true };
    case GET_ORDER_ACTION.DELIVER_SUCCESS:
      return { ...state, loadingDeliver: false, successDeliver: true };
    case GET_ORDER_ACTION.DELIVER_FAIL:
      return { ...state, loadingDeliver: false };
    case GET_ORDER_ACTION.DELIVER_RESET:
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };
    default:
      return state;
  }
};

export default OrderReducer;
