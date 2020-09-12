import React from 'react';
import PropTypes from 'prop-types';

function Filter(props) {
  const { onSearch, filterString, style } = props;
  const handleChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <input
      className="inline"
      placeholder="Filtro"
      value={filterString}
      onChange={handleChange}
      style={style}
    ></input>
  );
}

Filter.propTypes = {
  props: PropTypes.object,
  onSearch: PropTypes.func,
  filterString: PropTypes.string,
};

export default Filter;
