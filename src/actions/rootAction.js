import * as Types from './actionTypes';

// dispatch of redux
export const showProductTask = (isLoading) => {
    return {
        type: Types.SHOW_PRODUCT,
        isLoading
    }
};
export const addToCartTask = (product) => {
    return {
        type: Types.ADD_TO_CART,
        product
    }
}


// dispatch of redux-saga
export const fetchSuccessProducts = (products, isLoading) => {
    return {
        type: Types.FETCH_SUCCESS_PRODUCTS,
        products,
        isLoading
    }
};

export const fetchFailProduct = (err, isLoading) => {
    return {
        type: Types.FETCH_FAIL_PRODUCTS,
        err,
        isLoading
    }
}