import 'isomorphic-fetch';
import queryString from 'query-string';
import cloneDeep from 'lodash/cloneDeep';
import { fetchAuthorized, resolveJsonOrRejectWithError, apiResourceUrl } from './helpers';

const fetchPrivatePath = fetchAuthorized('/learningpaths/private/:pathId');
const fetchPrivatePathStep = fetchAuthorized(
    '/learningpaths/private/:pathId/step/:stepId');
const fetchPrivatePaths = fetchAuthorized('/learningpaths/private');

const learningPathsUrl = apiResourceUrl('/learningpaths');
const fetchPaths = (query) => {
  let url = learningPathsUrl;
  if (query) {
    let q = cloneDeep(query);
    if (q.pageSize !== undefined) {
      q['page-size'] = q.pageSize;
      delete q.pageSize;
    }
    url += '?' + queryString.stringify(q);
  }
  return fetch(url).then( resolveJsonOrRejectWithError );
};

export {
  fetchPaths,
  fetchPrivatePath,
  fetchPrivatePathStep,
  fetchPrivatePaths
};
