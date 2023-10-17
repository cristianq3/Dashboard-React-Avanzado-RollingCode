import { Helmet } from "react-helmet-async";
import { useContext, useState, useEffect } from "react";
// @mui
import { Container, Stack, Typography, Button } from "@mui/material";

// @mui iconos
import Iconify from "../components/iconify";

// components
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar,
} from "../sections/@dashboard/products";
// context
import { ProductContext } from "../contexts/ProductContext";
// mock
//import PRODUCTS from "../_mock/products";
//import { Link } from "react-router-dom";

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const { state, getListProducts } = useContext(ProductContext);

  useEffect(() => {
    getListProducts();
    console.log(state.products);
  }, [state.isLoading]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Helmet>
        <title> Productos </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Productos
        </Typography>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
          href="/dashboard/addproduct"
        >
          Nuevo Producto
        </Button>
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>
        {state.products && <ProductList products={state.products} />}
        <ProductCartWidget />
      </Container>
    </>
  );
}
