import { useContext } from 'react';

import OrdersContext from '../../context/orders/ordersContext';

import { GET_ALL_CLIENTS_GQL } from '../../graphql/clients';
import { useQuery } from '@apollo/client';

import Select from 'react-select';

const SelectClient = () => {

    const { data, loading, error } = useQuery(GET_ALL_CLIENTS_GQL,  {
        fetchPolicy: 'cache-and-network'
      });

    const ordersContext = useContext(OrdersContext);
    const {
        selectClient
    } = ordersContext;

    const handleSelectClients = (client)=>{
        selectClient(client);
    }

    if(loading) return <p className="text-lg font-bold p-2 bg-green-100 rounded">Cargando clientes....</p>
    if(error) return <p className="text-lg font-bold p-2 bg-red-100 rounded">Ocurrio un error inesperado....</p>
    const { obtenerClientesVendedor } = data;
    return ( 
        <>
       <div>
            <p className="text-base font-thin">Asignar cliente</p>
            <Select
                className="my-2"
                options={obtenerClientesVendedor}
                onChange={(option)=> handleSelectClients(option) }
                getOptionValue={ options => options._id } 
                getOptionLabel={ options => `${options.nombre} ${options.apellido}` }  
                placeholder="Busque o seleccione un cliente"
                noOptionsMessage={()=> "No se encontraron resultados"} 
            />
       </div>
        </>
     );
}
 
export default SelectClient;