import { useContext, useState } from 'react';

import OrdersContext from '../../context/orders/ordersContext';

import { titleh1CSS } from '../UI/Titles';
import SmallAlert from '../alerts/smallAlert';
import ButtonCSS from '../UI/buttons';

import SelectClients from './selectClients';
import GetDate from './getDate';
import SelectProducts from './selectProducts';
import OrderSummary from './orderSummary';
import QuantityTotals from './quantityTotals';

const FormNewOrden = () => {
  
    const ordersContext = useContext(OrdersContext);
    const {
        ordersClient,
        ordersProducts,
        ordersIva,
        ordersTotalNeto,
        ordersTotal,
        ordersQuantity,
        ordersStocks,
        newOrder
    } = ordersContext;

    const [ error, seterror ] = useState(false);
    const [ messageFail, setmessageFail ] = useState("");
    const showMessage = (mgs, state)=>{
        setmessageFail(mgs);
        seterror(state);
    }
    function verifyProducts(prod) {
        return prod.addQuantity > 0;
    }

    const handleSubmit = ()=>{
        if(!ordersClient.nombre){
            showMessage("Selecciona un cliente", true); 
            return;
        }
     
        if(ordersProducts.length === 0){
            showMessage("No hay productos registrados", true);
            return;
        }

        if(!ordersProducts.every(verifyProducts)) {
            showMessage("Revise que las cantidades no esten vacias, tampoco esten en 0, o en numeros negativos", true);
            return;
        }
        if(ordersQuantity > ordersStocks){
            showMessage("existencias faltantes, hay cantidades que superan las existencias de uno o varios productos", true);
            return;
        }
        showMessage("", false);
 
        let getProduct = [];
        ordersProducts.forEach( (prod, i) => {   
            getProduct.push({ _id: prod._id, nombre: prod.nombre, cantidad: prod.addQuantity });
        });
        newOrder({
            pedido: getProduct,
            iva: ordersIva,
            totalNeto: ordersTotalNeto,
            total: ordersTotal,
            cliente: ordersClient._id
       });
    }

    return ( 
    <> 
        <div className="w-full h-full overflow-auto">
            <h1 className={titleh1CSS}>Nuevo pedido</h1>
            <div className="w-11/12 h-full lg:w-3/4 m-auto">
                <div className="w-full lg:grid lg:grid-cols-2 lg:gap-4">
                    <SelectClients />
                    <GetDate />
                </div>
                <SelectProducts /> 
                <OrderSummary />
                <QuantityTotals />
                {
                    error ? <SmallAlert descripcion={messageFail} /> : null 
                }
                <div className="w-full flex justify-center mt-4">
                    <button
                     
                        onClick={handleSubmit} 
                        className={ButtonCSS('bg-blue-500', 'bg-blue-400', 'w-full sm:w-1/2 md:w-1/2')}
                    >Registrar pedido</button>                
                </div>
            </div>  
        </div>
    </>
    );
}
 
export default FormNewOrden;