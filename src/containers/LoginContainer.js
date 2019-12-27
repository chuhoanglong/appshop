import LoginComponent from "../components/Login/LoginComponent";
import { userLogin } from '../actions/rootAction';
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
    return {
        status: state.LoginReducer.status,
        message: state.LoginReducer.message,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (user) => {
            dispatch(userLogin(user));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);