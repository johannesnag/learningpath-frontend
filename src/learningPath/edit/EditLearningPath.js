
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import LearningPathForm from './LearningPathForm';

import {
  updateLearningPath
} from '../../actions';

const EditLearningPath = ({ learningPath, localUpdateLearningPath }, {lang}) => {
  const handleSubmit = values => localUpdateLearningPath(learningPath.id, {
    title: [{title: values.title, language: lang}],
    description: [{description: values.description, language: lang}],
    revision: learningPath.revision,
    duration: (values.duration.replace(/,/g, '.')) * 60,
    tags: values.tags
  });

  return (
    <main className="two-column_col two-column_col--center">
      <LearningPathForm learningPath={learningPath} onSubmit={handleSubmit} lang={lang} />
    </main>
  );
};

EditLearningPath.propTypes = {
  learningPath: PropTypes.object.isRequired,
  learningSteps: PropTypes.array.isRequired,
  localUpdateLearningPath: PropTypes.func.isRequired
};

EditLearningPath.contextTypes = {
  lang: PropTypes.string.isRequired
};

const mapStateToProps = state => Object.assign({}, state, {
  learningPath: get(state, 'learningPath', {}),
  learningSteps: get(state, 'learningPath.learningsteps', [])
});

const mapDispatchToProps = {
  localUpdateLearningPath: updateLearningPath
};

export default connect(mapStateToProps, mapDispatchToProps)(EditLearningPath);