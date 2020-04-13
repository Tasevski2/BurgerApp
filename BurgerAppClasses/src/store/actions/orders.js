import * as actionTypes from './actionTypes';
import axios from '../../axios-post';

const orders = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS,
        payload: {
            orders: orders
        }
    }
}

const ordersError = (err) => {
    return {
        type: actionTypes.FETCH_ORDERS_ERROR,
        payload: {
            error: err
        }
    }
}

const loading = () => {
    return {
        type: actionTypes.LOADING_ORDERS
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(loading());
        const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
        axios.get(`/orders.json${queryParams}`)
            .then(res => {
                let listOrder = [];
                for (let key in res.data) {
                    listOrder.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(orders(listOrder));
            })
            .catch(err => {
                console.log(err);
                dispatch(ordersError(err));
            })
    }
}

const delOrd = (id) => {
    return {
        type: actionTypes.DELETE_ORDER,
        payload: {
            id: id
        }
    }
}

export const deleteOrder = (id, token) => {
    return dispatch => {
        dispatch(loading());
        axios.delete('/orders/' + id +'.json?auth=' + token)
            .then(() => {
                dispatch(delOrd(id));
            })
            .catch(err => {
                console.log(err);
            })
    }
}