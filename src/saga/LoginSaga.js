import * as Types from '../actions/actionTypes';
import {put,takeEvery} from 'redux-saga/effects';
import Api from './Api';

function* FetchLoginSaga(action){
    console.log(action);
    
    try {
        const res = yield Api.getUserLogin(action.name,action.pass);
        yield put({type:Types.FEETCH_SUCCESS_LOGIN,status: res.status, message: res.message});
        action.resolve(res);
     } catch (error) {
        yield put({type:Types.FEETCH_FAILD_LOGIN,status:300, message:'loi roi'});
        action.reject(error);
    }
}

export function* taskLoginUser(){
    yield takeEvery(Types.START_LOGIN,FetchLoginSaga);
}
