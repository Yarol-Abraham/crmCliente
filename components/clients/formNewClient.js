import { useContext, useState, useEffect } from 'react';

import { titleh1CSS } from '../UI/Titles';
import FormCSS from '../UI/form';
import ButtonCSS from '../UI/buttons';
import InputTextCSS from '../UI/InputText';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import SmallAlert from '../alerts/smallAlert';
import FormAlert from '../alerts/formAlert';

import ClientsContext from '../../context/clients/clientsContext';

const FormNewClient = () => {
    const clientsContext = useContext(ClientsContext);
    const { 
        newClient,
        clientMessage,
        clientFail
    } = clientsContext;
    const [ btnSubmit, setbtnSubmt ] = useState(false);
    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            email: '',
            empresa: '',
            telefono: ''
        },
        validationSchema: Yup.object({
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
        }),
        onSubmit: values=>{
            setbtnSubmt(true);
            newClient(values);
        }
    });
    useEffect(() => {
        if(clientFail){
            setbtnSubmt(false);
        }
    }, [clientFail, clientMessage])
    return ( 
        <>
        <div className="w-full h-full overflow-auto">
        <h1 className={titleh1CSS}>Nuevo Cliente</h1>
            <form 
                className={FormCSS('w-full sm:w-4/5 lg:w-1/2 overflow-auto m-auto')}
                onSubmit={formik.handleSubmit}
            >
                { 
                    clientFail && clientMessage ?
                        <FormAlert
                            width="w-full"
                            widthColor="bg-red-500"
                            descripcion={clientMessage}
                        />
                    : null    
                }
                <div className="w-full">
                    <label className="text-base font-thin">Nombre</label>
                    <input 
                        type="text" 
                        id="nombre"
                        className={InputTextCSS}
                        value={formik.values.nombre}
                        onChange={formik.handleChange}
                    /> 
                </div>

               <div className="w-full">
                    <label className="text-base font-thin">Apellido</label>
                    <input 
                        type="text" 
                        id="apellido"
                        className={InputTextCSS}
                        value={formik.values.apellido}
                        onChange={formik.handleChange}
                    /> 
               </div>

                <div className="w-full">
                    <label className="text-base font-thin">Email</label>
                    <input 
                        type="text" 
                        id="email"
                        className={InputTextCSS}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    /> 
                </div>
                
                <div className="w-full">
                    <label className="text-base font-thin">Empresa</label>
                    <input 
                        type="text" 
                        id="empresa"
                        className={InputTextCSS}
                        value={formik.values.empresa}
                        onChange={formik.handleChange}
                    /> 
                </div>
                <div className="w-full">
                    <label className="text-base font-thin">Telefono</label>
                    <input 
                        type="Number" 
                        id="telefono"
                        className={InputTextCSS}
                        value={formik.values.telefono}
                        onChange={formik.handleChange}
                    /> 
                </div>

                { 
                    Object.keys(formik.touched).length > 0 
                    && Object.keys(formik.errors).length > 0 ?
                    <SmallAlert 
                        descripcion={`${ Object.values(formik.errors).join(', ')}`} 
                    />    
                    : null
                } 
                 <input 
                    type="submit" 
                    disabled={btnSubmit}
                    value="Crear Cliente"
                    className={ButtonCSS('bg-blue-500', 'bg-blue-400','w-40 md:w-1/2' )} 
                />
            </form>
        </div>
        </>
     );
}
 
export default FormNewClient;