import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { createMiddleware } from 'redux-api-middleware'
import { togglingReducer } from './toggler/reducer';
import { entities } from './entities/reducers';

export const store = createStore(
  combineReducers({
    entities: entities,
    toggler: togglingReducer
  }),
  applyMiddleware(thunk, createMiddleware(), logger)
);
