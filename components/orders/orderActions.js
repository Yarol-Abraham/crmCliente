import { useContext } from 'react';

import OrdersContext from '../../context/orders/ordersContext';

import ButtonCSS from '../UI/buttons';

import Swal from 'sweetalert2';

const OrderActions = ({ _id }) => {

    const ordersContext = useContext(OrdersContext);
    const {
        deleteOrder
    } = ordersContext;
    const handleDelete = (_id) =>{
        Swal.fire({
            title: 'Estas seguro?',
            text: "Una vez que lo elimines, no podras recuperar la información!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteOrder(_id);
            };
          });
    };
    return ( 
        <>
        <div className="w-full flex justify-end sm:justify-center md:justify-end">
            <button
                onClick={()=> handleDelete(_id)}
                className={ButtonCSS('bg-red-500', 'bg-red-400', 'w-40 sm:w-1/2 md:w-1/4 text-sm mt-1')}
            >eliminar</button> 
        </div>
        </>
     );
}
 
export default OrderActions;