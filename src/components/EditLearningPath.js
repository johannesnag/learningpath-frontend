
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import LearningPathForm from './LearningPathForm';

import {
  updateLearningPath
} from '../actions';

export function EditLearningPath(props, {lang}) {
  let {
    learningPath,
    saveAction
  } = props;
  let onSaveLearningPathSubmit = values => saveAction(learningPath.id, {
    title: [{title: values.title, language: lang}],
    description: [{description: values.description, language: lang}],
    revision: learningPath.revision,
    duration: (values.duration.replace(/,/g, '.')) * 60
  });

  return (
    <div>
      <LearningPathForm learningPath={learningPath} onSubmit={onSaveLearningPathSubmit} lang={lang} />
    </div>
  );
}

EditLearningPath.propTypes = {
  learningPath: PropTypes.object.isRequired,
  learningSteps: PropTypes.array.isRequired,
  saveAction: PropTypes.func.isRequired
};

EditLearningPath.contextTypes = {
  lang: PropTypes.string.isRequired
};

const mapStateToProps = state => Object.assign({}, state, {
  learningPath: get(state, 'learningPath', {}),
  learningSteps: get(state, 'learningPath.learningsteps', [])
});

const mapDispatchToProps = {
  saveAction: updateLearningPath
};

export default connect(mapStateToProps, mapDispatchToProps)(EditLearningPath);
