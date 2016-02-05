import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import defined from 'defined';
import { titleI18N } from '../util/i18nFieldFinder';

export default function LearningPathToc ({learningPath, isPrivate, lang}) {
  const base = `/learningpaths${isPrivate ? '/private' : ''}/${learningPath.id}`;

  return (
    <ul>
      <li>
        <Link to={base}>Introduksjon</Link>
      </li>
      {((steps) => steps.map(step => (
        <li key={step.id}>
          <Link to={`${base}/step/${step.id}`}>
            {titleI18N(step, lang)}
          </Link>
        </li>
      )))(defined(learningPath.learningsteps, []))}
    </ul>
  );
}

LearningPathToc.propTypes = {
  learningPath: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
  isPrivate: PropTypes.bool
};

LearningPathToc.defaultProps = {
  isPrivate: false
};
