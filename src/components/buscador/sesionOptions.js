import React from 'react';
import PropTypes from 'prop-types';

const SessionOptions = (props) =>{
    
    return(
        <div className="season-option">
            { props.season }
            <input value= { props.season } checked= { props.isChecked } onChange={ props.onChange } type="checkbox" name="s1" />
        </div>
    )
}

SessionOptions.propTypes = {
    isChecked: PropTypes.bool,
    season: PropTypes.number,
    onChange: PropTypes.func
};

export default SessionOptions;