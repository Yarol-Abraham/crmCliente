import { useContext } from 'react';
import Swal from 'sweetalert2';
import ButtonCSS from '../UI/buttons';
import ProductsContext from '../../context/products/productsContext';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const Product = ({ product }) => {
    const productsContext = useContext(ProductsContext);
    const {
        deleteProduct
    }= productsContext;
    const { _id, nombre, existencias, costo, precio, estado } = product;
    
    const router = useRouter();

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
                deleteProduct(_id);
            };
          });
    };

    const handleEditar = (_id) =>{
        router.push({
            pathname: '/products/[pid]',
            query: { pid: _id },
          })
    }

    return ( 
        <>
        <tbody>
            <tr>
                <td className="border-b text-sm text-center font-thin p-2" >{nombre}</td>
                <td className={`border-b text-sm text-center font-thin p-2 ${existencias <= 0 ? "bg-red-400 text-white font-semibold" : ""}`} >{existencias}</td>
                <td className="border-b text-sm text-center font-thin p-2" >Q {costo}</td>
                <td className="border-b text-sm text-center font-thin p-2" >Q {precio}</td>
                <td className={`border-b text-white text-sm text-center font-bold p-2 ${estado === "ACTIVO" ?  "bg-green-500" : "bg-red-400"}`} >{estado}</td>
                <td  className="border-b text-sm font-thin p-2">
                    <div className="flex flex-col sm:flex-row justify-center">
                        <button 
                            onClick={()=> handleDelete(_id)}
                            className={ButtonCSS('bg-red-600', 'bg-red-400', 'mb-1 sm:mb-0')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 m-auto">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <button
                            onClick={() => handleEditar(_id) } 
                            className={ButtonCSS('bg-blue-500', 'bg-blue-400')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 m-auto">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>  
        </tbody>
        </>
    );
};

Product.propTypes = {
    product: PropTypes.object.isRequired
}

export default Product;