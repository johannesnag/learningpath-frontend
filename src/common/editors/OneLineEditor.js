/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';
import polyglot from '../../i18n';

export default class OneLineEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = { editorState: EditorState.createEmpty() };

    const { input: { onChange }, maxlength } = props;

    this.onChange = editorState => this.setState({ editorState }, () => {
      const newValue = editorState.getCurrentContent().getPlainText();
      console.log(newValue);
      onChange(newValue);
    });

    this.handleReturn = () => {
      this.refs.editor.blur();
      return true;
    };
    this.handleReturn = this.handleReturn.bind(this);

    this.handleBeforeInput = () => false;

    if (maxlength >= 0) {
      this.handleBeforeInput = () => {
        const plainText = this.state.editorState.getCurrentContent().getPlainText();
        return plainText.length >= maxlength;
      };
    }

    /* TODO implement this when Editor.handlePastedText lands in draft-js@latest */
    this.handlePastedText = (text, html) => false; // eslint-disable-line no-unused-vars
  }

  componentWillMount() {
    this.updateEditorContentStateFromText(this.props.input.value);
  }

  updateEditorContentStateFromText(text) {
    if (text !== undefined) {
      const editorState = EditorState.createWithContent(ContentState.createFromText(text));
      this.setState({ editorState });
    }
  }

  render() {
    const { placeholder, meta, wrapperClassName, input: { onBlur } } = this.props;
    return (
      <div>
        <div className={wrapperClassName}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            onBlur={onBlur}
            handleBeforeInput={this.handleBeforeInput}
            handlePastedText={this.handlePastedText}
            handleReturn={this.handleReturn}
            placeholder={placeholder}
            ref="editor"
          />
        </div>
        {meta.touched && meta.error && <span className="error_message error_message--red">{meta.error}</span>}
      </div>
    );
  }
}

OneLineEditor.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  placeholder: PropTypes.string,
  maxlength: PropTypes.number,
  meta: PropTypes.object.isRequired,
  wrapperClassName: PropTypes.string.isRequired,
};

OneLineEditor.defaultProps = {
  placeholder: polyglot.t('editPage.oneLineEditorDefaultPlaceholder'),
  maxlength: -1,
  wrapperClassName: '',
};
