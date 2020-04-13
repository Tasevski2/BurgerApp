import * as actionTypes from '../actions/actionTypes';

const inititalState = {
    orders: [],
    loading: false,
    error: null
}

const reducer = (state = inititalState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ORDERS:
            return {
                ...state,
                orders: [...action.payload.orders],
                error: null,
                loading: false
            };
        case actionTypes.FETCH_ORDERS_ERROR:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            };
        case actionTypes.LOADING_ORDERS: 
            return {
                ...state,
                loading: true
            }
        case actionTypes.DELETE_ORDER: 
            return {
                ...state,
                orders: state.orders.filter(ord => ord.id !== action.payload.id),
                loading: false
            }
        default: return state
    }
}

export default reducer;