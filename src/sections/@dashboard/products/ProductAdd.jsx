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
  productName: Yup.string().required("Debes ingresar un nombre"),
  price: Yup.number().required("Debes ingresar el precio"),
  stock: Yup.number().required("Debes ingresar el stock"),
  category: Yup.number().required("Debes seleccionar una categoría"),
  detail: Yup.string().required("Debes ingresar una descripción "),
});

export default function ProductAdd() {
  const { addProduct, getListCategories } = useContext(ProductContext);
  // const {categories, setCategories}= useState([])
  //no estoy pudiendo traer las categorias
  useEffect(() => {
    // setCategories ( getListCategories());
    
  }, []);

  const { handleChange, handleSubmit, errors, values, setFieldValue, touched } =
    useFormik({
      initialValues: {
        productName: "",
        price: "",
        stock: "",
        status: "Activo",
        category: "",
        detail: "",
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
              <Grid item xs={12} sm={6}>
                <TextField
                  name="price"
                  type="number"
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
              <Grid item xs={12} sm={6}>
                <TextField
                  name="stock"
                  type="number"
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
                      {/* {
                        categories.map((category) => {
                          <MenuItem key={category._id} value={category.categoryName}>
                            {category.categoryName}
                          </MenuItem>;
                        })} */}
                      <MenuItem value="1">Mujer</MenuItem>
                      <MenuItem value="2">Hombre</MenuItem>
                      <MenuItem value="3">Niños</MenuItem>
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
                      <MenuItem value="Activo">Activo</MenuItem>
                      <MenuItem value="Inactivo">Inactivo</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
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
