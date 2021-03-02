import { useContext, useState } from 'react';

import ClientsContext from '../../context/clients/clientsContext';

import Layout from "../../components/layout/layout";
import ProtectRouter from '../../config/protectRoutes';
import { useRouter } from 'next/router';

import { titleh1CSS } from '../../components/UI/Titles';
import FormCSS from '../../components/UI/form';
import ButtonCSS from '../../components/UI/buttons';
import InputTextCSS from '../../components/UI/InputText';
import LoadingComponent from '../../components/loadingComponent';

import SmallAlert from '../../components/alerts/smallAlert';

import { GET_CLIENT_GQL } from '../../graphql/clients';
import { useQuery } from '@apollo/client';

import { Formik } from 'formik';
import * as Yup from 'yup';

const Clients = () => {
    
    const clientsContext = useContext(ClientsContext);
    const {
        updateClient
    } = clientsContext;
    const [ btnSubmit, setbtnSubmt ] = useState(false);
    const router = useRouter();
    const { query: { pid } } = router;

    const { data, loading } = useQuery(GET_CLIENT_GQL, {
        variables: {
            _id: pid
        }
    });

    const schemaValidate = Yup.object({
        nombre: Yup.string()
        .required('Hace falta tu nombre'),
        apellido: Yup.string()
        .required('Agrega un apellido'),
        email: Yup.string()
        .email("El email no es valido")
        .required('El Email es obligatorio'),
        empresa: Yup.string()
        .required("El nombre de la empresa es importante"),
        telefono: Yup.string()
        .required("El telefono no puede ir vacio")
    });

    if(loading) return <p>Caragando...</p>
    const { obtenerClienteVendedor } = data;

    return ( 
        <ProtectRouter>
            <Layout> 
            { loading ? <LoadingComponent /> : (
                <div className="w-full h-full overflow-auto">
                <h1 className={titleh1CSS}>Editar cliente</h1>
                <Formik
                validationSchema={schemaValidate}
                enableReinitialize
                initialValues={obtenerClienteVendedor}
                onSubmit={(values)=>{
                    setbtnSubmt(true);
                    updateClient(values);
                }}
            >
                { props =>{
                    return (
                        <form 
                        className={FormCSS('w-full sm:w-4/5 lg:w-1/2 overflow-auto m-auto')}
                         onSubmit={props.handleSubmit}
                    >
                        <div className="w-full">
                            <label className="text-base font-thin">Nombre</label>
                            <input 
                                type="text" 
                                id="nombre" 
                                className={InputTextCSS}
                                value={props.values.nombre}
                                onChange={props.handleChange}
                            /> 
                        </div>
                        <div className="w-full">
                            <label className="text-base font-thin">Apellido</label>
                            <input 
                                type="text" 
                                id="apellido"
                                className={InputTextCSS}
                                value={props.values.apellido}
                                onChange={props.handleChange}
                            /> 
                        </div>

                       <div className="w-full">
                            <label className="text-base font-thin">Email</label>
                            <input 
                                type="text" 
                                id="email"
                                className={InputTextCSS}
                                value={props.values.email}
                                onChange={props.handleChange}
                            /> 
                       </div>
                        <div className="w-full">
                            <label className="text-base font-thin">Empresa</label>
                            <input 
                                type="text" 
                                id="empresa"
                                className={InputTextCSS}
                                value={props.values.empresa}
                                onChange={props.handleChange}
                            /> 
                        </div>
                        <div className="w-full">
                            <label className="text-base font-thin">Telefono</label>
                            <input 
                                type="Number" 
                                id="telefono"
                                className={InputTextCSS}
                                value={props.values.telefono}
                                onChange={props.handleChange}
                            /> 
                        </div>
                        { 
                            Object.keys(props.touched).length > 0 
                            && Object.keys(props.errors).length > 0 ?
                            <SmallAlert 
                                descripcion={`${ Object.values(props.errors).join(', ')}`} 
                            />    
                            : null
                        } 
                        <div className="w-full flex md:flex-row justify-center">
                            <input 
                                type="submit" 
                                disabled={btnSubmit}
                                value="Guardar cambios"
                                className={ButtonCSS('bg-blue-500', 'bg-blue-400' ,'w-40 md:w-1/2 lg:w-1/3' )} 
                            />
                        </div>
                    </form>
                    )
                } }
              
            </Formik>
        </div>
            )  }
            
            </Layout>
        </ProtectRouter>
     );
}
 
export default Clients;