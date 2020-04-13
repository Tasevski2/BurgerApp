import React from 'react';

import styled from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    let attachedClasses = [styled.InputElement];
    if(props.invalid && props.touched) {
        attachedClasses.push(styled.Invalid);
    }
    switch (props.elementtype) {
        case 'input': inputElement = 
            <input className={attachedClasses.join(' ')} 
        placeholder={props.config.placeHolder} 
            name={props.config.name} type={props.config.name} onChange={props.changed} value={props.value}/>
            break;
        case 'textarea': inputElement = 
            <textarea className={attachedClasses.join(' ')} 
        placeholder={props.config.placeHolder} 
            name={props.config.name} onChange={props.changed} value={props.value}/>
            break;
        case 'select': inputElement = 
            <select className={attachedClasses.join(' ')} 
            name={props.config.name} onChange={props.changed} value={props.value}>
             {
                 props.config.values.map(op => (
                    <option key={op.value}
                    value={op.value}>{op.displayName}</option>
                 ))
             }
        </select>
            break;
        default: inputElement = 
            <input className={attachedClasses.join(' ')}  
        placeholder={props.config.placeHolder} 
            name={props.config.name} onChange={props.changed} value={props.value}/>
    }

    return (
        <div className={styled.Input}>
            <label className={styled.Label}>{props.config.displayName}</label>
            {inputElement}
        </div>
    )
}

export default input;