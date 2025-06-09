import { combineReducers, createStore } from "redux";
import pokemonReducer from "../features/pokemon/pokemonSlice";



const rootReducer= combineReducers({
    pokemon:pokemonReducer,
})

export const store = createStore(rootReducer)