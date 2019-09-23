import * as Types from './actionTypes';

// dispatch of login
export const userLogin = (payload) => {
    return {
        type: Types.START_LOGIN,
        name: payload.name,
        pass: payload.pass,
        resolve: payload.resolve,
        reject: payload.reject
    }
}

// dispatch of redux
export const showProductTask = (isLoading, category) => {
    return {
        type: Types.SHOW_PRODUCT,
        isLoading,
        category
    }
};
export const addToCartTask = (product) => {
    return {
        type: Types.ADD_TO_CART,
        product
    }
}

export const changeSize = (newCarts) => {
    return {
        type: Types.CHANGE_SIZE,
        newCarts
    }
}

export const deleteProduct = (newCarts) => {
    return {
        type: Types.DELETE_PRODUCT,
        newCarts
    }
}

export const getCarts = () => {
    return {
        type: Types.START_APP
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
export const fetchSuccessLogin = (res) => {
    return {
        type: Types.FEETCH_SUCCESS_LOGIN,
        status: res.status,
        message: res.message
    }
}
export const fetchFailLogin = (res) => {
    return {
        type: Types.FEETCH_FAILD_LOGIN,
        status: res.status,
        message: res.message
    }
}