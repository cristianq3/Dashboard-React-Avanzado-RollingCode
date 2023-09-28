import { useContext, useState } from "react";
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
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import { LoadingButton } from "@mui/lab";
import { FormHelperText } from "@mui/material";
// components
import Iconify from "../../../components/iconify";
import { ProductContext } from "../../../contexts/ProductContext";

// ----------------------------------------------------------------------

const schema = Yup.object().shape({
  nombreProducto: Yup.string().required("Debes ingresar un nombre"),
  idCategoria: Yup.number().required("Debes seleccionar una categoría"),
});

export default function ProductAdd() {
  const { addProduct } = useContext(ProductContext);
  const { handleChange, handleSubmit, errors, values, setFieldValue, touched } =
    useFormik({
      initialValues: {
        nombreProducto: "",
        idCategoria: null,
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
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AddTwoToneIcon />
          </Avatar>

          <Typography variant="h4" gutterBottom>
            Agregar producto
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  name="nombreProducto"
                  type="text"
                  required
                  fullWidth
                  id="nombreProducto"
                  label="Nombre del producto"
                  autoComplete="off"
                  value={values.nombreProducto}
                  error={
                    touched.nombreProducto && errors.nombreProducto
                      ? true
                      : false
                  }
                  helperText={touched.nombreProducto && errors.nombreProducto}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoFocus
                  name="price"
                  type="number"
                  required
                  fullWidth
                  id="price"
                  label="Precio"
                  autoComplete="off"
                  value={values.price}
                  error={
                    touched.price && errors.price
                      ? true
                      : false
                  }
                  helperText={touched.price && errors.price}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoFocus
                  name="stock"
                  type="number"
                  required
                  fullWidth
                  id="stock"
                  label="Stock"
                  autoComplete="off"
                  value={values.stock}
                  error={
                    touched.stock && errors.stock
                      ? true
                      : false
                  }
                  helperText={touched.stock && errors.stock}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box >
                  <FormControl fullWidth>
                    <InputLabel id="idCategoria">Categoría</InputLabel>
                    <Select
                      name="idCategoria"
                      labelId="idCategoria"
                      id="idCategoria"
                      value={values.idCategoria}
                      label="Categoría"
                      onChange={(e) => {
                        setFieldValue("idCategoria", e.target.value);
                      }}
                      required
                    >
                      <MenuItem value="1">Mujer</MenuItem>
                      <MenuItem value="2">Hombre</MenuItem>
                      <MenuItem value="3">Niños</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box >
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
                      <MenuItem value="activo">Activo</MenuItem>
                      <MenuItem value="inactivo">Inactivo</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  name="detalil"
                  type="text"
                  required
                  fullWidth
                  id="detalil"
                  label="Descripción"
                  autoComplete="off"
                  value={values.detalil}
                  error={
                    touched.detalil && errors.detalil
                      ? true
                      : false
                  }
                  helperText={touched.detalil && errors.detalil}
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
