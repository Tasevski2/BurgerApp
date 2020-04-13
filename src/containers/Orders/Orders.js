import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-post';
import withDisplayError from '../../hoc/withDisplayError/withDisplayError';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';


export class Orders extends Component {

    componentDidMount() {
        this.props.fetchOrders(this.props.token, this.props.userId);
    }


    render() {
        let orders = <p style={{textAlign: 'center', marginTop: '100px', fontWeight: '700'}}>No orders</p>;
        if(this.props.loading) {
            orders = <Spinner />
        }
        if (this.props.orders.length !== 0) {
            orders = this.props.orders.map(order => {
                return <Order
                    ing = {order.ingridients}
                    price={order.price}
                    key={order.id}
                    deleteOrder={() => this.props.deleteOrder(order.id, this.props.token)}
                />
            });

        }
        console.log(this.props.orders);

        return (
            <div>
                {orders}
            </div>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
        deleteOrder: (id, token) => dispatch(actions.deleteOrder(id, token))
    }
}

export default withDisplayError(connect(mapStateToProps, mapDispatchToProps)(Orders), axios);