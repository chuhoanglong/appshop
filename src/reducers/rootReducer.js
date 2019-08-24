import { combineReducers } from 'redux';
import HomeReducer from './HomeReducer';
import ProductReducer from './ProductReducer';
import CartReducer from './CartReducer';

const rootReduccer = combineReducers({HomeReducer,ProductReducer,CartReducer});
export default rootReduccer;