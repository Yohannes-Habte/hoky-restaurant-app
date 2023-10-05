// ACTIONS
export const BACKGROUND_ACTION = {
  DARK: 'DARK',
  GRAY: 'GRAY',
  GHOST: 'GHOST',
  TOGGLE: 'TOGGLE',
};

const BgReducer = (state, action) => {
  switch (action.type) {
    case BACKGROUND_ACTION.DARK:
      return { dark: true, gray: false, ghost: false };

    case BACKGROUND_ACTION.GRAY:
      return { dark: false, gray: true, ghost: false };

    case BACKGROUND_ACTION.GHOST:
      return { dark: false, gray: false, ghost: true };

    default:
      return state;
  }
};

export default BgReducer;
