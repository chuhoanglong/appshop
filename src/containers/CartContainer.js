import { connect } from 'react-redux';
import CartsComponent from '../components/screens/Cart/CartsComponent';
import { changeSize, deleteProduct, paymentCart } from '../actions/rootAction';

const mapStateToProps = state => {
    return {
        carts: state.CartReducer.carts,
        uid: state.LoginReducer.user.uid
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeSize: newCarts => {
            dispatch(changeSize(newCarts));
        },
        onDeleteProduct: newCarts => {
            dispatch(deleteProduct(newCarts));
        },
        paymentCart: payload => {
            dispatch(paymentCart(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartsComponent);