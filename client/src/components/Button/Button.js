import React from 'react';
import './Button.css';

const Button = props => {
    return (
        
            <button className="btn btn-primary btn-lg" onClick={() => props.clickHandler(props.id, props.name)} id={props.id}>{props.name}</button>
        
    )
};

export default Button;