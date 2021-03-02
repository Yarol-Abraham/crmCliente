import { useContext, useState, useEffect } from 'react';
import AuthenticationContext from '../../context/authentication/authenticationContext';
import UsuariosContext from '../../context/usuarios/usuariosContext';

import InputTextCSS from '../UI/InputText';
import ButtonCSS from '../UI/buttons';
import FormCSS from '../UI/form';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import SmallAlert from '../alerts/smallAlert';
import FormAlert from '../alerts/formAlert';

const FormLogin = () => {

    const authenticationContext = useContext(AuthenticationContext);
    const usuariosContext = useContext(UsuariosContext);
    const { 
        userSuccess,
        userMessage,
        clearAlert
    } = usuariosContext;
    const{
        authFail,
        authMessage,
        authenticationUser
    } = authenticationContext;
    const [ widthColor, setwidthColor ] = useState('');
    const [ btnSubmit, setbtnSubmt ] = useState(false);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
            .required('El Email es obligatorio'),
            password: Yup.string()
            .required('La contraseña esta vacía.')
        }),
        onSubmit: values=>{
            setbtnSubmt(true);
            authenticationUser(values);
        }
    });
   
    useEffect(() => {
        if(userSuccess){
            setwidthColor('bg-green-500');
            setTimeout(()=>{
                clearAlert();
            }, 10000);
        }
        if(authFail) {
            setbtnSubmt(false);
            setwidthColor('bg-red-500');
        }; 
        
    }, [authFail, authMessage, userSuccess, userMessage]);
    return ( 
        <>
            { 
                authFail && authMessage ? 
                    <FormAlert
                        width="w-full sm:w-1/3"
                        widthColor={widthColor}
                        descripcion={authMessage}
                    />
                : null    
            } 
            { 
                userSuccess && userMessage ? 
                    <FormAlert
                        width="w-full sm:w-1/3"
                        widthColor={widthColor}
                        descripcion={userMessage}
                    />
                : null    
            } 
            <form
                className={FormCSS('w-full sm:w-1/2 lg:w-1/3')}
                onSubmit={formik.handleSubmit}
            >
                <input 
                    type="email" 
                    id="email"
                    placeholder="Escribe tu correo electrónico" 
                    className={InputTextCSS}
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
                    id="btnSubmit"
                    type="submit" 
                    disabled={btnSubmit}
                    value="Iniciar sesion" 
                    className={ButtonCSS('bg-blue-500', 'bg-blue-400' ,'w-full md:w-1/2' )} 
                />
            </form>
        </>
     );
}
 
export default FormLogin;