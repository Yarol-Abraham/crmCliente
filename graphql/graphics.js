import { gql } from '@apollo/client';

export const BEST_CLIENTS_GQL = gql`
query mejoresClientes{
    mejoresClientes{
      cliente{
        _id
        nombre
        apellido
      }
      total
    }
  }
`;