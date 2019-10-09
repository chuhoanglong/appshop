import * as Types from '../actions/actionTypes';
import {put,takeEvery} from 'redux-saga/effects';
import Api from './Api';

function* FetchLoginSaga(action){
    console.log(action);
    
    try {
        const res = yield Api.getUserLogin(action.email,action.password);
        yield put({type:Types.FEETCH_SUCCESS_LOGIN,status: res.status, message: res.message, user:res.user});
        action.resolve(res);
     } catch (error) {
        yield put({type:Types.FEETCH_FAILD_LOGIN,status:300, message:'Lỗi Đăng Nhập'});
        action.reject(error);
    }
}

export function* taskLoginUser(){
    yield takeEvery(Types.START_LOGIN,FetchLoginSaga);
}
