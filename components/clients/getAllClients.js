import { useContext, useEffect, useState } from 'react';

import { titleh1CSS } from '../UI/Titles';
import ButtonCSS from '../UI/buttons';
import FormAlert from '../alerts/formAlert';
import LoadingComponent from '../loadingComponent';
import ErrorComponent from '../alerts/Error';

import { GET_ALL_CLIENTS_GQL } from '../../graphql/clients';
import { useQuery } from '@apollo/client';

import ClientsContext from '../../context/clients/clientsContext';
import LinkPage from '../linkPage';
import Search from './search';

import Client from './client';

const GetAllClients = () => {
    const { data, loading, error } = useQuery(GET_ALL_CLIENTS_GQL,  {
        fetchPolicy: 'cache-and-network'
      });
    const clientsContext = useContext(ClientsContext);
    const {
        clients,
        clientSucess,
        clientMessage,
        getAllClients,
        refreschClients
    }  = clientsContext;

    const [ copyClients, setcopyClients ] = useState(null);
    const [ conditionClients, setconditionClients ] = useState(true);

    const handleRefresch = () =>{
        refreschClients(copyClients);
    }; 

    useEffect(()=>{
        if(!loading){
          if(data.obtenerClientesVendedor){
            getAllClients(data.obtenerClientesVendedor);
            if(conditionClients){
                setcopyClients(data.obtenerClientesVendedor);
                setconditionClients(false);
            }
          }
        }
       
    }, [data, loading]);
    if(error) return <ErrorComponent />
   return ( 
        <>
            { loading ? <LoadingComponent /> : (
                <div className="w-full h-full overflow-auto">
                    <h1 className={titleh1CSS}>Listado de clientes</h1> 
                    <div className="w-full flex flex-col">
                        <LinkPage name="Nuevo cliente" namePage="newClient" />
                        <Search labelTitle="Buscar" />
                        <button 
                                className={ButtonCSS('bg-yellow-500', 'bg-yellow-400' ,'w-1/4 sm:w-1/4 md:w-20 h-1/4 flex justify-center' )}
                                    onClick={handleRefresch}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"  className="w-6">
                                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                </svg>
                        </button>
                    </div>
                    { 
                        clientSucess && clientMessage ? 
                            <FormAlert
                                width="w-full"
                                widthColor='bg-green-500'
                                descripcion={clientMessage}
                            />
                        : null    
                    } 
                    {
                        clients ? 
                        <div className="w-full overflow-auto p-4">
                            <table  className="table-auto bg-white shadow-md w-full w-lg">
                                <thead>
                                    <tr>
                                        <th className="text-gray-500 text-xs border-b-2 uppercase p-2" >Nombre</th>
                                        <th className="text-gray-500 text-xs border-b-2 uppercase p-2">Apellido</th>
                                        <th className="text-gray-500 text-xs border-b-2 uppercase p-2">Email</th>
                                        <th className="text-gray-500 text-xs border-b-2 uppercase p-2">Telefono</th>
                                        <th className="text-gray-500 text-xs border-b-2 uppercase p-2">Empresa</th>
                                        <th className="text-gray-500 text-xs border-b-2 uppercase p-2">Acciones</th>
                                    </tr>
                                </thead>
                                { clients.map(client =>(   
                                    <Client key={client._id} client={client} />
                                )) }
                            </table>
                        </div>
                        : <p>Aun no tienes clientes agregados</p>
                    }
                </div>
            )  }
        </>
    );
}
 
export default GetAllClients;