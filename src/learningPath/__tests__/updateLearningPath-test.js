/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import test from 'tape';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { routerActions } from 'react-router-redux';
import payload403invalid from '../../actions/__tests__/payload403invalid';

import { applicationError, addMessage } from '../../messages/messagesActions';
import { updateLearningPath, setLearningPath } from '../learningPathActions';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const accessToken = '123345';
const pathId = 123;

test('actions/updateLearningPath', (t) => {
  const done = (res) => {
    t.end(res);
    nock.cleanAll();
  };

  const patchPathApi = nock('http://ndla-api', { reqheaders: { 'app-key': accessToken } })
    .patch(`/learningpaths/${pathId}`, {
      id: pathId, isRequest: true,
    })
    .reply(200, { id: pathId, isResponse: true });

  const store = mockStore({ accessToken });

  store.dispatch(updateLearningPath(pathId, {
    id: pathId, isRequest: true,
  }))
    .then(() => {
      t.deepEqual(store.getActions(), [
        addMessage({ message: 'Lagret OK' }),
        setLearningPath({
          id: pathId,
          isResponse: true,
        }),
        routerActions.push({ pathname: `/learningpaths/${pathId}` }),
      ]);

      t.doesNotThrow(() => patchPathApi.done());

      done();
    })
    .catch(done);
});

test('actions/updateLearningPath with redirect', (t) => {
  const done = (res) => {
    t.end(res);
    nock.cleanAll();
  };

  const patchPathApi = nock('http://ndla-api', { reqheaders: { 'app-key': accessToken } })
    .patch(`/learningpaths/${pathId}`, { id: pathId })
    .reply(200, { id: pathId });

  const store = mockStore({ accessToken });

  store.dispatch(updateLearningPath(pathId, { id: pathId }, '/goto/dev/null'))
    .then(() => {
      const actual = store.getActions();

      t.equal(actual.length, 3, 'three actions');
      t.deepEqual(actual[2], routerActions.push({ pathname: '/goto/dev/null' }));

      t.doesNotThrow(() => patchPathApi.done());

      done();
    })
    .catch(done);
});

test('actions/updateLearningPath access denied', (t) => {
  const done = (res) => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': accessToken } })
    .patch(`/learningpaths/${pathId}`, {
      id: pathId,
      foo: 'bar',
    })
    .reply(403, { message: 'Invalid' });

  const store = mockStore({ accessToken });

  store.dispatch(updateLearningPath(pathId, { id: pathId, foo: 'bar' }))
    .then(() => {
      t.deepEqual(store.getActions(), [
        applicationError(payload403invalid(`http://ndla-api/learningpaths/${pathId}`)),
      ]);
      t.doesNotThrow(() => apiMock.done());

      done();
    })
    .catch(done);
});
