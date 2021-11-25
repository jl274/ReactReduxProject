import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import { usersReducer } from './users/reducers';
import thunk from 'redux-thunk';
import { createMiddleware } from 'redux-api-middleware'
import { productsReducer } from './products/reducer';

export const store = createStore(
  combineReducers({
      users: usersReducer,
      products: productsReducer
  }),
  applyMiddleware(thunk, createMiddleware(), logger)
);