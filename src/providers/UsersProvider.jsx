import { useReducer } from "react";
import { UsersContext } from "../contexts/UsersContext";
import { types } from "../types/types";
import { dashAxios } from "../config/dashAxios";
import { UsersReducer } from "../reducers/UsersReducer";

const initialState = {
    users: [],
    errorMessage: "",
    isLoading: true,
  };

  export const UsersProvider = ({children}) => {
 
    const [state, dispatch] = useReducer(UsersReducer, initialState) 

    // TODO: hacer las consultas del CRUD con el backend
    const getListUsers = async () => {
        try {
            const { users } = await dashAxios.get('auth/')
            console.log(users)
            // dispatch({
            //     type: types.users.getListUsers,
            //     payload: {
            //         users
            //     }
            // })

        } catch(error) {
            console.log(error)
        }
    }

    return (
        <UsersContext.Provider
        value={{
            state,
            getListUsers
          }}>
            {children}
        </UsersContext.Provider>
    )
  }