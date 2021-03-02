import { useReducer } from 'react';

import OrdersContext from './ordersContext';
import OrdersReducer from './ordersReducer';

import {
    GET_ALL_ORDERS,
    SELECT_CLIENT,
    SELECT_PRODUCT,
    DATA_PAYMENT,
    CALCULATE_TOTAL,
    NEW_ORDER,
    ERROR_ORDER
} from '../../types/orders';

import Swal from 'sweetalert2';

import { 
    NEW_ORDER_GQL,
    GET_ALL_ORDERS_GQL,
    UPDATE_STATE_ORDER_GQL,
    DELETE_ORDER_GQL
} from '../../graphql/orders';

import { useMutation } from '@apollo/client';

import { useRouter } from 'next/router';

const OrdersState = (props) => {
    
    const [ nuevoPedido ] = useMutation(NEW_ORDER_GQL);
    const [ actualizarEstadoPedido ] = useMutation(UPDATE_STATE_ORDER_GQL);
    const [ eliminarPedido ] = useMutation(DELETE_ORDER_GQL, {
        update(cache, { data: { eliminarPedido } }){
            const { obtenerPedidosVendedor } = cache.readQuery({ query: GET_ALL_ORDERS_GQL });
            cache.evict({ broadcast: false });
            cache.writeQuery({
                query: GET_ALL_ORDERS_GQL,
                data: {
                    obtenerPedidosVendedor: obtenerPedidosVendedor.filter(order => order._id !== eliminarPedido )
                }
            });
        }
    });

    const initialState = {
        orders: [],
        ordersClient: {},
        ordersProducts: [],
        ordersIva: 0, 
        ordersTotalNeto: 0,
        ordersTotal: 0,
        ordersQuantity: 0,
        ordersStocks: 0
    };
    const router = useRouter();
    const [state, dispatch] = useReducer(OrdersReducer, initialState);

    const getAllOrders = (data) =>{
        dispatch({
            type: GET_ALL_ORDERS,
            payload: data
        })
    }
    const selectClient = (client) =>{
        dispatch({
            type: SELECT_CLIENT,
            payload: client
        });
    }
    const selectProduct = (productSelect) =>{
        let nuevoState;
        if(state.ordersProducts.length > 0 ) {
            // Tomar del segundo arreglo, una copia para asignarlo al primero
            nuevoState = productSelect.map( producto => {
                const nuevoObjeto = state.ordersProducts.find( productoState => productoState._id === producto._id  );
                return {...producto, ...nuevoObjeto }
            } )
        } else {
            nuevoState = productSelect;
        }

        dispatch({
            type: SELECT_PRODUCT,
            payload: nuevoState
        });
    }
    const dataPayment = (products) =>{
        dispatch({
            type: DATA_PAYMENT,
            payload: products
        })
    }
    const calculateTotal = ()=>{  
        dispatch({
            type: CALCULATE_TOTAL
        })
    }
    const newOrder = async (input)=>{
        try {
            
            const { data } = await nuevoPedido({
                variables: {
                    input
                }
            })

            dispatch({
                type: NEW_ORDER
            })

            Swal.fire(
                'Pedido creado',
                data.nuevoPedido,
                'success'
            );

            router.push("/orders");
        } catch (error) {
            Swal.fire(
                'Ha ocurrido un error inesperado!',
                error.message,
                'error'
            );
            dispatch({
                type: ERROR_ORDER
            })
        }
    }
    const updateOrder = async (values) =>{
          try {
            const { data } = await actualizarEstadoPedido({
                variables: {
                    _id: values._id,
                    estado: values.estado
                }
            });
            console.log(data.ctualizarEstadoPedido);
            Swal.fire(
                'Se ha actualizado el pedido correctamente',
                data.actualizarEstadoPedido.estado,
                'success'
            );
      } catch (error) {
            Swal.fire(
                'Ha ocurrido un error inesperado!',
                error.message,
                'error'
            );
      }
    }
    const deleteOrder = async (_id) =>{
        try {
            await eliminarPedido({
                variables: {
                    _id
                }
            });
            Swal.fire(
                'Eliminado!',
                "Pedido eliminado correctamente",
                'success'
            );
        } catch (error) {
            Swal.fire(
                'Cancelled',
                error.message,
                'error'
              )
        }
    };

    return ( 
        <OrdersContext.Provider
            value={{
                orders: state.orders,
                ordersClient: state.ordersClient,
                ordersProducts: state.ordersProducts,
                ordersIva: state.ordersIva,
                ordersTotalNeto: state.ordersTotalNeto,
                ordersTotal: state.ordersTotal,
                ordersQuantity: state.ordersQuantity,
                ordersStocks: state.ordersStocks,
                selectClient,
                selectProduct,
                dataPayment,
                calculateTotal,
                newOrder,
                getAllOrders,
                updateOrder,
                deleteOrder
            }}
        >
            {props.children}
        </OrdersContext.Provider>
     );
}
 
export default OrdersState;