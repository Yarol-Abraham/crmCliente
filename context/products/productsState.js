import { useReducer } from 'react';

import ProductsContext from './productsContext';
import ProductsReducer from './productsReducer';

import {
    GET_ALL_PRODUCTS,
    SEARCH_PRODUCTS,
    REFRESCH_PRODUCTS
} from '../../types/products';

import {
    NEW_PRODUCT_GQL,
    DELETE_PRODUCT_GQL,
    GET_ALL_PRODUCTS_GQL,
    UPDATE_PRODUCT_GQL
} from '../../graphql/products';

import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import Swal from 'sweetalert2';

const ProductsState = (props) => {

    const [ nuevoProducto ] = useMutation(NEW_PRODUCT_GQL);
    const [ actualizarProducto ] = useMutation(UPDATE_PRODUCT_GQL);
    const [ eliminarProducto ] = useMutation(DELETE_PRODUCT_GQL,{
        update(cache, { data: { eliminarProducto } }){
            const { obtenerProductos } = cache.readQuery({ query: GET_ALL_PRODUCTS_GQL });
            cache.evict({ broadcast: false });
            cache.writeQuery({
                query: GET_ALL_PRODUCTS_GQL,
                data: {
                    obtenerProductos: obtenerProductos.filter(currentProduct => !eliminarProducto  )
                }
            })
        }
    });
    const initialState = {
        products: null
    };
    const router = useRouter();
    const [state, dispatch] = useReducer(ProductsReducer, initialState);

    const getAllProducts = (data) =>{
        dispatch({
            type: GET_ALL_PRODUCTS,
            payload: data
        });
    };

    const newProduct = async (values) =>{
        try {
            const { data } = await nuevoProducto({
                variables: {
                    input: {
                      nombre: values.nombre,
                      existencias: values.existencias,
                      costo: values.costo,
                      precio: values.precio,
                      estado: values.estado  
                    }
                }
            });
            Swal.fire(
                'Producto creado',
                `se creo ${data.nuevoProducto.nombre} correctamente`,
                'success'
            );
           router.push("/products");
        } catch (error) { 
           Swal.fire(
                'Ha ocurrido un error inesperado!',
                error.message,
                'error'
            );
        };
    };
    const updateProduct = async (values) =>{
        try {
            const { data } = await actualizarProducto({
                variables: {
                    input: {
                        nombre: values.nombre,
                        existencias: values.existencias,
                        costo: values.costo,
                        precio: values.precio,
                        estado: values.estado  
                    },
                    _id: values._id
                }
            });
            
            Swal.fire(
                'Actualizado correctamente',
                data.actualizarProducto,
                'success'
            );
            router.push("/products");
        } catch (error) {
            Swal.fire(
                'Ha ocurrido un error inesperado!',
                error.message,
                'error'
            );
            router.push("/products");
        }
   };
    const deleteProduct = async (_id) =>{
        try {
            await eliminarProducto({
                variables: {
                    _id
                }
            });
            Swal.fire(
                'Eliminado!',
                "Producto eliminado correctamente",
                'success'
            );
        } catch (error) {
            Swal.fire(
                'Cancelled',
                error.message,
                'error'
              )
        };
    };

    const searchProducts = (products) =>{
        dispatch({
            type: SEARCH_PRODUCTS,
            payload: products
        })
     };
     const refreschProducts = (products) =>{
        dispatch({
            type: REFRESCH_PRODUCTS,
            payload: products
        })
     }

    return ( 
        <ProductsContext.Provider
            value={{
                products: state.products,
                getAllProducts,
                newProduct,
                updateProduct,
                deleteProduct,
                searchProducts,
                refreschProducts
            }}
        >
            {props.children}
        </ProductsContext.Provider>
     );
}
 
export default ProductsState;