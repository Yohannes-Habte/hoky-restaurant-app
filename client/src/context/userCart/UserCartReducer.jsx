// Action object
export const USER_CART_ACTION = {
  // Creating user account
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAIL: 'REGISTER_FAIL',

  // Login user
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',

  // Update user data
  UPDATE_REQUEST: 'UPDATE_REQUEST',
  UPDATE_SUCCESS: 'UPDATE_SUCCESS',
  UPDATE_FAIL: 'UPDATE_FAIL',

  // User log in status
  IS_USER_LOGGED_IN: 'IS_USER_LOGGED_IN',

  // User logout
  LOG_OUT_REQUEST: 'LOG_OUT_REQUEST',
  LOG_OUT_SUCCESS: 'LOG_OUT_SUCCESS',
  LOG_OUT_FAIL: 'LOG_OUT_FAIL',

  // Cart
  ADD_MEAL_TO_CART: 'ADD_MEAL_TO_CART',
  REMOVE_MEAL_FROM_CART: 'REMOVE_MEAl_FROM_CART',
  SHIPPING_ADDRESS: 'SHIPPING_ADDRESS',
  PAYMENT_METHOD: 'PAYMENT_METHOD',
  CLEAR_CART: 'CLEAR_CART',

  // Placing an order
  PLACE_ORDER_REQUEST: 'PLACE_ORDER_REQUEST',
  PLACE_ORDER_SUCCESS: 'PLACE_ORDER_SUCCESS',
  PLACE_ORDER_FAIL: 'PLACE_ORDER_FAIL',
};

// Reducer Function
const UserCartReducer = (state, action) => {
  switch (action.type) {
    // User status
    // User Create an account
    case USER_CART_ACTION.REGISTER_REQUEST:
      return { ...state, loading: true, error: '' };

    case USER_CART_ACTION.REGISTER_SUCCESS:
      return { ...state, user: action.payload, loading: false, error: '' };

    case USER_CART_ACTION.REGISTER_FAIL:
      return { ...state, error: action.payload, loading: false };

    // Login user
    case USER_CART_ACTION.LOGIN_REQUEST:
      return { ...state, loading: true, error: '' };

    case USER_CART_ACTION.LOGIN_SUCCESS:
      return { ...state, user: action.payload, loading: false, error: '' };

    case USER_CART_ACTION.LOGIN_FAIL:
      return { ...state, error: action.payload, loading: false };

    // Update user data
    case USER_CART_ACTION.UPDATE_REQUEST:
      return { ...state, loading: true, error: '' };

    case USER_CART_ACTION.UPDATE_SUCCESS:
      return { ...state, user: action.payload, loading: false, error: '' };

    case USER_CART_ACTION.UPDATE_FAIL:
      return { ...state, error: action.payload, loading: false };

    // Is User Login In
    case USER_CART_ACTION.IS_USER_LOGGED_IN:
      return { ...state, isLoggedIn: action.payload };

    // User logout
    case USER_CART_ACTION.USER_LOG_OUT:
      return {
        ...state,
        user: null,
        cart: { orderMeals: [], shippingAddress: {}, paymentMethod: '' },
      };

    // Cart Status
    // Add Meal to Cart requires three steps
    case USER_CART_ACTION.ADD_MEAL_TO_CART:
      // Setp 1: Create newMeal variable that has to be added to the cart
      const newMeal = action.payload;

      // Setp 2: Find existing meal (existingMeal) in the orderMeals and compare with the new meal (newMeal).
      const existingMeal = state.cart.orderMeals.find(
        (meal) => meal._id === newMeal._id
      );

      /*
        Setp 3:
          - If the (existingMeal) is the same as (newMeal), update the (newMeal) using map function.
          - If the meal does not exist in the orderMeals, then just  add the newMeal to the cart [...state.cart.orderMeals, newMeal]; 
       */
      const orderMeals = existingMeal
        ? state.cart.orderMeals.map((meal) =>
            meal._id === existingMeal._id ? newMeal : meal
          )
        : [...state.cart.orderMeals, newMeal];

      localStorage.setItem('orderMeals', JSON.stringify(orderMeals));

      return { ...state, cart: { ...state.cart, orderMeals } };

    // Remove Meal from Cart
    case USER_CART_ACTION.REMOVE_MEAL_FROM_CART: {
      // Filter the meal from the orderMeals
      const orderMeals = state.cart.orderMeals.filter(
        (meal) => meal._id !== action.payload._id
      );

      localStorage.setItem('orderMeals', JSON.stringify(orderMeals));
      return { ...state, cart: { ...state.cart, orderMeals } };
    }

    // Payment Method
    case USER_CART_ACTION.PAYMENT_METHOD:
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };

    // Placing an order
    case USER_CART_ACTION.PLACE_ORDER_REQUEST:
      return { ...state.cart, loading: true, error: '' };
    case USER_CART_ACTION.PLACE_ORDER_SUCCESS:
      return { ...state.cart, loading: false, error: '' };
    case USER_CART_ACTION.PLACE_ORDER_FAIL:
      return { ...state.cart, loading: false, error: '' };

    // After you place an order, make the cart meals (orderMeals) empty
    case USER_CART_ACTION.CLEAR_CART:
      return { ...state, cart: { ...state.cart, orderMealss: [] } };

    default:
      return state;
  }
};

export default UserCartReducer;
