export const countinitialState={
    count:0,
}

export function counterReducer (state,action){
    switch (action.type){
        case "Increment":
            return {
                count:state.count+1
            };
        case "Decrement":
            return {
                count:state.count-1
            }
        case "Reset":
            return {count:0}

        default :
            return state;
    }
}