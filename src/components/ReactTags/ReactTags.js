import React, { Component, PropTypes } from 'react';
import TagsInput from 'react-tagsinput';
import get from 'lodash/get';
import intersection from 'lodash/intersection';
import {AutocompleteRenderInput} from 'components';

export default class ReactTags extends Component {
  static propTypes = {
    addTag: PropTypes.func,
    suggestions: PropTypes.array,
    handleChange: PropTypes.func,
    tags: PropTypes.array,
    autocomplete: PropTypes.bool,
    classNames: PropTypes.object
  };

  handleChange(newTags) {
    const { handleChange, suggestions, tags: oldTags, autocomplete } = this.props;
    if (autocomplete) {
      handleChange(intersection(newTags, [...suggestions, ...oldTags]));
    } else {
      handleChange(newTags);
    }
  }

  render() {
    const { suggestions, autocomplete, classNames } = this.props;

    return (<TagsInput
      inputProps={{
        className: get(classNames, 'tagInputField')
      }}
      tagProps={{
        className: get(classNames, 'tag')
      }}
      renderInput={(props) => <AutocompleteRenderInput
        {...{...props, autocomplete, suggestions, classNames}
      }/>}
      value={this.props.tags}
      onChange={::this.handleChange} />);
  }
}
