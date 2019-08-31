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

export function* getCartsFromAsyncStorage(){
    yield takeEvery(Types.START_APP,getAsyncCart);
}
