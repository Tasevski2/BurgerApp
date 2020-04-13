import React, { Component } from 'react';
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


export class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        checkoutClicked: false
    }

    componentDidMount() {
        if(!this.props.token) {
            this.props.reset();
        }
        if(!this.props.once) {
            this.props.initIngridients();
        }

    }


    purchasableInfo = () => {
        let sum = 0;
        for (let key in this.props.ingridients) {
            sum += this.props.ingridients[key];
        }

        return sum <= 0;
    }

    purchasingHandler = () => {
        if(this.props.token) {
            this.setState({
                purchasing: true
            })
        } else {
            this.props.history.push('/auth');
        }
        
    }

    hidePurchase = () => {
        this.setState({
            purchasing: false
        })
    }

    continuePurchase = () => {
        this.props.history.push({
            pathname: '/checkout',
        });

    }


    render() {
        const disabledInfo = {
            ...this.props.ingridients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 ? true : false;
        }

        let burger = <Spinner />
        let orderSummary = null;

        if (this.props.ingridients) {
            burger = (
                <Aux>
                    <Burger
                        ingridients={this.props.inOrder}
                        removeClickedIngridient={this.props.removeClickedIngridient}
                    />
                    <BuildControls
                        addIng={this.props.addIngHandler}
                        subIng={this.props.subIngHandler}
                        disabledInfo={disabledInfo}
                        price={this.props.totalPrice}
                        purchasing={this.purchasingHandler}
                        isAuth = {this.props.token ? true : false}
                        disOrdBtn={this.purchasableInfo()}
                    />
                </Aux>
            )
            orderSummary = <OrderSummary
                ingridients={this.props.ingridients}
                cancelPurchase={this.hidePurchase}
                continuePurchase={this.continuePurchase}
                price={this.props.totalPrice}
            />;
        }


        if (this.state.checkoutClicked) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    hidePurchase={this.hidePurchase}
                >
                    {orderSummary}
                </Modal>
                {this.props.error ? <p style={{ textAlign: 'center' }}>Ingridients can't be loaded!</p> : burger}
            </Aux>
        )
    }
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