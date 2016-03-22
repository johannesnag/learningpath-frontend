import test from 'tape';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import payload403invalid from './payload403invalid';

import actions from '..';

const middleware = [ thunk ];
const mockStore = configureStore(middleware);

const authToken = '123345';

test('actions/fetchPrivateLearningPaths', (t) => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };
  
  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get('/learningpaths/private')
    .reply(200, [ {id: '123'}, {id: '456'} ]);

  const store = mockStore({ authToken });

  store.dispatch( actions.fetchPrivateLearningPaths() )
    .then(() => {
      t.deepEqual(store.getActions(), [
        actions.setPrivateLearningPaths([ {id: '123'}, {id: '456'} ])
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});

test('actions/fetchPrivateLearningPaths access denied', (t) => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };
  
  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get('/learningpaths/private')
    .reply(403, {message: 'Invalid'});

  const store = mockStore({ authToken });

  store.dispatch( actions.fetchPrivateLearningPaths() )
    .then(() => {
      t.deepEqual(store.getActions(), [
        actions.applicationError(payload403invalid())
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});
