import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from '../../axios-post';

import withDisplayError from '../../hoc/withDisplayError/withDisplayError';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    orderCancledHandler = () => {
        this.props.history.goBack();
    }

    orderContinuedHandler = (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname: '/checkout/contact-data',
        });
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingridients={this.props.ingridients}
                    cancled={this.orderCancledHandler}
                    continued={this.orderContinuedHandler} />;
                <Route path={this.props.match.path + '/contact-data'}
                    component={ContactData} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ingridients: state.burgerBuilder.inOrder,
        once: state.burgerBuilder.once
    }
}

export default withDisplayError(connect(mapStateToProps)(Checkout), axios);