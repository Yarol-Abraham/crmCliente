import { useReducer } from 'react';

import UsuariosContext from './usuariosContext';
import UsuariosReducer from './usuariosReducer';

import { NEW_ACCOUNT_GQL } from '../../graphql/usuarios';
import { useMutation } from '@apollo/client';

import { 
    NEW_USER,
    FAIL_USER,
    CLEAR_ALERT
} from '../../types/usuarios';

const UsuariosState = (props) => {
    
    const [ nuevoUsuario ] = useMutation(NEW_ACCOUNT_GQL);
    
    const initialState = {
        user: null,
        userLoading: true,
        userSuccess: false,
        userFail: false,
        userMessage: ''
    };
    const [state, dispatch] = useReducer(UsuariosReducer, initialState);

    const createAccount = async (values) =>{     
        try {
            const { data } = await nuevoUsuario({
                variables: {
                    input: {
                       nombre: values.nombre,
                       apellido: values.apellido,
                       email: values.email,
                       password: values.password 
                    }
                }
            });
            dispatch({
                type:NEW_USER,
                payload: {
                    userLoading: false,
                    userSuccess: true,
                    userFail: false,
                    userMessage: `Ya puedes iniciar sesión con: ${data.nuevoUsuario.email}`
                }
            });
        } catch (error) {
            dispatch({ 
                type:FAIL_USER, 
                payload: {
                    userLoading: false,
                    userFail: true,
                    userSuccess: false,
                    userMessage: error.message
                }
            })
        }
    }; 
   const clearAlert = () =>{
       dispatch({ type: CLEAR_ALERT });
   }
    return ( 
        <UsuariosContext.Provider
            value={{
                usuario: state.usuario,
                userLoading: state.userLoading,
                userSuccess: state.userSuccess,
                userFail: state.userFail,
                userMessage: state.userMessage,
                createAccount,
                clearAlert
            }}
        >
            {props.children}
        </UsuariosContext.Provider>
     );
}
 
export default UsuariosState;