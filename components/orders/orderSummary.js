import { useContext } from 'react';

import OrdersContext from '../../context/orders/ordersContext';
import Product from './product';
const OrderSummary = () => {

    const ordersContext = useContext(OrdersContext);
    const {
        ordersProducts
    } = ordersContext;

    return ( 
        <>
        <div className="w-full my-2">
            <p className="text-xl font-bold font-sans tracking-wider my-2">Resumen</p>
            {
                ordersProducts.length > 0 ? 
                <>
                <table  className="table-auto bg-white shadow-md w-full w-lg">
                    <thead>
                        <tr>
                            <th className="text-gray-500 text-xs border-b-2 uppercase p-2" >Nombre</th>
                            <th className="text-gray-500 text-xs border-b-2 uppercase p-2">Existencias</th>
                            <th className="text-gray-500 text-xs border-b-2 uppercase p-2">Cantidad</th>
                            <th className="text-gray-500 text-xs border-b-2 uppercase p-2">Precio U.</th>
                            <th className="text-gray-500 text-xs border-b-2 uppercase p-2">Precio total</th>
                        </tr>
                    </thead>
                    {
                        ordersProducts.map(product =>(
                            <Product key={product._id} product={product} />
                        ))
                    }
                </table>
                
                </>
                : <p className="bg-gray-200 font-semibold font-sans uppercase text-center p-2 rounded">No hay productos</p> 
            }
        </div>
        </>
     );
}
 
export default OrderSummary;