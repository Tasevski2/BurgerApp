import React from 'react';

import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import styled from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return (
        <div className={styled.CheckoutSummary}>
            <h1>We hope it tasets well!!!</h1>
            <div className={styled.Burger}>
                <Burger ingridients={props.ingridients}/>
            </div>
            <Button btnType="Danger" clicked={props.cancled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continued}>CONTINUE</Button>
        </div>
    )
}

export default checkoutSummary;