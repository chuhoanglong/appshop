import * as Types from '../actions/actionTypes';


const initalState = {
    carts: [],
    payload: null
}

const CartReducer = (state = initalState, action) => {
    switch (action.type) {
        case Types.ADD_TO_CART: {
            return {
                ...state,
                carts: [
                    ...state.carts,
                    action.product
                ]
            }
        }
        case Types.CHANGE_SIZE: {
            return {
                ...state,
                carts: action.newCarts
            }
        }
        case Types.DELETE_PRODUCT: {
            return {
                ...state,
                carts: action.newCarts
            }
        }
        case Types.GET_SUCCESS_CARTS_ASYNCSTORAGE: {
            return {
                ...state,
                carts: action.carts
            }
        }
        case Types.PAYMENT_CART: {
            return {
                ...state,
                payload: action.payload
            }
        }
        case Types.REMOVE_SUCCESS_CARTS_ASYNCSTORAGE: {
            return{
                ...state,
                carts: action.carts
            }
        }
        default: return state;

    }
}

export default CartReducer;