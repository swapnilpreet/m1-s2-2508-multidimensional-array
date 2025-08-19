const fetchData = createAsyncThunk("user/fetchusers",async()=>{
    const response=await fetch("usrl");
    if(response){
        return response.jons();
    }else{
        throw new Error("swa")
    }
});


const userSlice=createSlice({
    name:"user",
    initialState:{
        user:[],
        error:null,
        status:"idle"
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchData.pending,(state)=>{
            state.status="pending"
        })
        .addCase(fetchData.fulfilled,(state,action)=>{
            state.user=action.paylod;
            state.status="completed"
        })
        .addCase(fetchData.rejected,(state,action)=>{
            state.error=action.error.message;
        })
    }

})

