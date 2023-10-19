import React from 'react';
import './Button.css'

const Button = (props) => {
    return (
        <button {...props} className={"Button " + props.className}>{props.text}</button>
    );
};

export default Button;