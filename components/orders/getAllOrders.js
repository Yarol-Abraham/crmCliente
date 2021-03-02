import { useContext, useEffect } from 'react';

import { titleh1CSS } from '../UI/Titles';
import LoadingComponent from '../loadingComponent';
import ErrorComponent from '../alerts/Error';
import FormAlert from '../alerts/formAlert';

import LinkPage from '../linkPage';

import { GET_ALL_ORDERS_GQL } from '../../graphql/orders';
import { useQuery } from '@apollo/client';

import OrdersContext from '../../context/orders/ordersContext';
import Order from './order';

const GetAllOrders = () => {
    const { data, loading, error } = useQuery(GET_ALL_ORDERS_GQL,  {
        fetchPolicy: 'cache-and-network'
      });
    const ordersContext = useContext(OrdersContext);
    const {
        getAllOrders,
        orders
    }  = ordersContext;

      useEffect(()=>{
        if(!loading){
          if(data.obtenerPedidosVendedor){
              getAllOrders(data.obtenerPedidosVendedor);    
          }
        }
       
    }, [data, loading]);
    if(error) return <ErrorComponent />
   return ( 
        <>
        { loading ? <LoadingComponent /> : (
            <div className="w-full h-full overflow-auto">
                <h1 className={titleh1CSS}>Listado de Pedidos</h1> 
                <div className="w-full flex flex-col">
                    <LinkPage name="Nuevo pedido" namePage="newOrder" />
                </div>
            
                <div className="w-full overflow-auto p-4">
                {
                    orders.length > 0 ?
                    orders.map(order => (
                        <Order key={order._id} order={order} />
                    ))
                    :  
                    <FormAlert 
                        descripcion={"Aun no tienes pedidos creados"}
                        width="w-full"
                        widthColor="bg-yellow-400"
                    />
                }
                </div>  
            </div> 
        ) }
           
        </>
    );
}
 
export default GetAllOrders;