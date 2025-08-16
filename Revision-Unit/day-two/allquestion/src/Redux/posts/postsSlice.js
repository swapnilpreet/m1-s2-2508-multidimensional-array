import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const postsSlice=createSlice({
    name:"posts",
    initialState:{
        posts:[],
        status:"idle",
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchPosts.pending,(state)=>{
            state.status='loading'
        })
        .addCase(fetchPosts.fulfilled,(state,action)=>{
            state.status='succeeded';
            state.posts=action.payload;
        })
        .addCase(fetchPosts.rejected,(state,action)=>{
            state.status='failed';
            state.error=action.error.message;
        })
    }
})

export const fetchPosts=createAsyncThunk(
    "posts/fetchPosts",
    async ()=>{
        const response=await fetch('https://jsonplaceholder.typicode.com/posts');
        const data=await response.json();
        return data;
    }
)

export default postsSlice.reducer;