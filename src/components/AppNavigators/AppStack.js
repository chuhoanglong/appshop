import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import IconWithBadge from '../Anima/IconWithBadge';
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import HomeContainer from '../../containers/HomeContainer';
import ProductContainer from '../../containers/ProductContainer';
import CartContainer from '../../containers/CartContainer';
import BuyCart from '../../components/screens/Cart/buyCart';
import UserComponent from '../UserManager/UserComponent';

const homeStack = createStackNavigator(
    {
        Home: {
            screen: HomeContainer
        },
        Products: {
            screen: ProductContainer
        }
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);
homeStack.navigationOptions = {
    tabBarLabel: 'HOME',
    tabBarIcon: ({ focused }) => <Ionicons name={'home'} size={25} color={focused ? '#147efb' : 'black'} />
}
const cartStack = createStackNavigator({
    Cart: {
        screen: CartContainer
    },
    BuyCart: {
        screen: BuyCart
    }
});
cartStack.navigationOptions = {
    tabBarLabel: 'CART',
    tabBarIcon: ({ focused }) => <IconWithBadge name={'cart-plus'} size={23} color={focused ? '#147efb' : 'black'} />
}

const userManagerStack = createStackNavigator({
    USER: {
        screen: UserComponent
    }
});
userManagerStack.navigationOptions = {
    tabBarLabel: 'USER',
    tabBarIcon: ({ focused }) => <Ionicons name={'user'} size={25} color={focused ? '#147efb' : 'black'}></Ionicons>
}

export default createBottomTabNavigator(
    {
        homeStack,
        cartStack,
        userManagerStack
    },
    {
        tabBarOptions: {
            resetOnBlur: true,
            keyboardHidesTabBar: true
        }

    }
);