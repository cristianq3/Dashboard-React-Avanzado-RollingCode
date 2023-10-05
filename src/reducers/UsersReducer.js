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

        case types.users.createUser:
            return {
                ...state,
                users: action.payload.users,
                errorMessage: "",
                isLoading: false,
            };

        case types.users.editUser:
            return {
                ...state,
                users: action.payload.users,
                errorMessage: "",
                isLoading: false,
            };    
        case types.users.deleteUser:
            return {
                ...state,
                users: action.payload.users,
                errorMessage: "",
                isLoading: false,
            } 
        
        //TODO: getUser y changePassword

        default:
            return state;
    }
    
}