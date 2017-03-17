/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import test from 'tape';
import { isFSA } from 'flux-standard-action';
import { setAccessToken } from '../sessionActions';


test('actions/setAccessToken', (t) => {
  const actual = setAccessToken('12345');

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_AUTH_TOKEN');
  t.equal(actual.payload, '12345');
  t.notOk(actual.error);

  t.end();
});

test('actions/setAccessToken with error', (t) => {
  const actual = setAccessToken(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_AUTH_TOKEN');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});
