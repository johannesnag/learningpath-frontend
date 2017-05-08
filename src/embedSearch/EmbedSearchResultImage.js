/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

const EmbedSearchResultImage = ({ pagemap }) => {
  const imageSource = () => {
    if (pagemap && pagemap.cse_image && pagemap.cse_image.length > 0) {
      return pagemap.cse_image[0].src;
    }
    return `/assets/${window.assets['placeholder.png']}`;
  };

  return (
    <div className="embed-search_result-img">
      <img role="presentation" src={imageSource()} />
    </div>
  );
};

EmbedSearchResultImage.propTypes = {
  pagemap: PropTypes.object.isRequired,
};

export default EmbedSearchResultImage;
