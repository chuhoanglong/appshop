import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AppStack from './AppStack';
import AuthLoading from '../Login/AuthLoading';
import LoginStack from './LoginStack';

const AppNaviator = createSwitchNavigator({
    Auth: {
        screen: AuthLoading
    },
    Home: {
        screen: AppStack
    },
    Login: {
        screen: LoginStack
    }
})

export default createAppContainer(AppNaviator);