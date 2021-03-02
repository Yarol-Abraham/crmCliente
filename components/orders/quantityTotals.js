import { useContext } from 'react';

import OrdersContext from '../../context/orders/ordersContext';

const QuantityTotals = () => {

    const ordersContext = useContext(OrdersContext);
    const {
        ordersTotalNeto,
        ordersIva,
        ordersTotal
    } = ordersContext;

   
    return (
        <div className="w-full mt-2 p-2 rounded flex justify-end">
            <div className="bg-white w-full sm:w-1/2 lg:w-1/4 p-2 rounded-lg">
                <div className="flex flex-row justify-between">
                        <p className="font-semibold tracking-wide">Neto</p>
                        <p className="font-semibold tracking-wide">Q. { ordersTotalNeto }</p>
                </div>
                <div className="flex flex-row justify-between">
                    <p className="font-semibold tracking-wide">Iva</p>
                    <p className="font-semibold tracking-wide">Q. { ordersIva }</p>
                </div>
                <div className="flex flex-row justify-between">
                    <p className="font-semibold tracking-wide">Total</p>
                    <p className="font-semibold tracking-wide">Q. { ordersTotal }</p>
                </div>
            </div>
        </div>
      );
}
 
export default QuantityTotals;