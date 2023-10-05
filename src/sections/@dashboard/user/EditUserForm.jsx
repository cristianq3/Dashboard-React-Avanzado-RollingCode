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
import { UsersContext } from "../../../contexts/UsersContext";

//TODO: cambiar validaciones y corregir Name por name
const schema = Yup.object().shape({
  firstName: Yup.string().required("Debes ingresar el nombre del usuario"),
  lastName: Yup.string().required("Debes ingresar el apellido del usuario"),
  email: Yup.string().required("Debes ingresar un correo electrónico"),
  password: Yup.string().required("Debes ingresar una contraseña"),
  role: Yup.string().required("Debes seleccionar un Rol"),
  status: Yup.string().required("Debe seleccionar un Estado")
});

export default function EditUserForm() {
  const { getListUsers  } = useContext(UsersContext);
  // const {categories, setCategories}= useState([])
  //no estoy pudiendo traer las categorias
  useEffect(() => {
    // setCategories ( getListCategories());
    
  }, []);

  const { handleChange, handleSubmit, errors, values, setFieldValue, touched } =
    useFormik({
      initialValues: {
        email: "",
        firstName: "",
        lastName: "",
        status: "Activo",
        role: "",
        password: "",
      },
      validationSchema: schema,

      onSubmit: (values, { resetForm }) => {
        console.log(values);
        addProduct(values);
        resetForm();
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
            Editar usuario
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
                  name="firstName"
                  type="text"
                  required
                  fullWidth
                  id="firstName"
                  label="Nombre/s"
                  autoComplete="off"
                  value={values.firstName}
                  error={touched.firstName && errors.firstName ? true : false}
                  helperText={touched.firstName && errors.firstName}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="lastName"
                  type="text"
                  required
                  fullWidth
                  id="lastName"
                  label="Apellido/s"
                  autoComplete="off"
                  value={values.lastName}
                  error={touched.lastName && errors.lastName ? true : false}
                  helperText={touched.lastName && errors.lastName}
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