import { useReducer } from "react";
import { AuthContext } from "../contexts/AuthContext";
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
  // userToken: null,
  errorMessage: "",
  isLoading: true,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const registerUser = (firstname, lastname, email, password) => {
    // aqui va el post del registro
    // una vez registrado, se logea
    dispatch({
      type: types.auth.login,
      payload: {
        user: {
          firstname,
          lastname,
          email,
          password,
        },
      },
    });
  };

  const checkAuthToken = async () => {
    try {
      const token = localStorage.getItem('tokenAuth');
      if (!token) {
        return dispatch({
          type: types.auth.logout,
          payload: {
            errorMessage: '',
          },
        });
      }
      const { data } = await dashAxios.get(`auth/revalidatetoken`);
      localStorage.setItem('tokenAuth', data.res.token);
      //console.log(data,'data')
      dispatch({
        type: types.auth.login,
        payload: {
          user: data.res,
        },
      });
    } catch (error) {
      localStorage.removeItem('tokenAuth')
      dispatch({
        type: types.auth.logout,
        payload: {
          errorMessage: '',
        },
      });
    }
 
  };

  const login = async (email, password) => {
    try {
      const { data } = await dashAxios.post("auth/login", {
        email,
        password,
      });
      localStorage.setItem("tokenAuth", data.token);
      dispatch({
        type: types.auth.login,
        payload: {
          user: data,
        },
      });
    } catch (error) {
      const { msg }  = error.response.data.errores[0];
      dispatch({
        type: types.auth.logout,
        payload: {
          errorMessage: msg,
    
        },
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('tokenAuth')
    dispatch({
      type: types.auth.logout,
      payload: { errorMessage: "" },
    
    });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
        registerUser,
        checkAuthToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
