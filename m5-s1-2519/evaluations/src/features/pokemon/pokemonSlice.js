const initialstate = {
  list: [],
  status: "idle",
  error: null,
  offset: 0,
  limit: 20,
  typeFilter: "",
  sort: "",
};

const pokemonReducer = (state = initialstate, action) => {
  switch (action.type) {
    case "pokemon/fetchPending":
      return { ...state, status: "loading", error: null };
    case "pokemon/fetchSuccess":
      return { ...state, status: "succeeded", list: action.payload };
    case "pokemon/fechFaild":
      return { ...state, status: "failed", error: action.payload };
    case "pokemon/settypeFilter":
      return { ...state, typeFilter: action.payload };
    case "pokemon/setsort":
      return { ...state, sort: action.payload };
    case "pokemon/nextPage":
      return { ...state, offset: state.offset + state.limit };
    case "pokemon/prevPage":
      return { ...state, offset: Math.max(0, state.offset - state.limit) };
    default:
      return state;
  }
};

export default pokemonReducer;

export const settypeFilter=(type)=>({type:"pokemon/settypeFilter",payload:type})
export const setSort=(setsort)=>({type:"pokemon/setsort",payload:setsort})
export const nextPage=()=>({type:"pokemon/nextPage"})
export const prevPage=()=>({type:"pokemon/prevPage"})
export const fetchPending=()=>({type:"pokemon/fetchPending"})
export const fetchSuccess=(data)=>({type:"pokemon/fetchSuccess",payload:data})
export const fechFaild=(error)=>({type:"pokemon/fechFaild",payload:error})