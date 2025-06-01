export const toggleInitialState={
    isVisible:false,
}

export function toggleReducer(state,action){
    switch (action.type){
        case "TOGGLE_VISIBILITY":
            return {
                isVisible:state.isVisible===false ? true : false,
            }
        default :
            return state;
    }
}