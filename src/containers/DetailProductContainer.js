import DetailProduct from '../components/screens/Home/DetailProduct';
import { connect } from 'react-redux'
import rootAction from '../actions/rootAction';

const mapStateToProps = (state, ownProps) => {
    return {
        product: state.ProductReducer.products,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailProduct);