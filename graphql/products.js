import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS_GQL = gql`
    query obtenerProductos($estado: String){
        obtenerProductos(estado: $estado){
        _id
        nombre 
        existencias
        costo 
        precio
        estado
        }
    }
`;

export const NEW_PRODUCT_GQL = gql`
    mutation nuevoProducto($input: ProductoInput){
        nuevoProducto(input: $input){
            _id
            nombre
            existencias
            precio
        }
    }
`;

export const DELETE_PRODUCT_GQL = gql`
    mutation eliminarProducto($_id: ID!){
        eliminarProducto(_id: $_id)
    }
`;

export const GET_PRODUCT_GQL = gql`
    query obtenerProducto($_id: ID!){
        obtenerProducto(_id: $_id){
            _id
            nombre 
            existencias
            costo 
            precio
            estado
        }
    }
`;

export const UPDATE_PRODUCT_GQL = gql`
    mutation  actualizarProducto($input: ProductoInput, $_id: ID!){
        actualizarProducto(input: $input, _id: $_id)
    }
`;

export const SEARCH_PRODUCT_GQL = gql`
    query buscarProducto($texto: String!) {
        buscarProducto(texto: $texto) {
            _id
            nombre 
            existencias
            costo 
            precio
            estado
        }
    }
`;