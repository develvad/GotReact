import React, { Component} from 'react';
import Title from './title';
import Results from './results';
import Data from '../../data/got';
import SearchForm from './form';

function search(filter, characters){
    return characters.filter((personaje) => {
        return (
            // Filtro personaje
            (personaje.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1 || personaje.actor.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1)  
            &&
            // Filtro Familia
            (!filter.family || personaje.family === filter.family) 
            // Filtro temporadas
            &&
            (!filter.seasons.length || filter.seasons.every(x => personaje.seasons.indexOf(x) !== -1)) 
            // Flitro Vivo
            &&
            (!filter.aliveOnly || personaje.alive)
        );  
    });
}

function extractFamilyNames(characters){
    return characters.reduce((acc, c) => {
        if(acc.indexOf(c.family) === -1) {
            acc.push(c.family);
        }
        return acc;
    }, []).sort();
}

function extractSeasons(characters){
    return characters.reduce((acc, c) => {
        c.seasons.forEach(n => {
            if (acc.indexOf(n) === -1){
                acc.push(n);
            }
        });
        return acc;
    }, [])
}

export default class Buscador extends React.Component {
    constructor() {
        super();
        this.state = {
            characters: Data.characters,
            familyNames: extractFamilyNames(Data.characters),
            allSeasons: extractSeasons(Data.characters),
            filter: {
                name: '',
                family: '',
                seasons: [],
                aliveOnly: false
            }
        }
        this.handleQueryChange = this.handleQueryChange.bind(this);
    }
    
    handleQueryChange(change) {
        const newFilter = Object.assign({}, this.state.filter, change);
        this.setState({
            filter: newFilter
        })
    }

    render(){ 
        console.log('filtro: ', this.state.filter);
        const characters = search(this.state.filter, this.state.characters);
        return(
            <div className="search-engine">
                <Title text= {'Buscador de Juego de Tronos VIP'} />
                <SearchForm familias={this.state.familyNames} allSeasons= { this.state.allSeasons } filter={this.state.filter} onQueryChange={this.handleQueryChange} />
                <Results items={ characters } />
        </div>
        );
    }
}