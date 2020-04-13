import React from 'react';
import styled from "./BurgerIngridients.module.css"



const burgerIngridients = (props) => {
    let cmp;
    switch (props.component) {
        case 'meat':
            cmp = <div onClick={props.clickedIngridient} className={styled.Meat}>

            </div>
            break;
        case 'cheese':
            cmp = <div onClick={props.clickedIngridient} className={styled.Cheese}>

            </div>
            break;
        case 'salad':
            cmp = <div onClick={props.clickedIngridient} className={styled.Salad}>

            </div>
            break;
        case 'bacon':
            cmp = <div onClick={props.clickedIngridient} className={styled.Bacon}>

            </div>
            break;
        case 'breadTop':
            cmp = <div className={styled.BreadTop}>
                <div className={styled.Seeds1}></div>
                <div className={styled.Seeds2}></div>
            </div>
            break;
        case 'breadBottom': cmp = <div className={styled.BreadBottom}>

        </div>
            break;
        default: cmp = null;
    }


    return (
        cmp
    );
}

export default burgerIngridients;