import { combineReducers } from 'redux';
import HomeReducer from './HomeReducer';
import ProductReducer from './ProductReducer';
import CartReducer from './CartReducer';
import LoginReducer from './LoginReducer';

const rootReduccer = combineReducers(
    {
        HomeReducer,
        ProductReducer,
        CartReducer,
        LoginReducer,
    }
);
export default rootReduccer;