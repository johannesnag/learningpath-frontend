/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import 'isomorphic-fetch';
import queryString from 'query-string';
import config from '../config';
import { resolveJsonOrRejectWithError } from './helpers';

if (process.env.NODE_ENV === 'unittest') {
  window.config = config;
}

const GOOGLE_API_URL = __SERVER__
  ? config.googleApiUrl
  : window.config.googleApiUrl;
const GOOGLE_API_KEY = __SERVER__
  ? config.googleApiKey
  : window.config.googleApiKey;
const GOOGLE_SEARCH_ENGINE_ID = __SERVER__
  ? config.googleSearchEngineId
  : window.config.googleSearchEngineId;

const apiEmbedUrl = (() => {
  if (process.env.NODE_ENV === 'unittest') {
    return 'http://google-api';
  }
  return GOOGLE_API_URL;
})();

const apiEmbedKey = (() => {
  if (process.env.NODE_ENV === 'unittest') {
    return 'googlekey';
  }
  return GOOGLE_API_KEY;
})();

const apiEmbedEngingeId = (() => {
  if (process.env.NODE_ENV === 'unittest') {
    return 'googleEngingeId';
  }
  return GOOGLE_SEARCH_ENGINE_ID;
})();

const apiEmbedResourceUrl = path => apiEmbedUrl + path;

const fetchGoogleContent = query => {
  let url = apiEmbedResourceUrl('/customsearch/v1/');
  const params = {
    key: apiEmbedKey,
    cx: apiEmbedEngingeId,
    q: `${query.textQuery} ${query.filter.key}`,
    start: query.start ? query.start : undefined,
  };
  url += `?${queryString.stringify(params)}`;
  return fetch(url).then(resolveJsonOrRejectWithError);
};

export { fetchGoogleContent };
