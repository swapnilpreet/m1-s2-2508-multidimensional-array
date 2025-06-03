import { combineReducers, createStore } from 'redux';
import booksReducer from './booksReducer';
import filterReducer from './filterReducer';

const rootReducer = combineReducers({
  books: booksReducer,
  filters: filterReducer,
});

const store = createStore(rootReducer);
export default store;

