import { gql } from '@apollo/client';

export const GET_ALL_CLIENTS_GQL = gql`
    query obtenerClientesVendedor{
        obtenerClientesVendedor{
            _id
            nombre
            apellido
            empresa
            email
            telefono
            vendedor
        }
    }
`;

export const NEW_CLIENT_GQL = gql`
    mutation nuevoCliente($input: ClienteInput){
        nuevoCliente(input: $input){
            nombre
            apellido
        }
    }
`;

export const DELETE_CLIENT_GQL = gql`
    mutation  eliminarCliente($_id: ID!){
        eliminarCliente(_id: $_id)
    }
`;

export const GET_CLIENT_GQL = gql`
    query  obtenerClienteVendedor($_id: ID!){
        obtenerClienteVendedor(_id: $_id){
            _id
            nombre
            apellido
            empresa
            email
            telefono
        }
    }
`;

export const UPDATE_CLIENT_GQL = gql`
    mutation actualizarCLiente($input: ClienteInput, $_id: ID! ){
        actualizarCLiente(input: $input, _id: $_id )
    }
`;

export const SEARCH_CLIENT_GQL = gql`
    query buscarClienteVendedor($email: String!){
        buscarClienteVendedor(email: $email){
            _id
            nombre
            apellido
            email
            telefono
            empresa
        }
    }
`;