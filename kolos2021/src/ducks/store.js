import { applyMiddleware, combineReducers, createStore } from "redux";
import { createMiddleware } from "redux-api-middleware";
import logger from "redux-logger";
import thunk from "redux-thunk";
// import { notesReducer } from "./notes/reducers";
// import { todoReducer } from "./todos/reducers";

export const store = createStore(
    combineReducers({
    }), applyMiddleware(thunk, createMiddleware() ,logger)
)
