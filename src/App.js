import React from 'react';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware } from 'redux';
import AppNavigator from './components/AppNavigators/AppNavigator';
import rootReduccer from './reducers/rootReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga/rootSaga';
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReduccer,applyMiddleware(sagaMiddleware));

const App = () => {
  return (
    <Provider store = {store}>
      <AppNavigator></AppNavigator>
    </Provider>
  );
};
sagaMiddleware.run(rootSaga);

export default App;
