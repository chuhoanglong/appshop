import * as Types from './actionTypes';

export const showProductTask = (isLoading) => {
    return {
        type: Types.SHOW_PRODUCT,
        isLoading
    }
};

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