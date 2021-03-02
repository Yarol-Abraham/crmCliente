import { useState } from 'react';
import Navigate from './navigate';
import SignOff from './signOff';

const Sidebar = () => {

    const [ visibleMenu, setvisibleMenu ] = useState(false);
    const [ open, setOpen ] = useState(1);
    const handleClick = ()=>{
        if(open === 1){
            setvisibleMenu(true);
            setOpen(0);
        }else{
            setvisibleMenu(false);
            setOpen(1);
        }
    };

    return ( 
    <>
        <aside 
            className={`
            bg-gray-800 sm:bg-white h-full p-4 fixed ${visibleMenu ? 'top-16' : 'hidden' }
                sm:block sm:p-2 sm:w-2/6 lg:w-1/5 sm:top-0 left-0 z-100`
            }
        >
            <Navigate />
        </aside> 
            <div className="bg-gray-800 sticky top-0 p-5 
                            flex flex-row justify-between 
                            items-center sm:hidden "
            >
                <button 
                    onClick={handleClick}
                    className="flex flex-col w-12 focus:outline-none border-none "
                >
                    <span className="w-full mb-2 border-b-4 border-white-500" ></span>
                    <span className="w-full mb-2 border-b-4 border-white-500" ></span>
                    <span className="w-full mb-2 border-b-4 border-white-500" ></span>
                </button>
                <SignOff nameComponent="sidebar" />
           </div>       
    </>
     );
}
 
export default Sidebar;