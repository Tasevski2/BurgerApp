import React from 'react';

import styled from './Order.module.css';
import Button from '../UI/Button/Button';

const order = (props) => {
    // console.log(props.ing.join('-'));
    return (
        <div className={styled.Order}>
            <div>
                <p style={{ textTransform: 'capitalize' }}>Ingridients: {props.ing ? props.ing.join('-') : 'Only Bread'}</p>
                <p>Price: <strong>{props.price.toFixed(2)}</strong></p>
            </div>
                <Button btnType='Danger' clicked={props.deleteOrder}> DELETE </Button>
        </div>
    )
}

export default order;