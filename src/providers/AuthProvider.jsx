import { useReducer } from "react";
import { AuthContext } from "../contexts/AuthContext"
import { AuthReducer } from "../reducers/AuthReducer";
import { types } from "../types/types";

const initialState = {
    isLogged: true,
    user: null,
  //  userInfo: {
    //   id: null,
    //   username: null,
    //   email: null,
    //   password: null,
    //   role: null,
    //   status: null,
  //  },
    userToken: null,
    errorMessage: '',
  };

export const AuthProvider = ({ children }) => {
    
    const [state, dispatch] = useReducer(AuthReducer, initialState)

    const login = ( email, password ) => {
    console.log(email, password)    
        const userData = {
            name: 'Juan',
            lastName: 'Perez',
            email: 'juan@gmail.com',
            token: 'vkjmnfvkl'
        }

        dispatch({
            type: types.auth.login,
            payload: {
                user: userData
            }
        })
    }
    const logout = () => {
        dispatch({
            type: types.auth.onLogout
        })
    }
    return (
        <AuthContext.Provider value={{
            state,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}