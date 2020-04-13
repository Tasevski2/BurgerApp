import * as actionTypes from '../actions/actionTypes';

const initialState = {
    // orders: [],
    loading: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.POST_ORDER_DATA: 
            // const order = {
            //     orderData: action.payload.orderData,
            //     id: action.payload.id
            // };
            return {
                ...state,
                // orders: state.orders.concat(order),
                loading: false
            };
        case actionTypes.POST_ORDER_DATA_ERROR: 
            return {
                ...state,
                loading: false
            };
        case actionTypes.POST_ORDER_DATA_START:
                return {
                    ...state,
                    loading: true
                }
        default: return state;
    }
}

export default reducer;