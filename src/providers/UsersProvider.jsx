import { useReducer } from "react";
import { UsersContext } from "../contexts/UsersContext";
import { types } from "../types/types";
import { dashAxios } from "../config/dashAxios";
import { UsersReducer } from "../reducers/UsersReducer";

const initialState = {
  users: [],
  userSelected: {},
  errorMessage: "",
  isLoading: true,
  isLoadingUserSelected: true
};

export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UsersReducer, initialState);
  // TODO: hacer las consultas del CRUD con el backend

  const getListUsers = async () => {
    try {
      const { data } = await dashAxios.get("auth/");
      dispatch({
        type: types.users.getListUsers,
        payload: {
            ...state,
          users: data,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async (id) => {
    try {
      const  {data}  = await dashAxios.get(`auth/${id}`)
      console.log('usuario seleccionado', data)
      dispatch({
        type: types.users.getUser,
        payload: {
            ...state,
          userSelected: data
        },
        
      });
    } catch (error) {
      console.log(error)
    }
  } 

  const createUser = async ({firstname, lastname, email, password, role, status, image}) => {
    try {
      console.log('CONSULTA', firstname, lastname, email, password, role, status, image)
       await dashAxios.post("auth/new", {
        firstname,
        lastname,
        email,
        password,
        role,
        status,
        image,
      });

      dispatch({
        type: types.users.createUser,
        payload: {
          ...state,
          errorMessage: '',
          
        },

      });
    } catch (error) {
    //   console.log(error);
      const msg = error.response.data.errores[0].msg
      console.log('ERROR', msg)
      dispatch({
        type: types.users.createUser,
        payload: {
          errorMessage: msg,
        },
      });
    }
  };

  const editUser = async ({firstname, lastname, email, role, status, id}) => {
    try {
      const { data } = await dashAxios.put(`auth/${id}`, {firstname, lastname, email, role, status});
      console.log(data)
      dispatch({
        type: types.users.editUser,
        payload: {
          ...state,
          errorMessage: '',
          // isLoadingUserSelected: false
        },
      })
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
       await dashAxios.delete(`auth/${id}`);
      dispatch({
        type: types.users.deleteUser,
        payload: {
          ...state,
          errorMessage: '',
        },
      })

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UsersContext.Provider
      value={{
        state,
        ...state,
        getListUsers,
        getUser,
        createUser,
        deleteUser,
        editUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
