import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import { counterReducer } from './counter/reducers';

export const store = createStore(
  combineReducers({
    counter1: counterReducer
  }),
  applyMiddleware(logger)
);