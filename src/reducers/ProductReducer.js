import * as Types from '../actions/actionTypes';

const initialState = {
    products: [],
    err: [],
    isLoading: true
}

const ProductReducer = (state = initialState, action) => {
    switch (action.type) {


        // reducer of redux-saga
        case Types.FETCH_SUCCESS_PRODUCTS: {
            return {
                ...state,
                products: action.products,
                isLoading: action.isLoading,
            }
        }
        case Types.FETCH_FAIL_PRODUCTS: {
            return {
                ...state,
                err: action.err,
                isLoading: action.isLoading
            }
        }

        default: return state;
    }
}
export default ProductReducer;