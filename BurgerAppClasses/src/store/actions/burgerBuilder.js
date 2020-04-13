import * as actionTypes from './actionTypes';
import axios from '../../axios-post';


const initIngridients = (ingridients) => {
    return {
        type: actionTypes.FETCH_INIT_INGRIDIENTS,
        payload: {
            ingridients: ingridients
        }
    }
}

const initIngridientsERROR = (err) => {
    return {
        type: actionTypes.FETCH_INIT_INGRIDIENTS_ERROR
    }
}

export const fetchInitIngridients = () => {
    return dispatch => {
        axios.get('/ingridients.json')
            .then(res => {
                dispatch(initIngridients(res.data))
            })
            .catch(err => {
                dispatch(initIngridientsERROR())
            })
    }
}

export const addIngridient = (comp) => {
    return {
        type: actionTypes.ADD_INGRIDIENT,
        payload: {
            component: comp
        }
    }
}

export const subIngridient = (comp) => {
    return {
        type: actionTypes.SUB_INGRIDIENT,
        payload: {
            component: comp
        }
    }
}

export const removeClickedIngridient = (comp, indx) => {
    return {
        type: actionTypes.REMOVE_CLICKED_INGRIDIENT,
        payload: {
            component: comp,
            index: indx
        }
    }
}

export const resetWholeState = () => {
    return {
        type: actionTypes.RESET_WHOLE_STATE
    }
}