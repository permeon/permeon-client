import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TagsInput from 'react-tagsinput';

import 'react-tagsinput/react-tagsinput.css';
import styles from './TagEditor.css';


const keyCodes = [
  9,   // Tab
  13,  // Enter
  32,  // Space
  188, // Comma
];

class TagEditor extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(tags, tag, idx) {
    this.props.handleChange('tags', tags);
  }

  render() {
    return (
      <TagsInput
        onChange={this.handleChange}
        value={this.props.tags}
        addKeys={keyCodes}
        renderInput={renderInput}
        maxTags={4}
      />
    );
  }
}

function renderInput (props) {
  let {onChange, value, addTag, ...other} = props;
  const style = {
    border: 'none',
    width: '100px',
    fontSize: '13px',
  };
  return (
    <input type='text' onChange={onChange} value={value} {...other} style={style} />
  );
}

TagEditor.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TagEditor;
