import * as actionTypes from './actionTypes';
import axios from '../../axios-post';

const orderData = (responseDataID, orderData) => {
    return {
        type: actionTypes.POST_ORDER_DATA,
        payload: {
            orderData: orderData,
            id: responseDataID
        }
    }
}

const orderDataError = (err) => {
    return {
        type: actionTypes.POST_ORDER_DATA_ERROR,
        payload: {
            err: err
        }
    }
}

const postOrderDataStart = () => {
    return {
        type: actionTypes.POST_ORDER_DATA_START
    }
}

export const postOrderData = (orderedData, token) => {
    return dispatch => {
        dispatch(postOrderDataStart());
        axios.post('/orders.json?auth=' + token, orderedData)
            .then(res => {
                dispatch(orderData(res.data.name, orderedData));
            })
            .catch(err => {
                console.log(err);
                dispatch(orderDataError(err))
            })
    }
}