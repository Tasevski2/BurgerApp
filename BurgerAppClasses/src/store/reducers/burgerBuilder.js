import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingridients: null,
    inOrder: [],
    totalPrice: 4,
    error: false,
    once: false
}

const INGRIDIENTS_PRICES = {
    meat: 1.3,
    cheese: 0.4,
    salad: 0.5,
    bacon: 0.7
}

const addIngridient = (state, action) => {
    const newValue = state.ingridients[action.payload.component] + 1;
    const updatedIng = {
        ...state.ingridients,
    };
    let updatedInOrder = [...state.inOrder];
    updatedInOrder.push(action.payload.component);
    updatedIng[action.payload.component] = newValue;
    // console.log(updatedInOrder);
    const newTotal = state.totalPrice + INGRIDIENTS_PRICES[action.payload.component];
    return {
        ...state,
        ingridients: updatedIng,
        inOrder: updatedInOrder,
        totalPrice: newTotal
    }
}

const subIngridient = (state, action) => {
    // if (state.ingridients[action.payload.component] !== 0) {
    const newValueSUB = state.ingridients[action.payload.component] - 1;
    const updatedIngSUB = {
        ...state.ingridients
    };
    let updatedInOrderSUB = [...state.inOrder];
    for (let i = updatedInOrderSUB.length; i >= 0; i--) {
        if (updatedInOrderSUB[i] === action.payload.component) {
            updatedInOrderSUB.splice(i, 1);
            break;
        }
    }
    updatedIngSUB[action.payload.component] = newValueSUB;
    const newTotalSUB = state.totalPrice - INGRIDIENTS_PRICES[action.payload.component];
    // }
    return {
        ...state,
        ingridients: updatedIngSUB,
        inOrder: updatedInOrderSUB,
        totalPrice: newTotalSUB
    };
}

const removeClickedIngridient = (state, action) => {
    let updatedInOrderREM = [...state.inOrder];
    updatedInOrderREM.splice(action.payload.index, 1);
    let updatedIngREM = {
        ...state.ingridients
    };
    updatedIngREM[action.payload.component] = state.ingridients[action.payload.component] - 1;
    let newTotalREM = state.totalPrice - INGRIDIENTS_PRICES[action.payload.component];
    // console.log(updatedInOrder);
    // console.log(updatedIng);
    return {
        ...state,
        ingridients: updatedIngREM,
        inOrder: updatedInOrderREM,
        totalPrice: newTotalREM
    };
}

const resetWholeState = (state, action) => {
    return {
        ...state,
        ingridients: {
            meat: 0,
            cheese: 0,
            salad: 0,
            bacon: 0
        },
        inOrder: [],
        totalPrice: 4
    };
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_INIT_INGRIDIENTS:
            return {
                ...state,
                ingridients: action.payload.ingridients,
                error: false,
                once: true
            };
        case actionTypes.FETCH_INIT_INGRIDIENTS_ERROR: 
            return {
                ...state,
                error: true
            };
        case actionTypes.ADD_INGRIDIENT: return addIngridient(state, action);

        case actionTypes.SUB_INGRIDIENT: return subIngridient(state, action);
            
        case actionTypes.REMOVE_CLICKED_INGRIDIENT: return removeClickedIngridient(state, action);
            
        case actionTypes.RESET_WHOLE_STATE: return resetWholeState(state, action);
            
        default:
            return state;
    }
}

export default reducer;