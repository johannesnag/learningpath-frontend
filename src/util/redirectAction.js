import { routerActions } from 'react-router-redux';
import { applicationError } from '../messages/messagesActions';

export default function redirectAction(action, error, redirectPath) {
  return dispatch =>
    new Promise((resolve, reject) => {
      if (__SERVER__) {
        reject({ ...error, redirectPath, action });
      } else {
        dispatch(routerActions[action]({ pathname: redirectPath }));
        dispatch(applicationError(error));
        reject(error);
      }
    });
}
