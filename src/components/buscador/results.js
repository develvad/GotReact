import React, { Component} from 'react';
import PropTypes from 'prop-types';
import Summary from './summary'
import ResultItem from './results-item'

const Results = (props) => {
    const {items } = props;
    const resultItems = items.map( (item) => <ResultItem key={item.name} item={item} /> );
    return(
        <div className="search-results">
        <table>
            <thead>
            <tr>
                <th>Personaje</th>
                <th>Actor</th>
                <th className="center">Temporadas</th>
                <th className="center">Vivo</th>
            </tr>
            </thead>
            <tbody>
                {resultItems}

            </tbody>
        </table>
        <Summary total={255} />
    </div>
    )
};

Results.propTypes = {
    items: PropTypes.array
}


export default Results;