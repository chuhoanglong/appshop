import * as Types from '../actions/actionTypes';
import Api from './Api';
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';

function* getAsyncCart(){
    try {
        const carts = yield Api.getCartsFromAsyncStorage();
        yield put({type:Types.GET_SUCCESS_CARTS_ASYNCSTORAGE,carts});
    } catch (error) {
        yield put({type:Types.GET_FAIL_CARTS_ASYNCSTORAGE,error});
    }
}
function* removeCarts(){
    try {
        const carts = yield Api.removeCartsFromAsyncStorage();
        yield put({type:Types.REMOVE_SUCCESS_CARTS_ASYNCSTORAGE,carts});
    } catch (error) {
    }
}
export function* getCartsFromAsyncStorage(){
    yield takeEvery(Types.START_APP,getAsyncCart);
    yield takeEvery(Types.REMOVE_CARTS, removeCarts);
}
