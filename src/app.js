import React from 'react';
import ReactDOM from 'react-dom';
import Saludo from './components/Saludo';
import Cronometro from './components/Cronometro';
import Buscador from './components/buscador'
let func = {
    func1: 'clone',
    func2: 'copy'
}

ReactDOM.render(<Buscador />, document.getElementById('app'));
