import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-post';
import withDisplayError from '../../hoc/withDisplayError/withDisplayError';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';


export const Orders = (props) => {
    
    const { fetchOrders, token, userId } = props;

    useEffect(() => {
        fetchOrders(token, userId);
    }, [fetchOrders, token, userId]);


        let orders = <p style={{textAlign: 'center', marginTop: '100px', fontWeight: '700'}}>No orders</p>;
        if(props.loading) {
            orders = <Spinner />
        }
        if (props.orders.length !== 0) {
            orders = props.orders.map(order => {
                return <Order
                    ing = {order.ingridients}
                    price={order.price}
                    key={order.id}
                    deleteOrder={() => props.deleteOrder(order.id, token)}
                />
            });

        }
        // console.log(this.props.orders);

        return (
            <div>
                {orders}
            </div>
        )
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