

import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';

const postsSlice=createSlice({
    name:"posts",
    initialState:{
        posts:[],
        status:"idle",
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchPosts.pending,(state)=>{
            state.status="loading";
            state.error=null;
        }).addCase(fetchPosts.fulfilled,(state,action)=>{
            state.status="Succeeded";
            state.posts=action.payload;
        }).addCase(fetchPosts.rejected,(state,action)=>{
            state.status="failed";
            state.error=action.error.message
        })
    }
})

export default postsSlice.reducer;



export const fetchPosts=createAsyncThunk("posts/fetchPosts",async()=>{
    try {
        const res=await fetch("https://jsonplaceholder.typicode.com/posts");
        if(!res){
            throw new Error("failed to fetch data");
        }
        const data=await res.json();
        return data;
    } catch (error) {
        return error;
    }
})