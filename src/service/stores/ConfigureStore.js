import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/Index';
import createSagaMiddleware from 'redux-saga';
import middlewareRoot from '../middleware/Middleware';

export const configureStore = (initialState) => {
  
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares),
  );

  sagaMiddleware.run(middlewareRoot);

  return store;
};
