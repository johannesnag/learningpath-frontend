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

import { checkValidSession } from '../sessionActions';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const authToken = '123345';

test('actions/checkValidSession', (t) => {
  const done = (res) => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get('/auth/me')
    .reply(200, { first_name: 'alice', email: 'alice@example.com' });

  const store = mockStore({ authToken });

  store.dispatch(checkValidSession())
    .then(() => {
      t.deepEqual(store.getActions(), []);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});

test('actions/checkValidSession invalid authToken', (t) => {
  const done = (res) => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get('/auth/me')
    .reply(403, { message: 'Invalid' });

  const store = mockStore({ authToken });

  store.dispatch(checkValidSession())
    .then(() => {
      t.deepEqual(store.getActions(), [
        { type: 'LOGOUT' },
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});