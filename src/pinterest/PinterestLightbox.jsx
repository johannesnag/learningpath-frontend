/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component, PropTypes } from 'react';

import PinterestImport from './PinterestImport';
import Lightbox from '../common/Lightbox';
import polyglot from '../i18n';
import Button from '../common/buttons/Button';

class PinterestLightbox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayLightbox: false,
    };
    this.openLightbox = this.openLightbox.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
  }

  openLightbox() {
    this.setState({ displayLightbox: true });
  }

  closeLightbox() {
    this.setState({ displayLightbox: false });
  }

  render() {
    const { learningPath } = this.props;
    return (
      <div>
        <br />
        <Button className="button button--primary-outline cta-link--block" onClick={this.openLightbox}>
          {polyglot.t('pinterest.importFrom')}
        </Button>
        <Lightbox display={this.state.displayLightbox} width="800px" onClose={this.closeLightbox}>
          <PinterestImport learningPath={learningPath} />
        </Lightbox>
      </div>
    );
  }
}

PinterestLightbox.propTypes = {
  learningPath: PropTypes.object.isRequired,
};

export default PinterestLightbox;
