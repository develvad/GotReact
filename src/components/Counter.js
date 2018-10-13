import React, { Component } from 'react';
import autobind from 'autobind-decorator';

class Counter extends Component {

    constructor() {
        super();
        this.state = {
            counter: 0
        }
        this.sumar = this.sumar.bind(this);
   
    } 
    sumar(){
        this.setState({counter: this.state.counter +1});
        
    }   
    render() {
        return(
            <div>
                <h6> Seguridad: { this.state.counter } </h6>
                <button onClick={ this.sumar }> Haz click</button>
            </div>

        )
    }
}
export default Counter;