import { types } from "../types/types";

export const AuthReducer = (state={}, action) => {
    switch (action.type) {
        case types.auth.login:
            return {
                ... state,
                user: action.payload.user,
                isLogged: true,
                errorMessage: ''
            };
        
        case types.auth.logout:
            return {
                    ...state,
                    user: null,
                    isLogged: false,
                    errorMessage: action.payload.errorMessage
                };    
        
        default:
            return state;
    }
    
}