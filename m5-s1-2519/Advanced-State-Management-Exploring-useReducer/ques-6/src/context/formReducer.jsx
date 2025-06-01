export const forminitialState={
    email:"",
    password:"",
};


export function formReducer(state,action){
    switch(action.type){
        case "email":
            return{
                ...state,
                email:action.payload
            }
        case "password":
            return {
                ...state,
                password:action.payload
            }
        case 'reset':
            return forminitialState

        default:
           throw new Error("invalid action type")
    }
}