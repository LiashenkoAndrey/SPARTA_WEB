import React from 'react';
import './Button.css'

const GoodButton = (props) => {
    return (
        <button {...props} className={"Button " + props.className}>{props.text}</button>
    );
};

export default GoodButton;