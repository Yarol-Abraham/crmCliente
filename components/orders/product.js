import { useContext, useState, useEffect } from 'react';

import InputTextCSS from '../UI/InputText';

import OrdersContext from '../../context/orders/ordersContext';

const Product = ({ product }) => {
    const ordersContext = useContext(OrdersContext);
    const {
        dataPayment,
        calculateTotal
    } = ordersContext;
    const { nombre, existencias, precio } = product;
    const [ addQuantity, setaddQuantity ] = useState(0);
    const [ totalPrice, settotalPrice ] = useState(0);
    const handleQuantity = (addQuantity, totalPrice) =>{
        const products = { 
            ...product, 
            addQuantity, 
            totalPrice, 
            iva: totalPrice*0.12, 
            total: (totalPrice*0.12) + totalPrice
        };
        dataPayment(products);
    }

    const handleOnchange = (e)=>{
       let num = parseFloat(e.target.value);
        if(num > 0){    
            setaddQuantity(num);
       }else{
        setaddQuantity(0);
       }
    }

    useEffect(() => {
        settotalPrice(addQuantity*precio);
        //add quantity and total price
        handleQuantity(addQuantity, totalPrice);
        //calculate total
        calculateTotal();
    }, [addQuantity, totalPrice]);

    return ( 
        <tbody>
            <tr>
                <td className="border-b text-sm text-center font-thin p-2" >{nombre}</td>
                <td className="border-b text-sm text-center font-thin p-2" >{existencias}</td>
                <td className="border-b text-sm text-center font-thin p-2" >
                    <input
                        type="Number"
                        name="quantity"
                        min="0" 
                        pattern="^[0-9]+"
                        defaultValue={0}
                        className={InputTextCSS}
                        onChange={handleOnchange}
                    />
                </td>
                <td className="border-b text-sm text-center font-thin p-2" >{`Q ${precio}`}</td>
                <td className="border-b text-sm text-center font-thin p-2" >{`Q ${totalPrice}`}</td>
            </tr>
        </tbody>
     );
}
 
export default Product;