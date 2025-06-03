import {combineReducers, createStore} from 'redux';
import { CounterReducer } from "./reducer";
import { todoReducer } from './todoReducer';

const rootReducer = combineReducers({
  counter: CounterReducer,
  todos: todoReducer,
});

export const store = createStore(rootReducer);