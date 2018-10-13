import React, { Component } from 'react';
import PropsTypes from 'prop-types';
import { extractTimeParts } from '../lib/utils'

const Header = () => (
    <div className="header">
        <h2>Cronómetro</h2>
    </div>
)

const Screen = (props) => (
    <div className="timer">
    <span className="timer-m">{props.minutes}:</span>
    <span className="timer-s">{props.seconds}:</span>
    <span className="timer-ms">{props.milliseconds}</span>
</div>
)

const Buttons = (props) => (
    <div className="actions">
        <button onClick={ props.onStop }>STOP</button>
        <button onClick={ props.onStart }>START</button>
    </div>
)

Buttons.propsTypes = {
    onStart: PropsTypes.func,
    onStop: PropsTypes.func
}

export default class Cronometro extends Component {
    _interval;
    constructor(){
        super();
        this.state = { 
            isRunning: false,
            start: 0,
            current: 0
        }
        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
    }
    handleStart(){
        if (this.state.isRunning){
            return
        }
        if(this.state.current !== 0){

            this.setState({
                isRunning: true,
                start: this.state.start,
                current: this.state.current
            }) 
        }else{
            this.setState({
                isRunning: true,
                start: Date.now(),
                current: Date.now()
            })
        }


    }
    handleStop(){
        if (!this.state.isRunning){
            this.setState({
                isRunning: false,
                start: 0,
                current: 0
            })
            return
            
        }else{
            this.setState({
                isRunning: false,
                current: this.state.current
            });
        }
        clearInterval(this._interval);

    }   
    render() {
        const { start, current } = this.state;
        const { minutes, seconds, milliseconds } = extractTimeParts(current - start);
        return (
            
            <div className="crono">
                <Header />
                <div className="content">
                <Screen minutes= { minutes} seconds = {seconds} milliseconds = {milliseconds} />
                <Buttons onStop={ this.handleStop } onStart={this.handleStart} />
                </div>
            </div>

        );
    }
}