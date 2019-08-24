import { combineReducers } from 'redux';
import HomeReducer from './HomeReducer';
import ProductReducer from './ProductReducer';

const rootReduccer = combineReducers({HomeReducer,ProductReducer});
export default rootReduccer;