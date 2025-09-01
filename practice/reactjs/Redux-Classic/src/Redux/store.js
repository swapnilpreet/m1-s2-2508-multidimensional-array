import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { CounterReducer } from "./counterReducer";
import { UserReducer } from "./userReducer";

const rootReducer=combineReducers({
    counter:CounterReducer,
    users:UserReducer
})

export const store = createStore(rootReducer,applyMiddleware(thunk));