import { handleActions } from 'redux-actions';
import cloneDeep from 'lodash/cloneDeep';
const initialState = {
  images: [],
  currentImage: {},
  imagesSearchTime: 0,
};
export default handleActions({
  SET_IMAGES: {
    next(state, action) {
      const nextState = cloneDeep(state);
      nextState.images = action.payload;
      return nextState;
    },
    throw(state) { return state; }
  },
  SET_IMAGE: {
    next(state, action) {
      const nextState = cloneDeep(state);
      nextState.currentImage = action.payload;
      return nextState;
    },
    throw(state) { return state; }
  }
}, initialState);
