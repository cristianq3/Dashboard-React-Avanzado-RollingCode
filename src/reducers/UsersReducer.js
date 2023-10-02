import { types } from "../types/types";

export const UsersReducer = (state={}, action) => {
    switch (action.type) {
        case types.users.getListUsers:
            return {
                ...state,
                users: action.payload.users,
                errorMessage: '',
                isLoading: false
            };
        
        // case types.auth.logout:
        //     return {
        //             ...state,
        //             user: null,
        //             isLogged: false,
        //             errorMessage: action.payload.errorMessage,
        //             isLoading: false
        //         };    
        
        // case types.auth.registerUser:
        //     return {
        //         // ...state,
        //     }        

        default:
            return state;
    }
    
}