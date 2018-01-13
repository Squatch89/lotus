import React from 'react';
import './Audio.css';

const Audio = props => {
    return (
        <audio controls>
            <source src={props.src} type="audio/wav" />
            not supported
        </audio>
    )
};

export default Audio;

