import { useContext, useState } from 'react';
import AuthenticationContext from '../../context/authentication/authenticationContext';

const SignOff = ({ nameComponent }) => {
    
    const authenticationContext = useContext(AuthenticationContext);
    const { authUser, signOff } = authenticationContext;
    const [ visibleinfoUser, setvisibleinfoUser ] = useState(false);
    const [ openInfoUser, setOpenInfoUser ] = useState(1);
 
    const handleInfoUser = () =>{
        if(openInfoUser === 1){
            setvisibleinfoUser(true);
            setOpenInfoUser(0);
        }else{
            setvisibleinfoUser(false);
            setOpenInfoUser(1);
        }
    }

    return ( 
        <>
          {authUser ? (
                <>
                    <button 
                        className={`text-white font-medium focus:outline-none border-none p-2`}
                        onClick={handleInfoUser}
                        >
                        {authUser.nombre + ' ' + authUser.apellido}
                    </button>
                    <div
                        className={`bg-gray-800 sm:bg-gray-100 text-white sm:text-black fixed ${nameComponent === 'header' ? 'sm:w-1/6' : 'w-full h-1/4 p-4 left-0'} ${visibleinfoUser? 'sm:rounded-lg sm:shadow-lg sm:top-10 top-16' : 'hidden' } flex flex-col`}
                    >
                        <button className="sm:text-base hover:bg-blue-100 hover:bg-opacity-25 text-opacity-75 transition duration-500  text-xl p-2 border-b-2" onClick={()=> signOff() }>cerrar sesion</button>
                    </div>
                </>
                ) : null }
        </>
     );
}
 
export default SignOff;