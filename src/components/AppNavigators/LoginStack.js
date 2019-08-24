
import { createStackNavigator } from 'react-navigation';

// import Screen
import Login from '../Login/LoginComponent';


// Stack Navigator for login
const loginStack = createStackNavigator(
    {
        Login: {
            screen: Login

        },
    },
    {
        initialRouteName: "Login",
        mode: 'modal',
        headerMode: 'none',
    }
);

export default loginStack;