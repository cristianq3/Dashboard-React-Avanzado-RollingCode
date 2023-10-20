import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// @mui
import {
  Container,
  Box,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import { LoadingButton } from "@mui/lab";
// components
import { UsersContext } from "../../../contexts/UsersContext";
//import { VALID_PASSWORD_REGEX } from "../../../helpers/regExp";
import { useNavigate, useParams } from "react-router-dom";

// ----------------------------------------------------------------------

const schema = Yup.object().shape({

  firstname: Yup.string()
  .min(3, 'El nombre debe tener al menos 3 caracteres')
  .max(30, 'El nombre no debe superar los 30 caracteres')
  .required("Debes ingresar el nombre del usuario"),
  
  lastname: Yup.string()
  .min(3, 'El apellido debe tener al menos 3 caracteres')
  .max(40, 'El apellido no debe superar los 40 caracteres')
  .required("Debes ingresar el apellido del usuario"),
  
  email: Yup.string()
  .min(5, 'El email debe tener al menos 5 caracteres')
  .max(80, 'El email no debe superar los 60 caracteres')
  .email()
  .required("Debes ingresar un correo electrónico"),
  
  role: Yup.string()
  .required("Debes seleccionar un Rol"),
  
  status: Yup.string()
  .required("Debe seleccionar un Estado")
});

export default function EditUserForm() {
  const { getUser, userSelected, isLoadingUserSelected, editUser, state } = useContext(UsersContext);
  const [userEdited, setUserEdited] = useState(true)
  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    setUserEdited(false);
    getUser(id)
    if (userSelected) {
      setValues({
        email: userSelected.email,
        firstname: userSelected.firstname,
        lastname: userSelected.lastname,
        status: userSelected.status,
        role: userSelected.role,
      });
    }
  }, [])

  useEffect(() => {
    // getUser(id)
    if (!isLoadingUserSelected && userSelected) {
      setValues({
        email: userSelected.email,
        firstname: userSelected.firstname,
        lastname: userSelected.lastname,
        status: userSelected.status,
        role: userSelected.role,
      });
    }
  }, [isLoadingUserSelected, userSelected]);

  // ----------------
  // useEffect(() => {
  //   getListUsers();
  //   console.log(state.users);
  // }, [isLoading]);

  // useEffect(() => {
  //   setUserDeleted(false);
  //   console.log(state.users)
  // }, [userDeleted])



  const { handleChange, handleSubmit, errors, values, setFieldValue, touched, setValues } =
    useFormik({
      initialValues: {
        email: '',
        firstname: '',
        lastname: '',
        status: '',
        role: '',
      },
      validationSchema: schema,

      onSubmit: (values, { resetForm }) => {
        console.log("enviando formulario");
        setUserEdited(true)
        console.log({...values,id})
        editUser({...values,id})
        resetForm();
        setValues({
          email: '',
          firstname: '',
          lastname: '',
          status: '',
          role: '',
        })

        if(state.errorMessage === "") {
          navigate('/dashboard/user')
        }
         
      },
    });
   


  return (
    <>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AddTwoToneIcon />
          </Avatar>

          <Typography variant="h4" gutterBottom>
            Editar Usuario
          </Typography>

          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* Nombre del producto */}
              <Grid item xs={12} sm={6}>
                <TextField
                  autoFocus
                  name="firstname"
                  type="text"
                  required
                  fullWidth
                  id="firstname"
                  label="Nombre del Usuario"
                  autoComplete="off"
                  value={values.firstname || ''}
                  error={
                    touched.firstname && errors.firstname ? true : false
                  }
                  helperText={touched.firstname && errors.firstname}
                  onChange={handleChange}
                />
              </Grid>
              {/* Precio */}
              <Grid item xs={12} sm={6}>
                <TextField
                  name="lastname"
                  required
                  fullWidth
                  id="lastname"
                  label="Apellido de Usuario"
                  autoComplete="off"
                  value={values.lastname || ''}
                  error={touched.lastname && errors.lastname ? true : false}
                  helperText={touched.lastname && errors.lastname}
                  onChange={handleChange}
                />
              </Grid>
              {/* Email */}
              <Grid item xs={12}>
              <TextField
                  name="email"
                  required
                  fullWidth
                  id="email"
                  label="Email de usuario"
                  autoComplete="off"
                  value={values.email || ''}
                  error={touched.email && errors.email ? true : false}
                  helperText={touched.email && errors.email}
                  onChange={handleChange}
                />
              </Grid>
              {/* Rol */}
              <Grid item xs={12} sm={6}>
                <Box>
                  <FormControl fullWidth>
                    <InputLabel id="role">Rol</InputLabel>
                    <Select
                      name="role"
                      labelId="role"
                      id="role"
                      value={values.role || ''}
                      label="Rol"
                      onChange={(e) => {
                        setFieldValue("role", e.target.value);
                      }}
                      required
                    >
                      <MenuItem value="Administrador">Administrador</MenuItem>
                      <MenuItem value="Cliente">Cliente</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              {/* Estado */}
              <Grid item xs={12} sm={6}>
                <Box>
                  <FormControl fullWidth>
                  <InputLabel id="status">Estado</InputLabel>
                    <Select
                      name="status"
                      labelId="status"
                      id="status"
                      value={values.status || ''}
                      label="Estado"
                      onChange={(e) => {
                        setFieldValue("status", e.target.value);
                      }}
                      required
                    >
                      
                      <MenuItem value="Activo">Activo</MenuItem>
                      <MenuItem value="Inactivo">Inactivo</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              
              {/* Imagen */}
              {/* <Grid item xs={12}>
                <TextField
                  name="image"
                  type="file"
                  required
                  fullWidth
                  id="image"
                  autoComplete="off"
                  value={values.image}
                  error={touched.image && errors.image ? true : false}
                  helperText={touched.image && errors.image}
                  onChange={handleChange}
                />
              </Grid> */}
            </Grid>
          </Box>
          <LoadingButton
            sx={{ mt: 3 }}
            size="large"
            type="button"
            variant="contained"
            onClick={handleSubmit}
          >
            Editar
          </LoadingButton>
        </Box>
      </Container>
    </>
  );
}
