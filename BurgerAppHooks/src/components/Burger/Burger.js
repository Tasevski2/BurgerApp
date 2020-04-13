import React from 'react';

import BurgerIngridients from './BurgerIngridients/BurgerIngridients';
import styled from './Burger.module.css';


const burger = (props) => {

    // let trans = Object.keys(props.ingridients).map((igKey) => {
    //     return [...Array(props.ingridients[igKey])].map((_,index) => {
    //        return <BurgerIngridients 
    //        key={igKey + `${index}`}  
    //        component = {igKey}
    //        />
    //     })
    // }).reduce((arr, el) => {
    //     return arr.concat(el);
    // }, []);

    let trans = props.ingridients.map((com, index)=> {
        return <BurgerIngridients
            key={com + `${index}`}
            component={com}
            clickedIngridient={() => props.removeClickedIngridient(com, index)}
        />
    })

    if (trans.length === 0) {
        trans = <p className={styled.P}>CHOOSE YOUR COMPONENTS</p>
    }

    return (
        <div className={styled.Burger}>
            <BurgerIngridients component='breadTop' />
            {trans}
            <BurgerIngridients component='breadBottom' />
        </div>
    )
}

export default burger;