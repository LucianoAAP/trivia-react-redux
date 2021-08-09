import React from 'react';
import PropTypes from 'prop-types';

class SelectLabel extends React.Component {
  render() {
    const { name, labelText, value, onChange,
      optionList } = this.props;
    return (
      <label
        htmlFor={ name }
      >
        { labelText }
        <select
          id={ name }
          value={ value }
          onChange={ onChange }
          name={ name }
        >
          { optionList.map((element) => (
            <option
              key={ element.id }
              value={ `&category=${element.id}` }
            >
              { element.name }
            </option>
          ))}
        </select>
      </label>
    );
  }
}

SelectLabel.propTypes = {
  name: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  optionList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default SelectLabel;
