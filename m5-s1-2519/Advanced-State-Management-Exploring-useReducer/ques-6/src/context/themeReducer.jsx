export const initialState={
    theme:"Light",
}


export function themeReducer(state,action){
    switch(action.type){
        case "TOGGLE_THEME":
            return {
                ...state,
                theme:state.theme==='Light' ? 'Dark' :'Light',
            };
        default :
            return state
    }
}