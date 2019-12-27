import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import AppNavigator from './components/AppNavigators/AppNavigator';
import SplashScreen from 'react-native-splash-screen';
import rootReduccer from './reducers/rootReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga/rootSaga';
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReduccer, applyMiddleware(sagaMiddleware));

export default class App extends React.Component {
  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
  }
  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <AppNavigator></AppNavigator>
      </Provider>
    );
  }
};
sagaMiddleware.run(rootSaga);


