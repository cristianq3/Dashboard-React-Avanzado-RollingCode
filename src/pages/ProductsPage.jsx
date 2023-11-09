import { Helmet } from 'react-helmet-async';
import { useContext, useState, useEffect } from 'react';
// @mui
import { Container, Stack, Typography, Button } from '@mui/material';

// @mui iconos
import Iconify from '../components/iconify';

// components
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar,
} from '../sections/@dashboard/products';
// context
import { ProductContext } from '../contexts/ProductContext';
// mock
//import PRODUCTS from "../_mock/products";
//import { Link } from "react-router-dom";

import Swal from 'sweetalert2';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const { state, getListProducts, isLoading, deleteProduct } =
    useContext(ProductContext);

  const [productDeleted, setProductDeleted] = useState(false);

  useEffect(() => {
    getListProducts();
  }, [isLoading]);

  useEffect(() => {
    setProductDeleted(false);
    getListProducts();
  }, [productDeleted]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleDelete = (_id) => {
    try {
      Swal.fire({
        title: `¿Seguro que deseas eliminar el producto?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#76B0F1',
        cancelButtonColor: '#B72136',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteProduct(_id);
          setProductDeleted(true);
          Swal.fire({
            text: `Se eliminó el producto correctamente`,
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
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
        {state.products && (
          <ProductList products={state.products} handleDelete={handleDelete} />
        )}
        <ProductCartWidget />
      </Container>
    </>
  );
}
