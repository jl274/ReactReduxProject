import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import { usersReducer } from './users/reducers';
import thunk from 'redux-thunk';
import { createMiddleware } from 'redux-api-middleware'

export const store = createStore(
  combineReducers({
      users: usersReducer
  }),
  applyMiddleware(thunk, createMiddleware(), logger)
);