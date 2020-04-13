import React from 'react';

import styled from './Button.module.css';


const button = (props) => (
    <button
    disabled={props.disabled}
    className={[styled.Button, styled[props.btnType]].join(' ')}
    onClick={props.clicked}
    >
        {props.children}
    </button>
)

export default button;