import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from '../../axios-post';

import withDisplayError from '../../hoc/withDisplayError/withDisplayError';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = (props) => {

    const orderCancledHandler = () => {
        props.history.goBack();
    }

    const orderContinuedHandler = (e) => {
        e.preventDefault();
        props.history.push({
            pathname: '/checkout/contact-data',
        });
    }

        return (
            <div>
                <CheckoutSummary
                    ingridients={props.ingridients}
                    cancled={orderCancledHandler}
                    continued={orderContinuedHandler} />;
                <Route path={props.match.path + '/contact-data'}
                    component={ContactData} />
            </div>
        )
}

const mapStateToProps = (state) => {
    return {
        ingridients: state.burgerBuilder.inOrder,
        once: state.burgerBuilder.once
    }
}

export default withDisplayError(connect(mapStateToProps)(Checkout), axios);