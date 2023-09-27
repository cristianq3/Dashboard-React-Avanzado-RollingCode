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
    const token = localStorage.getItem('tokenAuth');
      if (!token) {
        return dispatch({
          type: types.auth.logout,
          payload: {
            errorMessage: '',
            // isLoading: false,
          },
        });
      }
      const { data } = await dashAxios.get(`auth/revalidatetoken`);

      localStorage.setItem('tokenAuth', data.token);

      dispatch({
        type: types.auth.login,
        payload: {
          user: data,
        },
      });
    // const token = localStorage.getItem("tokenAuth")
    // console.log(token)
    // if(token !== null) {
    //     const { data } = await dashAxios.get('auth/revalidatetoken')
    //     console.log(data)
    //     localStorage.getItem("tokenAuth", data.token);
    //     return dispatch({
    //         type: types.auth.logout,
    //         payload: {
    //           errorMessage: "",
    //           isLoading: false,
    //         },
    //       });
    // }
    // dispatch({
    //     type: types.auth.login,
    //     payload: {
    //       user: userData,
    //     },
    //   });
//----------
    // if (!token) {
    //   return dispatch({
    //     type: types.auth.logout,
    //     payload: {
    //       errorMessage: "",
    //       isLoading: false,
    //     },
    //   });
    // }
 
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
      console.log(error)
      const data  = error.response.data.mensaje;
      console.log('data', data)
      dispatch({
        type: types.auth.logout,
        payload: {
          errorMessage: data,
        },
      });
    }
    //     console.log(email, password)
    //     const userData = {
    //         name: 'Cristian',
    //         lastName: 'Quiroga',
    //         email: 'cristian@gmail.com',
    //         token: '1A23Ad'
    //     }
    //    localStorage.setItem('tokenAuth', userData.token)
    //    console.log(localStorage.getItem('tokenAuth'))

    //     dispatch({
    //         type: types.auth.login,
    //         payload: {
    //             user: userData
    //         }
    //     })
  };
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
    localStorage.removeItem("tokenAuth");
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
