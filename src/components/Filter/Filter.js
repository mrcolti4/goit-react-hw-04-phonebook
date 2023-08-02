import PropTypes from 'prop-types';
import { Component } from 'react';

import style from './Filter.module.css';

export class Filter extends Component {
  render() {
    return (
      <label className={style.filter__label}>
        Find contacts by name
        <input
          onChange={this.props.onFilter}
          type="text"
          name="filter"
          value={this.props.filter}
        />
      </label>
    );
  }
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
};
