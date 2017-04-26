/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import polyglot from '../../i18n';

const LearningPathActionType = ({ authenticated, learningPath, onCopyLearningPathClick, localCloseSidebars, hasChangeStatusButton }) => {
  const buttonClassName = classNames({
    'cta-link cta-link--primary-outline cta-link--block': true,
    'learningpath-action-type_button': hasChangeStatusButton,
  });
  if (learningPath.canEdit) {
    return <Link className={buttonClassName} to={`/learningpaths/${learningPath.id}/edit`} onClick={() => localCloseSidebars}>{polyglot.t('editPage.edit')}</Link>;
  } else if (authenticated) {
    return <button className="cta-link cta-link--primary-outline cta-link--block copy-learningpath_button" onClick={onCopyLearningPathClick}>{polyglot.t('copyLearningPath.createCopy')}</button>;
  }
  return null;
};

LearningPathActionType.propTypes = {
  learningPath: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  onCopyLearningPathClick: PropTypes.func.isRequired,
  localCloseSidebars: PropTypes.func.isRequired,
  hasChangeStatusButton: PropTypes.bool.isRequired,
};

export default LearningPathActionType;
