import { applyMiddleware, combineReducers, createStore } from "redux";
import { createMiddleware } from "redux-api-middleware";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { packReducer } from "./pack/reducers";


export const store = createStore(
    combineReducers({
        packs: packReducer
    }), applyMiddleware(thunk, createMiddleware() ,logger)
)
