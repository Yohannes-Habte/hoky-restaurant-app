export const PRODUCT_ACTION = {
  // Meal action
  MEAL_POSTING: 'MEAL_POSTING',
  MEAL_POSTED: 'MEAL_POSTED',
  MEAL_POST_FAIL: 'MEAL_POST_FAIL',

  // Drink post action
  DRINK_POSTING: 'DRINK_POSTING',
  DRINK_POSTED: 'DRINK_POSTED',
  DRINK_POST_FAIL: 'DRINK_POST_FAIL',

  // Drink post action
  DRINK_DELETING: 'DRINK_DELETING',
  DRINK_DELETED: 'DRINK_DELETED',
  DRINK_DELETE_FAIL: 'DRINK_DELETE_FAIL',

  // Reservation action
  RESERVATION_FETCHING_REQUEST: ' RESERVATION_FETCHING_REQUEST',
  RESERVATION_FETCHING_SUCCESS: ' RESERVATION_FETCHING_SUCCESS',
  RESERVATION_FETCHING_FAIL: ' RESERVATION_FETCHING_FAIL',

  // Order action
  ORDER_FETCHING_REQUEST: ' ORDER_FETCHING_REQUEST',
  ORDER_FETCHING_SUCCESS: ' ORDER_FETCHING_SUCCESS',
  ORDER_FETCHING_FAIL: ' ORDER_FETCHING_FAIL',

  // Comment action
  COMMENT_FETCHING_REQUEST: ' COMMENT_FETCHING_REQUEST',
  COMMENT_FETCHING_SUCCESS: ' COMMENT_FETCHING_SUCCESS',
  COMMENT_FETCHING_FAIL: ' COMMENT_FETCHING_FAIL',
};

// Reducer function
const ProductsReducer = (state, action) => {
  switch (action.type) {
    // Meal  and deleting
    case PRODUCT_ACTION.MEAL_POSTING:
      return { ...state, loading: true, error: '' };

    case PRODUCT_ACTION.MEAL_POSTED:
      return {
        ...state,
        meal: action.payload,
        loading: false,
        error: '',
      };

    case PRODUCT_ACTION.MEAL_POST_FAIL:
      return { ...state, error: action.payload, loading: false };

    // Drink posting and deleting
    // Drink posting
    case PRODUCT_ACTION.DRINK_POSTING:
      return { ...state, loading: true, error: '' };

    case PRODUCT_ACTION.DRINK_POSTED:
      return {
        ...state,
        drink: action.payload,
        loading: false,
        error: '',
      };

    case PRODUCT_ACTION.DRINK_POST_FAIL:
      return { ...state, error: action.payload, loading: false };
    // Drink Deleting
    case PRODUCT_ACTION.DRINK_DELETING:
      return { ...state, loading: true, error: '' };

    case PRODUCT_ACTION.DRINK_DELETED: {
      // Filter the product from the cartItems
      const drink = state.drink.filter(
        (item) => item._id !== action.payload._id
      );
      return {
        ...state,
        drink: drink,
        loading: false,
        error: '',
      };
    }

    case PRODUCT_ACTION.DRINK_DELETE_FAIL:
      return { ...state, error: action.payload, loading: false };

    // Reservation  and deleting
    case PRODUCT_ACTION.RESERVATION_FETCHING_REQUEST:
      return { ...state, loading: true, error: '' };

    case PRODUCT_ACTION.RESERVATION_FETCHING_SUCCESS:
      return {
        ...state,
        reservation: action.payload,
        loading: false,
        error: '',
      };

    case PRODUCT_ACTION.RESERVATION_FETCHING_FAIL:
      return { ...state, error: action.payload, loading: false };

    // Order  and deleting
    case PRODUCT_ACTION.ORDER_FETCHING_REQUEST:
      return { ...state, loading: true, error: '' };

    case PRODUCT_ACTION.ORDER_FETCHING_SUCCESS:
      return {
        ...state,
        order: action.payload,
        loading: false,
        error: '',
      };

    case PRODUCT_ACTION.ORDER_FETCHING_FAIL:
      return { ...state, error: action.payload, loading: false };

    // Reservation
    case PRODUCT_ACTION.COMMENT_FETCHING_REQUEST:
      return { ...state, loading: true, error: '' };

    case PRODUCT_ACTION.COMMENT_FETCHING_SUCCESS:
      return {
        ...state,
        comment: action.payload,
        loading: false,
        error: '',
      };

    case PRODUCT_ACTION.COMMENT_FETCHING_FAIL:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default ProductsReducer;
