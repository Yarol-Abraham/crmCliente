import { useState, useEffect, useContext } from 'react';

import PropTypes from 'prop-types';

import OrdersContext from '../../context/orders/ordersContext';

import { titleh4CSS, titleh5CSS } from '../UI/Titles';
import InputTextCSS from '../UI/InputText';
import OrderActions from './orderActions';
import ProductSummary from './productSummary';

import ClientSummary from './clientSummary';

const Order = ({ order }) => {

    const ordersContext = useContext(OrdersContext);

    const {
        updateOrder
    } = ordersContext;useContext

    const { _id, cliente, estado, factura, pedido, total } = order;
    const [ selectState, setselectState ] = useState(estado); //pendiente
    const [ getborderTopColor, setborderTopColor ] = useState("");
    const [ getbgColor, setbgColor ] = useState("");
    const [ getbgColorSelect, setgbColorSelect ] = useState("");

    const handleSelectState = (e) =>{
        setselectState(e.target.value);
        updateOrder({_id, estado: e.target.value});
    };

    const handleColorSatte = ()=>{
        if(selectState === "PENDIENTE") {
            setborderTopColor("border-yellow-600")
            setbgColor("bg-yellow-100");
            setgbColorSelect("bg-yellow-500");
        } ;
        if(selectState === "ACTIVO") {
            setborderTopColor("border-green-600");
            setbgColor("bg-green-50");
            setgbColorSelect("bg-green-500");
        }
        if(selectState === "CANCELADO") {
            setborderTopColor("border-red-600");
            setbgColor("bg-red-100");
            setgbColorSelect("bg-red-500");
        };
    };

    useEffect(()=>{
        handleColorSatte();
    }, [selectState]);

    return ( 
        <div className={`bg-white border-t-4 ${getborderTopColor} rounded-lg p-2 my-2 flex flex-col sm:flex-row shadow-lg`}>
             <div className={`${getbgColor} w-full sm:w-1/2 p-2 rounded-lg `}>
                <ClientSummary cliente={cliente} />
                <div className="w-full md:w-1/2">
                    <p className="font-sans font-semibold tracking-widest flex flex-row p-2">
                        Estado del pedido
                    </p>
                    <select
                        name="estado"
                        value={selectState}
                        onChange={handleSelectState}
                        className={`${InputTextCSS} ${getbgColorSelect} text-white font-semibold tracking-widest`}
                    >
                        <option value="PENDIENTE">Pendiente</option>
                        <option value="ACTIVO">Completado</option>
                        <option value="CANCELADO">Cancelado</option>
                    </select>
                </div>
            </div>
            <div className="w-full sm:w-1/2">
                <h4 className={titleh4CSS}>Resumen de pedido</h4>
                <h5 className={`${titleh5CSS} tracking-widest bg-gray-100 w-1/3 sm:w-1/4 md:w-1/6`}>No°{factura}</h5>
                <ProductSummary pedido={pedido} total={total} />
                <OrderActions _id={_id} />
            </div>
        </div>
    );
}

Order.propTypes = {
    order: PropTypes.object.isRequired
}

export default Order;