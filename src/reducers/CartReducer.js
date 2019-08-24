import * as Types from '../actions/actionTypes';

const initalState = {
    carts: []
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

        default: return state;

    }
}

export default CartReducer;