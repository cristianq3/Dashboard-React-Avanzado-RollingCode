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
                errorMessage: action.payload.errorMessage,
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
            }; 
        case types.users.getUser:
            return {
                ...state,
                userSelected: action.payload.userSelected,
                errorMessage: "",
                isLoadingUserSelected: false
            }
        //TODO:  y changePassword

        default:
            return state;
    }
    
}