import { useReducer } from "react";
import { AuthContext } from "../contexts/AuthContext"
import { AuthReducer } from "../reducers/AuthReducer";
import { types } from "../types/types";
import { dashAxios } from "../config/dashAxios";

const initialState = {
    isLogged: false,
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
            name: 'Cristian',
            lastName: 'Quiroga',
            email: 'cristian@gmail.com',
            token: '1A23Ad'
        }

        dispatch({
            type: types.auth.login,
            payload: {
                user: userData
            }
        })
    }
//------para cuando tengamos la BD
    // const login = async (email, password) =>{
    //     try {
    //     const {data} = await dashAxios.post('auth', {
    //      email: email,
    //      password: password
    //     });
    //     dispatch({
    //         type:  types.auth.login,
    //         payload:  {
    //             user: data.res
    //         }
    //     });
    // } catch (error) {
    //     const { data }  = error.response

    //     dispatch({
    //         type: types.auth.logout,
    //         payload: {
    //             errorMessage: data.msg
    //         }
    //     })
    // }
    // }

    const logout = () => {
        dispatch({
            type: types.auth.logout,
            payload: {errorMessage:''}
            
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