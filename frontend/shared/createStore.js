import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import client from '../config/components/apolloConfig';

export default () => {
  const middlewares = [];
  if (process.env.DEPLOYMENT === 'development') {
    middlewares.push(logger);
  }
  middlewares.push(thunk);
  middlewares.push(client.middleware());

  return createStore(rootReducer, applyMiddleware(...middlewares));
};
