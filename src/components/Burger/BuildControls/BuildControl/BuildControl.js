import React from 'react';

import styled from './BuildControl.module.css';

const buildControl = (props) => {
    return (
        <div className={styled.BuildControl}>
            <label className={styled.Label}>{props.label}</label>
            <button className={styled.Less} onClick={props.subClick} disabled={props.disabled}>Less</button>
            <button className={styled.More} onClick={props.addClick}>More</button>
        </div>
    )
}

export default buildControl;