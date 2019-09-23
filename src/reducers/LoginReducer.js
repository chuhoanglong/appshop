import * as Types from '../actions/actionTypes';

const initalState = {
    status: 500,
    user: [],
    message: '',
}

const LoginReducer = (state = initalState, action) =>{
    switch (action.type) {
        case Types.FEETCH_SUCCESS_LOGIN:{
            return{
                ...state,
                status: action.status,
                message: action.message
            }
        }
        case Types.FEETCH_FAILD_LOGIN:{
            return{
                ...state,
                status: action.status,
                message: action.message
            }
        }
        default: return state
    }
}

export default LoginReducer;