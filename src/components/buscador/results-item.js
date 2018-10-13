import React, { Component} from 'react';
import PropTypes from 'prop-types';

const ResultItem = ({ item }) => (
    <tr>
    <td>{item.name} </td>
    <td>{item.actor}</td>
    <td className="center">{ item.seasons.join(', ') }</td>
    <td className="center">{ item.alive ? 'Si' : 'No' }</td>
</tr>
)

ResultItem.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string,
        actor: PropTypes.string,
        seasons: PropTypes.array,
        alive: PropTypes.bool
    })
}


export default ResultItem;