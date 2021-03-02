import { useEffect, useContext } from 'react';

import AuthenticationContext from '../context/authentication/authenticationContext';

import LoadingComponent from '../components/loadingComponent';
import { useRouter } from 'next/router';
import { AUTH_USER_GQL } from '../graphql/authentication';
import { useQuery } from '@apollo/client';

const ProtectRouter = ({ children }) => {
    const { data, loading, error } = useQuery(AUTH_USER_GQL, {
        fetchPolicy: "no-cache"
      });
    const authenticationContext = useContext(AuthenticationContext);
    const { getAuthUser } = authenticationContext;
    const router = useRouter();
    useEffect(() => {
        if(!loading){
            if(!data.obtenerUsuarioAutenticado){
                router.push('/');
            }else{
                getAuthUser(data.obtenerUsuarioAutenticado)
            }
        };
    }, [data, loading, error]);

    if(loading) return <LoadingComponent />

    return (
        <>
        {
            data.obtenerUsuarioAutenticado ? children : null
        }
        </>
    )
}

export default ProtectRouter;