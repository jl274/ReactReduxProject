import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger';

export const store = createStore(
  combineReducers({
      
  }),
  applyMiddleware(logger)
);