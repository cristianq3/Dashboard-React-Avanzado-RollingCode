import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// @mui
import {
  Alert,
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
import { UsersContext } from "../../../contexts/UsersContext";
import { VALID_PASSWORD_REGEX } from "../../../helpers/regExp";
import { Navigate, useNavigate } from "react-router-dom";

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
  
  password: Yup.string()
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .max(16, 'La contraseña no debe superar los 16 caracteres')
  .required('Debes ingresar una constraseña')
  .matches(VALID_PASSWORD_REGEX,
    'La contraseña debe tener como mìnimo 8 caracteres , al menos un número, una minúscula, una mayúscula y no contener caracteres especiales.',
),
  
  role: Yup.string()
  .required("Debes seleccionar un Rol"),
  
  status: Yup.string()
  .required("Debe seleccionar un Estado")
});

export default function CreateUserForm() {
  const { createUser, state, getListUsers } = useContext(UsersContext);
  const navigate = useNavigate()
  // const {categories, setCategories}= useState([])
  //no estoy pudiendo traer las categorias
  
  useEffect(() => {
    getListUsers()
  }, []);

  const { handleChange, handleSubmit, errors, values, setFieldValue, touched } =
    useFormik({
      initialValues: {
        email: "",
        firstname: "",
        lastname: "",
        status: "Activo",
        role: "",
        password: "",
        image: ""
      },
      validationSchema: schema,

      onSubmit: (values, { resetForm }) => {
        console.log(values);
        createUser(values);
        if(state.errorMessage === "") {
          navigate('/dashboard/user')
        }
        // resetForm();
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
            Agregar usuario
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>

            <Grid item xs={12} sm={6}>
                <TextField
                  autoFocus
                  name="firstname"
                  type="text"
                  required
                  fullWidth
                  id="firstname"
                  label="Nombre/s"
                  autoComplete="off"
                  value={values.firstname}
                  error={touched.firstname && errors.firstname ? true : false}
                  helperText={touched.firstname && errors.firstname}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="lastname"
                  type="text"
                  required
                  fullWidth
                  id="lastname"
                  label="Apellido/s"
                  autoComplete="off"
                  value={values.lastname}
                  error={touched.lastname && errors.lastname ? true : false}
                  helperText={touched.lastname && errors.lastname}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="email"
                  type="email"
                  required
                  fullWidth
                  id="email"
                  label="Correo electrónico"
                  autoComplete="off"
                  value={values.email}
                  error={
                    touched.email && errors.email ? true : false
                  }
                  helperText={touched.email && errors.email}
                  onChange={handleChange}
                />
              </Grid>
             
              <Grid item xs={12}>
                <TextField
                  name="password"
                  type="text"
                  required
                  fullWidth
                  id="password"
                  label="Contraseña"
                  autoComplete="off"
                  value={values.password}
                  error={touched.password && errors.password ? true : false}
                  helperText={touched.password && errors.password}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box>
                  <FormControl fullWidth>
                    <InputLabel id="role">Rol</InputLabel>
                    <Select
                      name="role"
                      labelId="role"
                      id="role"
                      value={values.role}
                      label="Rol"
                      onChange={(e) => {
                        setFieldValue("role", e.target.value);
                      }}
                      required
                    >
                      {/* {
                        categories.map((category) => {
                          <MenuItem key={category._id} value={category.categoryName}>
                            {category.categoryName}
                          </MenuItem>;
                        })} */}
                      <MenuItem value="Administrador">Administrador</MenuItem>
                      <MenuItem value="Cliente">Cliente</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box>
                  <FormControl fullWidth>
                  <InputLabel id="status">Estado</InputLabel>
                    <Select
                      name="status"
                      labelId="status"
                      id="status"
                      value={values.status}
                      label="Estado"
                      onChange={(e) => {
                        setFieldValue("status", e.target.value);
                      }}
                      required
                    >
                      {/* {
                        categories.map((category) => {
                          <MenuItem key={category._id} value={category.categoryName}>
                            {category.categoryName}
                          </MenuItem>;
                        })} */}
                      <MenuItem value="Activo">Activo</MenuItem>
                      <MenuItem value="Inactivo">Inactivo</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
           
              <Grid item xs={12}>
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
              </Grid>

            </Grid>
          </Box>
          <Grid  display={!!state.errorMessage ? '' : 'none'}>
            <Alert severity="error">{state.errorMessage}</Alert>
          </Grid>
          <LoadingButton
            sx={{ mt: 3 }}
            size="large"
            type="submit"
            variant="contained"
            onClick={handleSubmit}
          >
            Agregar
          </LoadingButton>
        </Box>
      </Container>
    </>
  );
}
