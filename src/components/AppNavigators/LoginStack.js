
import { createStackNavigator } from 'react-navigation';

// import Screen
import Login from '../Login/LoginComponent';
import LoginComponent from '../../containers/LoginContainer';


// Stack Navigator for login
const loginStack = createStackNavigator(
    {
        Login: {
            screen: LoginComponent

        },
    },
    {
        initialRouteName: "Login",
        mode: 'modal',
        headerMode: 'none',
    }
);

export default loginStack;