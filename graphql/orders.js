import { gql } from '@apollo/client';

export const NEW_ORDER_GQL = gql`
    mutation nuevoPedido($input: PedidoInput){
        nuevoPedido(input: $input)
    }
`;

export const GET_ALL_ORDERS_GQL = gql`
    query obtenerPedidosVendedor{
        obtenerPedidosVendedor{
            _id
            pedido {
                _id
                cantidad
                nombre
            }
            cliente{
                _id
                nombre
                apellido
                email
                telefono
            }
            vendedor
            total
            totalNeto
            iva
            factura
            estado
        }
    }
`;

export const UPDATE_STATE_ORDER_GQL = gql`
    mutation actualizarEstadoPedido($_id: ID!, $estado: String!){
        actualizarEstadoPedido(_id: $_id, estado: $estado){
            estado
        }
    }
`;

export const DELETE_ORDER_GQL = gql`
    mutation eliminarPedido($_id: ID!){
        eliminarPedido(_id: $_id)
    }
`;
