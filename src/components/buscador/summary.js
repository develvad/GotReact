import React, { Component} from 'react';
import PropTypes from 'prop-types';

const Summary = (props) => (
    <div className="search-results-summary">
    <div className="row">
      Encontrados <span className="search-results-total">{props.total}</span> personajes
    </div>
  </div>
)

Summary.propTypes = {
    total: PropTypes.number.isRequired
}


export default Summary;