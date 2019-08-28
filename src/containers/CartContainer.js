import { connect } from 'react-redux';
import CartsComponent from '../components/screens/Cart/CartsComponent';
import { changeSize } from '../actions/rootAction';

const mapStateToProps = state => {
    return {
        carts: state.CartReducer.carts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeSize: newCarts => {
            dispatch(changeSize(newCarts));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartsComponent);