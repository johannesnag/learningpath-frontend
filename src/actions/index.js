import { createAction } from 'redux-actions';

import initializeSession from './initializeSession';
import logout from './logout';
import fetchLearningPaths from './fetchLearningPaths';
import fetchPrivateLearningPath from './fetchPrivateLearningPath';
import fetchPrivateLearningPathStep from './fetchPrivateLearningPathStep';
import fetchPrivateLearningPaths from './fetchPrivateLearningPaths';

export var applicationError = createAction('APPLICATION_ERROR');
export var setAuthenticated = createAction('SET_AUTHENTICATED');
export var setAuthToken = createAction('SET_AUTH_TOKEN');
export var setLearningPaths = createAction('SET_LEARNING_PATHS');
export var changeLearningPathQuery = createAction('CHANGE_LEARNING_PATH_QUERY');
export var setPrivateLearningPath = createAction('SET_PRIVATE_LEARNING_PATH');
export var setPrivateLearningPathStep = createAction('SET_PRIVATE_LEARNING_PATH_STEP');
export var setPrivateLearningPaths = createAction('SET_PRIVATE_LEARNING_PATHS');
export var sortPrivateLearningPaths = createAction('SORT_PRIVATE_LEARNING_PATHS');
export var setUserData = createAction('SET_USER_DATA');

export {
  initializeSession,
  logout,
  fetchLearningPaths,
  fetchPrivateLearningPath,
  fetchPrivateLearningPathStep,
  fetchPrivateLearningPaths
};

export default {
  applicationError,
  setAuthenticated,
  setAuthToken,
  setLearningPaths,
  changeLearningPathQuery,
  setPrivateLearningPath,
  setPrivateLearningPathStep,
  setPrivateLearningPaths,
  sortPrivateLearningPaths,
  setUserData,
  initializeSession,
  logout,
  fetchLearningPaths,
  fetchPrivateLearningPath,
  fetchPrivateLearningPathStep,
  fetchPrivateLearningPaths
};
