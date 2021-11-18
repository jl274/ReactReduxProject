import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import movieReducer from './reducers/MoviesReducer.js';
import directorsReducer from './reducers/DirectorsReducer';
import actorReducer from "./reducers/ActorReducer";
import { togglingReducer } from './reducers/TogglerReducer';
import logger from 'redux-logger';

const store = createStore(
  combineReducers({
    movies: movieReducer,
    directors: directorsReducer,
    actors: actorReducer,
    toggler: togglingReducer
  }),
  applyMiddleware(logger)
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
