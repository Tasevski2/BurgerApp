import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-post';
import Spinner from '../../components/UI/Spinner/Spinner';
import withDisplayError from '../../hoc/withDisplayError/withDisplayError';
import * as actions from '../../store/actions/index';


const BurgerBuilder = (props) => {

    const [ purchasing, setPurchasing ] = useState(false);
    const [ checkoutClicked, setCheckoutClicked ] = useState(false);

    const { token, reset, once, initIngridients} = props;

    useEffect(() => {
        if (!token) {
            reset();
        }
        console.log("VLEZE");
        if (!once) {
            initIngridients();
        }

    }, [token, reset, once, initIngridients]);



    const purchasableInfo = () => {
        let sum = 0;
        for (let key in props.ingridients) {
            sum += props.ingridients[key];
        }

        return sum <= 0;
    }

    const purchasingHandler = () => {
        if (token) {
            setPurchasing(true);
        } else {
            props.history.push('/auth');
        }

    }

    const hidePurchase = () => {
        setPurchasing(false);
    }

    const continuePurchase = () => {
        props.history.push({
            pathname: '/checkout',
        });

    }


    const disabledInfo = {
        ...props.ingridients
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0 ? true : false;
    }

    let burger = <Spinner />
    let orderSummary = null;

    if (props.ingridients) {
        burger = (
            <Aux>
                <Burger
                    ingridients={props.inOrder}
                    removeClickedIngridient={props.removeClickedIngridient}
                />
                <BuildControls
                    addIng={props.addIngHandler}
                    subIng={props.subIngHandler}
                    disabledInfo={disabledInfo}
                    price={props.totalPrice}
                    purchasing={purchasingHandler}
                    isAuth={props.token ? true : false}
                    disOrdBtn={purchasableInfo()}
                />
            </Aux>
        )
        orderSummary = <OrderSummary
            ingridients={props.ingridients}
            cancelPurchase={hidePurchase}
            continuePurchase={continuePurchase}
            price={props.totalPrice}
        />;
    }


    if (checkoutClicked) {
        orderSummary = <Spinner />
    }

    return (
        <Aux>
            <Modal
                show={purchasing}
                hidePurchase={hidePurchase}
            >
                {orderSummary}
            </Modal>
            {props.error ? <p style={{ textAlign: 'center' }}>Ingridients can't be loaded!</p> : burger}
        </Aux>
    )
}


const mapStateToProps = (state) => {
    return {
        ingridients: state.burgerBuilder.ingridients,
        inOrder: state.burgerBuilder.inOrder,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        once: state.burgerBuilder.once,
        token: state.auth.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addIngHandler: (component) => dispatch(actions.addIngridient(component)),
        subIngHandler: (component) => dispatch(actions.subIngridient(component)),
        removeClickedIngridient: (component, index) => dispatch(actions.removeClickedIngridient(component, index)),
        initIngridients: () => dispatch(actions.fetchInitIngridients()),
        reset: () => dispatch(actions.resetWholeState())
    }
}

export default withDisplayError(connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder), axios);
