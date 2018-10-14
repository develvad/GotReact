import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SessionOptions from './sesionOptions';
export default class SearchForm extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSeasonChange = this.handleSeasonChange.bind(this);
        this.handleAliveChange = this.handleAliveChange.bind(this);
    }
    handleChange(e) {
        console.log({[e.target.name]: e.target.value});
        this.props.onQueryChange({
            [e.target.name]: e.target.value
        });

    }
    handleSeasonChange(e) {

        const season = parseInt(e.target.value);
        const isCheck = e.target.checked;
        let newSeasons = this.props.filter.seasons;

        if(isCheck) {
            newSeasons = this.props.filter.seasons.concat([season]);
        }else {
            newSeasons = this.props.filter.seasons.filter((s) => s !== season);
        }
        this.props.onQueryChange({
            seasons: newSeasons
        });
        console.log(season, isCheck, this.props.filter.seasons, newSeasons);

    }
    
    handleAliveChange(e) {
        this.props.onQueryChange({
            aliveOnly: e.target.checked
        });
    }
    


    render() {
        const familias = this.props.familias.map((f) =>  <option key={f} value={f}>{f}</option> )
        const seasonOptions = this.props.allSeasons.map(s => {
            const isChecked = this.props.filter.seasons.indexOf(s) !== -1;
            return <SessionOptions season={s} key={s} onChange={ this.handleSeasonChange } isCheck={isChecked } />
        });
        const filter = this.props.filter;
        return(
            <div className="search-form">
                <form>
                    <div className="row">
                    <div className="col one-half">
                        <label htmlFor="character">Actor / personaje</label>
                        <input type="text" name="name" onChange={ this.handleChange } />
                    </div>
                    <div className="col one-half">
                        <label htmlFor="family">Familia</label>
                        <select name="family" onChange={ this.handleChange }>
                            <option value="">Todas</option>
                            { familias }
                        </select>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col one-half">
                        <label htmlFor="alive">Sólo personajes vivos</label>
                        <input type="checkbox" name="alive" onChange={ this.handleAliveChange } checked={filter.aliveOnly} />
                    </div>
                        <div className="col one-half">
                        <fieldset>
                            <legend>Aparece en temporada</legend>
                            { seasonOptions }
                            
                        </fieldset>
                            
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

SearchForm.propTypes = {
    familias: PropTypes.arrayOf(PropTypes.string).isRequired,
    allSeasons: PropTypes.array.isRequired,
    filter: PropTypes.shape({
        name: PropTypes.string,
        family: PropTypes.string,
        seasons: PropTypes.array
    }).isRequired,
    onQueryChange: PropTypes.func.isRequired
}