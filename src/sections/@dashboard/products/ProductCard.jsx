import PropTypes from 'prop-types';
//import imageDefault from "../../../../public/assets/images/imageDefault.jpg"
// @mui
import { Box, Card, Link, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';
import { Delete, DeleteForever, Edit } from '@mui/icons-material';
import { useContext, useEffect } from 'react';
import { ProductContext } from '../../../contexts/ProductContext';
import {Link as LinkRouter} from 'react-router-dom'



// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const {handleDelete, editProduct} = useContext(ProductContext)
  const { productName: name,  price, status, priceSale, _id } = product;

  // useEffect(()=> {
  //   console.log('id product card',_id)
  // },[])

  // si le agregamos el campo colors a la base de datos tenemos que reemplazar este array por ese campo
  const colors = ['#00AB55', '#000000', '#FFFFFF', '#FFC0CB', '#FF4842', '#1890FF', '#94D82D', '#FFC107'];
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'Inactivo' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}
        {/* en la src tendríamos que poner una imagen por default cuado el producto no tenga imagen */}
        <StyledProductImg alt={name} src={product.image?product.image.secure_url:"/assets/images/imageDefault.jpg"} /> 
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>   
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
          
        </Link>
        <Box>
          
           <Button onClick={()=> handleDelete(_id)}> <DeleteForever sx={{color:'red'}} /> </Button>
           {/* <Button   href={`/dashboard/productos/edit/${_id}`} >  </Button> */}

           <Button
                              component={LinkRouter} to={`edit/${_id}`}
                            >
                            <Edit sx={{color:'blue'}} />
                            </Button>
        
           </Box>


 </Box>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={colors} />
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {priceSale && fCurrency(priceSale)}
            </Typography>
            &nbsp;
            {fCurrency(price)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
