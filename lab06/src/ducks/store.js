import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import { usersReducer } from './users/reducers';
import thunk from 'redux-thunk';
import { createMiddleware } from 'redux-api-middleware'
import { productsReducer } from './products/reducer';
import { cartReducer } from './cart/reducers';
import { togglingReducer } from './toggler/reducer';

export const store = createStore(
  combineReducers({
      users: usersReducer,
      products: productsReducer,
      carts: cartReducer,
      toggler: togglingReducer
  }),
  applyMiddleware(thunk, createMiddleware(), logger)
);