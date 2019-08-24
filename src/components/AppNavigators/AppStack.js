import React from 'react';
import {createStackNavigator,createBottomTabNavigator,createAppContainer} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import HomeContainer from '../../containers/HomeContainer';
import ProductContainer from '../../containers/ProductContainer';
import CartsComponent from '../screens/Cart/CartsComponent';
const homeStack = createStackNavigator({
    Home:{
        screen:HomeContainer
    },
    Products:{
        screen: ProductContainer
    }
});
homeStack.navigationOptions={
    tabBarLabel:'HOME',
    tabBarIcon: ({focused})=><Ionicons name={'home'} size={25} color={focused ? '#147efb' : 'black'}/>
}
const cartStack = createStackNavigator({
    Cart:{
        screen: CartsComponent
    }
});
cartStack.navigationOptions={
    tabBarLabel:'CART',
    tabBarIcon: ({focused})=><Ionicons name={'cart-plus'} size={25} color={focused ? '#147efb' : 'black'}/>    
}
export default createBottomTabNavigator({homeStack,cartStack});