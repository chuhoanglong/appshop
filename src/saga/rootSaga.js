// quan li toan bo saga.
import {all} from 'redux-saga/effects';
import * as ProductSaga from './ProductSaga';
import * as CartSaga from './cartSaga';
import * as LoginSaga from './LoginSaga';
// tao 1 saga de chay dong thoi hoac tung componentSaga.
export default function* (){
    yield all([
        // can all more than saga here.
        ProductSaga.getProductsTask(),
        CartSaga.getCartsFromAsyncStorage(),
        LoginSaga.taskLoginUser(),
    ]);
}