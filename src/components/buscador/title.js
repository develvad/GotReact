import React, { Component} from 'react';
import PropTypes from 'prop-types';

 const Title = (props) => (
    <div className="search-title">
        <div className="row">
            <h1> { props.text }</h1>
        </div>
    </div>
)

Title.propTypes = {
    text: PropTypes.string.isRequired
}

export default Title;