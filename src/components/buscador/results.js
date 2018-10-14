import React, { Component} from 'react';
import PropTypes from 'prop-types';
import Summary from './summary'
import ResultItem from './results-item'
import shallowCompare from 'react-addons-shallow-compare';
class Results extends Component {

    // shouldComponentUpdate(nextProps, nextState){
    //     return shalloCompare(this, nextProps, nextState)
    //     return false;
    // }

    render(){
        const {items } = this.props;
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
            <Summary total={resultItems.length} />
        </div>
        )
    }
    
};

Results.propTypes = {
    items: PropTypes.array
}


export default Results;