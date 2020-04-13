import React from 'react';
import Aux from '../../hoc/Aux/Aux';

import Button from '../UI/Button/Button';

const orderSummary = (props) => {

    const list = Object.keys(props.ingridients).map(el => {
        return <li key={el}>
            <span style={{ textTransform: 'capitalize' }}>{el}: </span>{props.ingridients[el]}
        </li>
    });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingridients: </p>
            <ul>
                {list}
            </ul>
            <p><strong>Price: {props.price.toFixed(2)}$</strong></p>
            <p>Continue to checkout?</p>
            <Button
                btnType="Danger"
                clicked={props.cancelPurchase}
            >CANCEL</Button>

            <Button
                btnType="Success"
                clicked={props.continuePurchase}
            >CHECKOUT</Button>
        </Aux>
    )
}

export default orderSummary;