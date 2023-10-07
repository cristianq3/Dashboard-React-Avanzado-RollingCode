import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ProductContext } from "../../../contexts/ProductContext";

// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';


// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductList({ ...other }) {
  const { state } = useContext(ProductContext);
  
  return (
    <Grid container spacing={3} {...other}>
      {state.products && state.products.map((product) => (
        <Grid key={product._id} item xs={12} sm={6} md={3}>
          <ShopProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
