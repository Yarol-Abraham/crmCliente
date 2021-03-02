import { gql } from '@apollo/client';

export const NEW_ACCOUNT_GQL = gql`
    mutation nuevoUsuario($input: UsuarioInput){
        nuevoUsuario(input: $input){
            email
        }
    }
`;