import React, { PropTypes } from 'react';
import polyglot from '../../i18n';
import Icon from '../../components/Icon';

class ImageSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showTotalCount: false};
  }
  render() {
    const { onSubmit, query, localChangeImageSearchQuery, totalCount } = this.props;
    const textQuery = query.query;
    const onQueryChange = (evt) => {
      let newQuery = {};
      if (textQuery === evt.target.value) {
        newQuery = {query: evt.target.value, 'page-size': 16, page: query.page};
      } else {
        newQuery = {query: evt.target.value, 'page-size': 16, page: 1};
      }
      this.setState({showTotalCount: false});
      localChangeImageSearchQuery(newQuery);
    };
    const onImageSearchClick = (evt) => {
      onSubmit(evt, query);
      this.setState({showTotalCount: true});
    };
    const onKeyPress = (evt) => {
      if (evt.key === 'Enter') {
        this.setState({showTotalCount: true});
      }
    };

    return (
      <div className="image-search">
        <h2>{polyglot.t('learningPath.image.search')}</h2>
        <div className="image-search-form">
          <input
            type="text" value={textQuery} onChange={(evt) => onQueryChange(evt)}
            onKeyPress={(evt) => onKeyPress(evt)} placeholder={polyglot.t('learningPath.image.searchPlaceholder')} className="image-search-form_query"
          />
          <button className="image-search-form_btn" onClick={(evt) => onImageSearchClick(evt)}><Icon.Search /></button>
        </div>
        <div className="image-search_border" />
        <div className="image-search_text">
          {this.state.showTotalCount ? <p>{polyglot.t('learningPath.image.imageSearchTotalCount', {textQuery, totalCount})}</p> : ''}
        </div>
      </div>
    );
  }
}

ImageSearch.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  localChangeImageSearchQuery: PropTypes.func.isRequired,
  totalCount: PropTypes.number,
};

export default (ImageSearch);
