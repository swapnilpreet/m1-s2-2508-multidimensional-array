import { configureStore } from "@reduxjs/toolkit";

import postsreducer from "../redux/postsSlice";
import authreducer from '../redux/authSlice'
const store=configureStore({
    reducer:{
        posts:postsreducer,
        auth:authreducer,
    }
})

export default store;