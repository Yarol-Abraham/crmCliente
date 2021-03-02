import { useReducer } from 'react';

import ClientsContext from './clientsContext';
import ClientsReducer from './clientsReducer';

import {
    GET_CLIENTS,
    NEW_CLIENT,
    ERROR_NEW_CLIENT,
    CLEAN_CLIENTS,
    SEARCH_CLIENT,
    REFRESCH_CLIENTS
 } from '../../types/clients';

import { 
    NEW_CLIENT_GQL, 
    DELETE_CLIENT_GQL, 
    GET_ALL_CLIENTS_GQL,
    UPDATE_CLIENT_GQL
} from '../../graphql/clients';
import { useMutation } from '@apollo/client';

import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
const ClientsState = (props) => {
    
    const [ nuevoCliente ] = useMutation(NEW_CLIENT_GQL);
    const [ actualizarCLiente ] = useMutation(UPDATE_CLIENT_GQL);
    const [ eliminarCliente ] = useMutation(DELETE_CLIENT_GQL, {
        update(cache, { data: { eliminarCliente } }){
            const { obtenerClientesVendedor } = cache.readQuery({ query: GET_ALL_CLIENTS_GQL });
            cache.evict({ broadcast: false });
            cache.writeQuery({
                query: GET_ALL_CLIENTS_GQL,
                data: {
                    obtenerClientesVendedor: obtenerClientesVendedor.filter(customerCurrent => customerCurrent._id !== eliminarCliente )
                }
            });
        }
    });
    const initialState = {
        clients: null,
        clientSucess: false,
        clientFail: false,
        clientMessage: ''
    };
    const router = useRouter();
    const [state, dispatch] = useReducer(ClientsReducer, initialState);

    const getAllClients = (data) =>{
        dispatch({
            type: GET_CLIENTS,
            payload: data
        })
    };
    const newClient = async (values) =>{
        try {
            const { data } = await nuevoCliente({
                variables: {
                    input: {
                        nombre: values.nombre,
                        apellido: values.apellido,
                        email: values.email,
                        empresa: values.empresa,
                        telefono: values.telefono.toString()  
                    }
                }
            });
            dispatch({
                type: NEW_CLIENT,
                payload: {
                    clientSucess: true,
                    clientFail: false,
                    clientMessage: `cliente ${data.nuevoCliente.nombre} ${data.nuevoCliente.apellido} creado exitosamente`
                }
            });
            cleanClient();
            router.push('/clients');
        } catch (error) {
            dispatch({
                type: ERROR_NEW_CLIENT,
                payload: {
                    clientSucess: false,
                    clientFail: true,
                    clientMessage: error.message
                }
            });
            cleanClient();
        };
    };
   const updateClient = async (values) =>{
        try {
            const { data } = await actualizarCLiente({
                variables: {
                    input: {
                      nombre: values.nombre,
                      apellido: values.apellido,
                      email: values.email,
                      empresa: values.empresa,
                      telefono: values.telefono.toString()  
                    },
                    _id: values._id
                }
            });
            
            Swal.fire(
                'Actualizado correctamente',
                data.actualizarCLiente,
                'success'
            );

            router.push("/clients");

        } catch (error) {
            Swal.fire(
                'Ha ocurrido un error inesperado!',
                error.message,
                'error'
            );
        }
   };
    const deleteCliente = async (_id) =>{
        try {
            await eliminarCliente({
                variables: {
                    _id
                }
            });
            Swal.fire(
                'Eliminado!',
                "Cliente eliminado correctamente",
                'success'
            );
        } catch (error) {
            Swal.fire(
                'Cancelled',
                error.message,
                'error'
              )
        }
    };
    const searchClient = (data) =>{
       dispatch({
           type: SEARCH_CLIENT,
           payload: data
       })
    };
    const refreschClients = (clients) =>{
       dispatch({
           type: REFRESCH_CLIENTS,
           payload: clients
       })
    }
    const cleanClient = () =>{
        setTimeout(()=>{
            dispatch({
                type: CLEAN_CLIENTS,
               payload: {
                    clientSucess: false,
                    clientFail: false,
                    clientMessage: ''
               } 
            })
        }, 10000);
    };
    return ( 
        <ClientsContext.Provider
            value={{
                clients: state.clients,
                clientSucess: state.clientSucess,
                clientFail: state.clientFail,
                clientMessage: state.clientMessage,
                getAllClients,
                newClient,
                updateClient,
                searchClient,
                refreschClients,
                deleteCliente
            }}
        >
            {props.children}
        </ClientsContext.Provider>
     );
}
 
export default ClientsState;