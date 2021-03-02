import { useContext } from 'react';

import OrdersContext from '../../context/orders/ordersContext';

import { GET_ALL_PRODUCTS_GQL } from '../../graphql/products';

import { useQuery } from '@apollo/client';

import Select from 'react-select';

const SelectProducts = () => {
    const { data, loading, error } = useQuery(GET_ALL_PRODUCTS_GQL,  {
        fetchPolicy: 'cache-and-network',
        variables:{
            estado: "ACTIVO"
        }
      });
    
    const ordersContext = useContext(OrdersContext);

    const {
        selectProduct,
    } = ordersContext;
    
    const handleSelectProducts = (product)=>{
        selectProduct(product);
    }

    if(loading) return <p className="text-lg font-bold p-2 bg-green-100 rounded">Cargando productos....</p>
    if(error) return <p className="text-lg font-bold p-2 bg-red-100 rounded">Ocurrio un error inesperado....</p>
    const { obtenerProductos } = data;
    return ( 
        <>
        <div>
            <p className="text-base font-thin">Asignar Producto</p>
            <Select
                className="w-3/4 my-2"
                isMulti={true}
                options={obtenerProductos}
                onChange={(option)=> handleSelectProducts(option) }
                getOptionValue={ options => options._id } 
                getOptionLabel={ options => `${options.nombre} - ${options.existencias} Disponibles` }  
                placeholder="Busque o seleccione un producto"
                noOptionsMessage={()=> "No se encontraron resultados"}   
            />
        </div>
        </>
     );
}
 
export default SelectProducts;