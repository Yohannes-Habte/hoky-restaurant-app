// Action object
export const RESERVATION_ACTION = {
  RESERVE_START: 'RESERVE_START',
  RESERVE_SUCCESS: 'RESERVE_SUCCESS',
  RESERVE_FAIL: 'RESERVE_FAIL',
};

const ReservationReducer = (state, action) => {
  switch (action.type) {
    case RESERVATION_ACTION.RESERVE_START:
      return { ...state, loading: true, error: '' };

    case RESERVATION_ACTION.RESERVE_SUCCESS:
      return {
        ...state,
        error: '',
        loading: false,
        reservation: action.payload,
      };

    case RESERVATION_ACTION.RESERVE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default ReservationReducer;
