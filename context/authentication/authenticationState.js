import { useReducer } from 'react';

import AuthenticationContext from './authenticationContext';
import AuthenticationReducer from './authenticationReducer';

import { SUCESS_SESION_GQL } from '../../graphql/authentication';
import { useMutation } from '@apollo/client';

import {
    START_SESION,
    ERROR_SESION,
    GET_USER,
    SIGN_OFF
} from '../../types/authentication';

// import { useRouter } from 'next/router';
import Router from 'next/router';
const AuthenticationState = (props) => {
   
    const [ autenticacion ] = useMutation(SUCESS_SESION_GQL);

    const initialState = {
        authUser: null,
        authLoading: true,
        authSuccess: false,
        authFail: false,
        authMessage: ''
    };
    // const router = useRouter();
    const [state, dispatch] = useReducer(AuthenticationReducer, initialState);

    const authenticationUser = async (values)=>{
        try {
            const { data } = await autenticacion({
                variables: {
                    input: {
                       email: values.email,
                       password: values.password 
                    }
                }
            });
            localStorage.setItem('token', data.autenticacion.token);
            dispatch({
                type: START_SESION,
                payload: {
                    authLoading: false,
                    authSuccess: true,
                    authFail: false,
                    authMessage: ''
                }
            });
            Router.push('/home');
        } catch (error) {
            dispatch({
                type: ERROR_SESION,
                payload: {
                    authLoading: false,
                    authSuccess: false,
                    authFail: true,
                    authMessage: error.message
                }
            });
        }
    };   
    
    const getAuthUser = (data) =>{
        const { nombre, apellido, email } = data;
        dispatch({
            type: GET_USER,
            payload: {
                nombre,
                apellido,
                email
            }
        });
    };

    const signOff = () =>{
        dispatch({
            type: SIGN_OFF
        })
        Router.push("/");
    }

    return (
        <AuthenticationContext.Provider
            value={{
                authUser: state.authUser,
                authLoading: state.authLoading,
                authSuccess: state.authSuccess,
                authFail: state.authFail,
                authMessage: state.authMessage,
                authenticationUser,
                getAuthUser,
                signOff
            }}
        >
            {props.children}
        </AuthenticationContext.Provider>
      );
}
 
export default AuthenticationState;