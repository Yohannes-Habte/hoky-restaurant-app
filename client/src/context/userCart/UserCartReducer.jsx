// Action object
export const USER_CART_ACTION = {
  // User
  USER_REGISTER: 'USER_REGISTER',
  USER_SIGNIN: 'USER_SIGNIN',
  UPDATE_USER_DATA: 'UPDATE_USER_DATA',
  IS_USER_LOGGED_IN: 'IS_USER_LOGGED_IN',
  USER_LOG_OUT: 'USER_LOG_OUT',
  // Cart
  ADD_MEAL_TO_CART: 'ADD_ITEM_TO_CART',
  REMOVE_MEAL_FROM_CART: 'REMOVE_ITEM_FROM_CART',
  SHIPPING_ADDRESS: 'SHIPPING_ADDRESS',
  PAYMENT_METHOD: 'PAYMENT_METHOD',
  CLEAR_CART: 'CLEAR_CART',
};

// Reducer Function
const UserCartReducer = (state, action) => {
  switch (action.type) {
    // User status
    // User Create an account
    case USER_CART_ACTION.USER_REGISTER:
      return { ...state, user: action.payload };

    // User Login
    case USER_CART_ACTION.USER_SIGNIN:
      return { ...state, user: action.payload };

    // User Login
    case USER_CART_ACTION.UPDATE_USER_DATA:
      return { ...state, user: action.payload };

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
    // Add Meal/s to Cart requires three steps
    case USER_CART_ACTION.ADD_MEAL_TO_CART:
      // Setp 1: Create newMeal variable that has to be added to the cart
      const newMeal = action.payload;
      // Setp 2: Find existing meal (existingMeal) in the cartMeals and compare with the new meal (newMeal).
      const existingMeal = state.cart.orderMeals.find(
        (meal) => meal._id === newMeal._id
      );

      /*
        Setp 3:
          - If the (existingMeal) is the same as (newMeal), update the (newMeal) using map function.
          - If the meal does not exist in the cartMeals, then just  add the newMeal to the cart [...state.cart.cartMeals, newMeal]; 
       */
      const cartMeals = existingMeal
        ? state.cart.orderMeals.map((meal) =>
            meal._id === existingMeal._id ? newMeal : meal
          )
        : [...state.cart.orderMeals, newMeal];

      localStorage.setItem('cartMeals', JSON.stringify(cartMeals));

      return { ...state, cart: { ...state.cart, cartMeals } };

    // Remove Meal from Cart
    case USER_CART_ACTION.REMOVE_MEAL_FROM_CART: {
      // Filter the meal from the cartMeals
      const cartMeals = state.cart.cartMeals.filter(
        (meal) => meal._id !== action.payload._id
      );

      localStorage.setItem('cartMeals', JSON.stringify(cartMeals));
      return { ...state, cart: { ...state.cart, cartMeals } };
    }

    // Shipping Address
    case USER_CART_ACTION.SHIPPING_ADDRESS:
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };

    // Payment Method
    case USER_CART_ACTION.PAYMENT_METHOD:
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };

    default:
      return state;
  }
};

export default UserCartReducer;
