// Action object
export const USER_ACTION = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'RESERVE_FAIL',
};

const UserReducer = (state, action) => {
  switch (action.type) {
    case USER_ACTION.LOGIN_START:
      return { ...state, loading: true, error: '' };

    case USER_ACTION.LOGIN_SUCCESS:
      return {
        ...state,
        reservation: action.payload,
        loading: false,
        error: '',
      };

    case USER_ACTION:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default UserReducer;
