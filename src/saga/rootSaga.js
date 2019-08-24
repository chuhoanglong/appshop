// quan li toan bo saga.
import {all} from 'redux-saga/effects';
import * as ProductSaga from './ProductSaga';

// tao 1 saga de chay dong thoi hoac tung componentSaga.
export default function* (){
    yield all([
        // can all more than saga here.
        ProductSaga.getProductsTask(),

    ]);
}