
import { createStackNavigator } from 'react-navigation';

// import Screen
import LoginComponent from '../../containers/LoginContainer';
import SigupComponent from '../Login/SigupComponent';

// Stack Navigator for login
const loginStack = createStackNavigator(
    {
        Login: {
            screen: LoginComponent

        },
        Sigup:{
            screen: SigupComponent
        }
    },
    {
        initialRouteName: "Login",
        mode: 'modal',
        headerMode: 'none',
    }
);

export default loginStack;