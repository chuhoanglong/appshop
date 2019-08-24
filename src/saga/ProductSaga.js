// phu trach lang nghe nguoi dung de tra du lieu ve ProductsComponent 
//  hoac post du lieu tu ProductComponent len 
import * as Types from '../actions/actionTypes';
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import Api from './Api';

// tao cac saga de thuc hien nhiem vu.
function* FetchProducts(){
    console.log("FetchProducts");
    let isLoading = false;
    
    try {
        // lay products cua ben api tra ve
        const products = yield Api.getProducts();
        // neu yield tren thuc hien thanh cong thi chay yield duoi
        // du lieu lay thanh cong thi dispatch action.
        yield put({type:Types.FETCH_SUCCESS_PRODUCTS,products,isLoading});
        // sau khi chay products se duoc productReducer lay ra.
    } catch (error) {
        // neu khong lay duoc du lieu
        yield put({type:Types.FETCH_FAIL_PRODUCTS,error,isLoading});
    }
}

// lang nghe nguoi dung de chay saga tuong ung.
export function* getProductsTask(){
    console.log('dang lang nghe');
    
    // lang nghe neu nguoi dung muon Types.SHOW_PRODUCT
    yield takeEvery(Types.SHOW_PRODUCT,FetchProducts);
}