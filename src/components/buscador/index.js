import React, { Component} from 'react';
import Title from './title'
import Results from './results'
import Data from '../../data/got';

function search(filter, characters){
    return characters.filter((personaje) => {
        return personaje.name.indexOf(filter.name) !== -1 || personaje.actor.indexOf(filter.name) !== -1;
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
                family: ''
            }
        }
    }
    render(){ 
        const characters = search(this.state.filter, this.state.characters);
        return(
            <div className="search-engine">
                <Title text= {'Buscador de Juego de Tronos VIP'} />
                <div className="search-form">
                    <form>
                        <div className="row">
                        <div className="col one-half">
                            <label htmlFor="character">Actor / personaje</label>
                            <input type="text" name="character" />
                        </div>
                        <div className="col one-half">
                            <label htmlFor="family">Familia</label>
                            <select name="family">
                            <option value="stark">Todas</option>
                            <option value="stark">Stark</option>
                            <option value="stark">Stark</option>
                            <option value="stark">Stark</option>
                            <option value="stark">Stark</option>
                            <option value="stark">Stark</option>
                            </select>
                        </div>
                        </div>
                        <div className="row">
                        <div className="col one-half">
                            <label htmlFor="alive">Sólo personajes vivos</label>
                            <input type="checkbox" name="alive" />
                        </div>
                            <div className="col one-half">
                                <fieldset>
                                    <legend>Aparece en temporada</legend>
                                    <div className="season-option">
                                        1
                                        <input type="checkbox" name="s1" />
                                    </div>
                                    <div className="season-option">
                                        2
                                        <input type="checkbox" name="s2" />
                                    </div>
                                    <div className="season-option">
                                        3
                                        <input type="checkbox" name="s3" />
                                    </div>
                                    <div className="season-option">
                                        4
                                        <input type="checkbox" name="s4" />
                                    </div>
                                    <div className="season-option">
                                        5
                                        <input type="checkbox" name="s5" />
                                    </div>
                                </fieldset>
                            </div>
                    </div>
                </form>
                </div>
                <Results items={ characters } />
        </div>
        );
    }
}