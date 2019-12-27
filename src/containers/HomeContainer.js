import HomeComponent from '../components/screens/Home/HomeComponent';
import { connect } from 'react-redux'
import { showProductTask, getCarts } from '../actions/rootAction';
const mapStateToProps = state => {
    return {
        categorys: state.HomeReducer.categorys
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showProductTask: (isLoading,category) => {
            dispatch(showProductTask(isLoading,category));
        },
        getCarts: ()=>{
            dispatch(getCarts());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
