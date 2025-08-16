
import {configureStore} from "@reduxjs/toolkit";
import postsReducer from './posts/postsSlice';

const Store=configureStore({
    reducer:{
        post:postsReducer,
    }
});

export default Store;