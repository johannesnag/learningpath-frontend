/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createSelector } from 'reselect';

const getTotalResultsFromState = (state) => {
  const result = state.embedSearch.result;
  return result.queries.request ? result.queries.request[0].totalResults : undefined;
};

export const getNumberOfPages = createSelector(
  [getTotalResultsFromState],
  totalResults => (totalResults ? totalResults / 10 : 1)
);

export const getEmbedResultFromState = state => state.embedSearch.result;

export const getEmbedQueryFromState = state => state.embedSearch.query;

export const getOembedContentFromState = state => state.embedSearch.oembedContent;