import { handleActions } from 'redux-actions';

export default handleActions({
  SET_PRIVATE_LEARNING_PATH: {
    next(state, action) { return action.payload; },
    throw(state) { return state; }
  },
  LOGOUT: () => ({})
}, {});