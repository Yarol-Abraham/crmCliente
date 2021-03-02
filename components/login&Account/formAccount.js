import { useContext, useEffect, useState } from 'react';
import UsuariosContext from '../../context/usuarios/usuariosContext';

import InputTextCSS from '../UI/InputText';
import ButtonCSS from '../UI/buttons';
import FormCSS from '../UI/form';
import SmallAlert from '../alerts/smallAlert';
import FormAlert from '../alerts/formAlert';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useRouter } from 'next/router';

const FormAccount = () => {
    const usuariosContext = useContext(UsuariosContext);
    const { 
        userSuccess,
        userFail,
        userMessage,
        createAccount
    } = usuariosContext;
    const router = useRouter(); 
    const [ btnSubmit, setbtnSubmt ] = useState(false);
    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
            .required('Hace falta tu nombre'),
            apellido: Yup.string()
            .required('Agrega un apellido'),
            email: Yup.string()
            .email("El email no es valido")
            .required('El Email es obligatorio'),
            password: Yup.string()
            .required('Agrega una contraseña.')
            .min(6, "La contraseña tiene que ser un mínimo de 6 caracteres.")
        }),
        onSubmit: values=>{
            setbtnSubmt(true);
            createAccount(values);
        }
    });

    useEffect(() => {
        if(userSuccess){
            router.push("/");
       }
       if(userFail){
        setbtnSubmt(false);
       }
    }, [userSuccess, userMessage, userFail])

    return ( 
        <>
            <form
                className={FormCSS('w-full sm:w-1/2 lg:w-1/3')}
                onSubmit={formik.handleSubmit}
            >
                { 
                    userFail && userMessage ?
                        <FormAlert
                            width="w-full"
                            widthColor="bg-red-500"
                            descripcion={userMessage}
                        />
                    : null    
                }
                <input 
                    type="text" 
                    id="nombre"
                    placeholder="Nombre" 
                    className={InputTextCSS}
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                /> 
                <input 
                    type="text" 
                    id="apellido"
                    placeholder="Apellido" 
                    className={InputTextCSS }
                    value={formik.values.apellido}
                    onChange={formik.handleChange}
                />   
                <input 
                    type="email"
                    id="email" 
                    placeholder="Escribe tu correo electrónico" 
                    className={InputTextCSS }
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />         
                <input 
                    type="password" 
                    id="password"
                    placeholder="Contraseña"
                    className={InputTextCSS}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />
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
                    value="Crear Cuenta" 
                    disabled={btnSubmit}
                    className={ButtonCSS('bg-blue-500', 'bg-blue-400' ,'w-full md:w-1/2' )} 
                />
            </form>
        </>
     );
}
 
export default FormAccount;