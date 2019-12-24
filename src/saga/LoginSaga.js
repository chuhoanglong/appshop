import * as Types from '../actions/actionTypes';
import { put, takeEvery } from 'redux-saga/effects';
import { fetchSuccessLogin, fetchFailLogin } from '../actions/rootAction';
import Api from './Api';

function* FetchLoginSaga(action) {
    try {
        const res = yield Api.getUserLogin(action.email, action.password);
        yield put(fetchSuccessLogin({ status: res.status, message: res.message, user: res.user }));
        action.resolve(res);
    } catch (error) {
        yield put(fetchFailLogin({ status: 300, message: 'Lỗi Đăng Nhập' }));
        action.reject(error);
    }
}

export function* taskLoginUser() {
    yield takeEvery(Types.START_LOGIN, FetchLoginSaga);
}
