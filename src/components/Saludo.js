import React, {Component}  from 'react';
import PropTypes from 'prop-types';
import Counter from './Counter'
const Diva = (props) => (
    <div> Soy el componente { props.id } -- {props.idmasuno} </div>
)

export default class Saludo extends Component {


    render(){
        const { name, surname, func } = this.props;
        const { func1, func2 } = this.props.func;
        let practical = {
            name: 'JSXcore',
            state: 'Fun'
        }
        let divaList = [];
        let imasuno = 0;
        for (let i = 0; i <= 10; i++) {
            imasuno = i + 1;
            divaList.push(<Diva key={i} id={i} idmasuno={imasuno} />);
        }
        return(
            <div>
                <h1> hola { name }, { surname } </h1>
                <p> functiones disponibles: { func1 } { func2 }</p>
                { divaList }
                <Counter />
            </div>
        );
    }

    componentDidCatch(error, info){
        
        error? console.warn(error): null;
        info? console.info(info) : null;
    }
}

Saludo.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    func: PropTypes.shape({
        func1: PropTypes.string,
        func2: PropTypes.string
    })
}

Saludo.defaultProps = {
    id: 0,
    name: 'Tus Muertos',
    surname: 'Complication',
    func: {
        func1: 'SoFar',
        func2: 'Away'
    }
}