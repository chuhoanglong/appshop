import { connect } from 'react-redux';
import { addToCartTask } from '../actions/rootAction';
import ProductComponent from '../components/screens/Home/ProductComponent';

const mapStateToProps = (state) => {
    return {
        products: state.ProductReducer.products,
        isLoading: state.ProductReducer.isLoading,
        carts: state.CartReducer.carts
        // add more than sate here
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: product => {
            return dispatch(addToCartTask(product));
        },
        // add more than dispatch here
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductComponent);