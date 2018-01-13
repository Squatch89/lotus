import React from 'react';
import './Button.css';

const Button = props => {
    return (
        [
            <button onClick={() => props.chooseAudio(props.id, props.audioName)} id={props.id}>{props.audioName}</button>
        ]
    )
};

export default Button;