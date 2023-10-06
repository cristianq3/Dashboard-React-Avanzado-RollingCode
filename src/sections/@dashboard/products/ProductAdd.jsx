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
import { ProductContext } from "../../../contexts/ProductContext";

// ----------------------------------------------------------------------

const schema = Yup.object().shape({
  productName: Yup.string().required(
    "Debes ingresar un nombre"
  ),
  price: Yup.string().required("Debes ingresar el precio"),
  stock: Yup.string().required("Debes ingresar el stock"),
  category: Yup.string().required(
    "Debes seleccionar una categoría"
  ),
  detail: Yup.string().required(
    "Debes ingresar una descripción "
  ),
});

export default function ProductAdd() {
  const { state, addProduct, getListCategories } = useContext(ProductContext);

  useEffect(() => {
    getListCategories();
    console.log(state.categories);
  }, [state.isLoading]);


  const { handleChange, handleSubmit, errors, values, setFieldValue, touched } =
    useFormik({
      initialValues: {
        productName: "",
        price: "",
        stock: "",
        status: "Activo",
        category: "",
        detail: "",
        image: "",
      },
      validationSchema: schema,

      onSubmit: (values, { resetForm }) => {
        console.log("enviando formulario");
        // console.log(values);
        addProduct(values)
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
            Agregar producto
          </Typography>

          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* Nombre del producto */}
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  name="productName"
                  type="text"
                  required
                  fullWidth
                  id="productName"
                  label="Nombre del producto"
                  autoComplete="off"
                  value={values.productName}
                  error={
                    touched.productName && errors.productName ? true : false
                  }
                  helperText={touched.productName && errors.productName}
                  onChange={handleChange}
                />
              </Grid>
              {/* Precio */}
              <Grid item xs={12} sm={6}>
                <TextField
                  name="price"
                  required
                  fullWidth
                  id="price"
                  label="Precio"
                  autoComplete="off"
                  value={values.price}
                  error={touched.price && errors.price ? true : false}
                  helperText={touched.price && errors.price}
                  onChange={handleChange}
                />
              </Grid>
              {/* Stock */}
              <Grid item xs={12} sm={6}>
                <TextField
                  name="stock"
                  required
                  fullWidth
                  id="stock"
                  label="Stock"
                  autoComplete="off"
                  value={values.stock}
                  error={touched.stock && errors.stock ? true : false}
                  helperText={touched.stock && errors.stock}
                  onChange={handleChange}
                />
              </Grid>
              {/* Categoría */}
              <Grid item xs={12} sm={6}>
                <Box>
                  <FormControl fullWidth>
                    <InputLabel id="category">Categoría</InputLabel>
                    <Select
                      name="category"
                      labelId="category"
                      id="category"
                      value={values.category}
                      label="Categoría"
                      onChange={(e) => {
                        setFieldValue("category", e.target.value);
                      }}
                      required
                    >
                      {state.categories.map((categoria) => (
                        <MenuItem key={categoria._id} value={categoria.categoryName}>
                          {categoria.categoryName}
                        </MenuItem>
                      ))}
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
                      value={values.status}
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
              {/* Descripción */}
              <Grid item xs={12}>
                <TextField
                  name="detail"
                  type="multiline"
                  maxRows={3}
                  required
                  fullWidth
                  id="detail"
                  label="Descripción"
                  autoComplete="off"
                  value={values.detail}
                  error={touched.detail && errors.detail ? true : false}
                  helperText={touched.detail && errors.detail}
                  onChange={handleChange}
                />
              </Grid>
              {/* Imagen */}
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
            type="button"
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
