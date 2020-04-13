import React from 'react';

import styled from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const components = {
    Meat: 'meat',
    Salad: 'salad',
    Cheese: 'cheese',
    Bacon: 'bacon'
}

const buildControls = (props) => {

    const trans = Object.keys(components).map((el, i) => {
        return <BuildControl 
        label={el} 
        key={components[el] + i}
        addClick = {() => props.addIng(components[el])}
        subClick = {() => props.subIng(components[el])}
        disabled = {props.disabledInfo[components[el]]}
        />
    })

    return (
        <div className={styled.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}$</strong></p>
            {trans}
            <button className={styled.OrderButton} 
            disabled={props.disOrdBtn}
            onClick = {props.purchasing}
            >{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
        </div>
    )
}


export default buildControls;