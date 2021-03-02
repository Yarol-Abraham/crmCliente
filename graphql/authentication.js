import { gql } from '@apollo/client';

export const SUCESS_SESION_GQL = gql`
    mutation autenticacion($input: AutenticacionInput){
        autenticacion(input: $input){
            token
        }
    }
`;
export const AUTH_USER_GQL = gql`
    query obtenerUsuarioAutenticado{
        obtenerUsuarioAutenticado{
            nombre
            apellido
            email
        }
    }
`;