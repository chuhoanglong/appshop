import { connect } from 'react-redux';
import ProductComponent from '../components/screens/Home/ProductComponent';
// import {getProductsTask} from '../actions/rootAction';

const mapStateToProps = (state) => {
    return{
        products: state.ProductReducer.products,
        isLoading: state.ProductReducer.isLoading
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductComponent);