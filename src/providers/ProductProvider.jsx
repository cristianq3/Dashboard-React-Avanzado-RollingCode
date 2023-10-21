import { useReducer } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import { ProductReducer } from '../reducers/ProductReducer';
import { types } from '../types/types';
import { dashAxios } from '../config/dashAxios';
import Swal from 'sweetalert2';

const initialState = {
  products: [],
  categories: [],
  errorMessage: '',
  isLoading: true,
  productDeleted: false
};



export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductReducer, initialState);

  const addProduct = async (values) => {
    console.log(values.image);
    const formData = new FormData();
    formData.append('productName', values.productName);
    formData.append('price', values.price);
    formData.append('stock', values.stock);
    formData.append('status', values.status);
    formData.append('category', values.category);
    formData.append('detail', values.detail);
    formData.append('image', values.image);
    console.log(formData);
    try {
      const response = await dashAxios.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      if (response.status === 201) {
        dispatch({
          type: types.products.addProduct,
          payload: {
            ...state,
            isLoading: false,
            errorMessage: '',
          },
        });
      }

    } catch (error) {
      console.log(error);
      dispatch({
        type: types.products.addProduct,
        payload: {
          errorMessage: error,
        },
      });
    }
  };
  const getListCategories = async () => {
    try {
      const response = await dashAxios.get('/categories');
      dispatch({
        type: types.products.getCategories,
        payload: {
          categories: response.data,
        },
      });
    } catch (error) {
      dispatch({
        type: types.products.getCategories,
        payload: {
          errorMessage: error,
        },
      });
    }
  };
  const getListProducts = async () => {
    try {
      const response = await dashAxios.get('/products');
      console.log(response.data);
      dispatch({
        type: types.products.listProducts,
        payload: {
          products: response.data,
        },
      });
    } catch (error) {
      dispatch({
        type: types.products.listProducts,
        payload: {
          errorMessage: error,
        },
      });
    }
  };





  const deleteProducto = async (id) => {
    try {
       await dashAxios.delete(`products/${id}`);
      dispatch({
        type: types.products.deleteProduct,
        payload: {
          ...state,
          errorMessage: '',
        },
      })

    } catch (error) {
      console.log(error);
    }
  };
  
  const getProduct = async (id) => {
    try {
      const  {data}  = await dashAxios.get(`products/${id}`)
      console.log('Producto seleccionado', data)
      dispatch({
        type: types.product.getProduct,
        payload: {
            ...state,
          productSelected: data
        },
        
      });
    } catch (error) {
      console.log(error)
    }
  } 

  const handleDelete = (idSelected) => {
    console.log(idSelected);
    // deleteUser(idSelected);
    Swal.fire({
      title: `¿Seguro que deseas eliminar el producto?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#76B0F1",
      cancelButtonColor: "#B72136",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(idSelected);
    
        Swal.fire({
          text: `Se eliminó el producto correctamente`,
          icon: "success",
          timer: 1700,
          showConfirmButton: false,
        });
      }
    });

  };


  return (
    <ProductContext.Provider
      value={{
        state,
        addProduct,
        getListCategories,
        deleteProducto,
        getListProducts,
        handleDelete,
        getProduct,
        ...state
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
