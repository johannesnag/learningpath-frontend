import test from 'tape';
import reducer from '../messages';

test('reducers/messages add message', t => {
  let nextState = reducer([], {
    type: 'ADD_MESSAGE',
    payload: {
      message: 'This is a dangerous error',
      severity: 'danger'
    }
  });

  t.equal(nextState.length, 1);
  t.equal(nextState[0].severity, 'danger');
  t.equal(nextState[0].message, 'This is a dangerous error');

  nextState = reducer(nextState, {
    type: 'ADD_MESSAGE',
    payload: {
      message: 'Another somewhat less dangerous error',
      severity: 'warning'
    }
  });

  t.equal(nextState.length, 2);
  t.equal(nextState[1].severity, 'warning');
  t.equal(nextState[1].message, 'Another somewhat less dangerous error');

  for (let i = 0; i < 8; ++i) {
    nextState = reducer(nextState, {
      type: 'ADD_MESSAGE',
      payload: {
        message: 'A message',
        severity: 'success'
      }
    });
  }

  t.equal(nextState.length, 10);
  t.equal(nextState[9].message, 'A message');
  t.equal(nextState[9].severity, 'success');

  t.end();
});

test('reducers/messages clear messages', t => {
  let nextState = reducer([], {
    type: 'CLEAR_MESSAGES'
  });
  t.equal(nextState.length, 0);

  for (let i = 0; i < 10; ++i) {
    nextState = reducer(nextState, {
      type: 'ADD_MESSAGE',
      payload: {
        message: 'A message',
        severity: 'success'
      }
    });
  }
  t.equal(nextState.length, 10);

  nextState = reducer([], {
    type: 'CLEAR_MESSAGES'
  });
  t.equal(nextState.length, 0);

  t.end();
});

test('reducers/messages application error', t => {
  let nextState = reducer([], {
    type: 'APPLICATION_ERROR',
    error: true,
    payload: {
      json: {
        messages: [{field: 'Generic error', message: 'Another somewhat less dangerous error'}]
      }
    }
  });

  t.equal(nextState.length, 1);
  t.equal(nextState[0].severity, 'danger');
  t.equal(nextState[0].message, 'Generic error: Another somewhat less dangerous error');

  t.end();
});