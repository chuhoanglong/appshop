import { connect } from 'react-redux';
import CartsComponent from '../components/screens/Cart/CartsComponent';

const mapStateToProps = state => {
    return {
        carts: state.CartReducer.carts
    }
}

const mapDispatchToProps = dispatch => {
    return{

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CartsComponent);