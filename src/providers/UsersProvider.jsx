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

  const createUser = async ({firstname, lastname, email, password, role, status, image}) => {
    try {
      console.log('CONSULTA', firstname, lastname, email, password, role, status, image)
      const { data } = await dashAxios.post("auth/new", {
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

  const editUser = async () => {
    try {
      const { data } = await dashAxios.put("auth/:id");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async () => {
    try {
      const { data } = await dashAxios.delete("auth/:id");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UsersContext.Provider
      value={{
        state,
        getListUsers,
        createUser
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
