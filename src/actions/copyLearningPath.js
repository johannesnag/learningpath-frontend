import { setLearningPath, applicationError, addMessage } from '.';
import { copyPath } from '../sources/learningpaths';
import { routerActions } from 'react-router-redux';
import polyglot from '../i18n';
import { titleI18N } from '../util/i18nFieldFinder';

export default function copyLearningPath(learningPath, locale) {
  const copiedTitle = polyglot.t('copyLearningPath.copy').concat(titleI18N(learningPath, locale).toString());
  const clonedLearningPathTitle = {
    title: [
      {title: copiedTitle, language: locale}
    ]
  };

  return (dispatch, getState) => new Promise((resolve, reject) => copyPath(getState().authToken, {copyfrom: learningPath.id}, clonedLearningPathTitle)
    .then(lpath => {
      dispatch(addMessage({message: polyglot.t('copyLearningPath.copiedMessage')}));
      dispatch(setLearningPath(lpath));
      dispatch(routerActions.push({
        pathname: `/learningpaths/${lpath.id}`
      }));
      resolve();
    })
    .catch(err => {
      dispatch(applicationError(err));
      reject();
    }
  ));
}