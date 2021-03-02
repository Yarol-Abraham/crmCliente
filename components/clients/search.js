import { useState, useContext, useEffect } from 'react';

import ClientsContext from '../../context/clients/clientsContext';

import InputTextCSS from '../UI/InputText';
import ButtonCSS from '../UI/buttons';
import { titleh4CSS } from '../UI/Titles';
import SmallAlert from '../alerts/smallAlert';
import LoadingComponent from '../loadingComponent';

import { SEARCH_CLIENT_GQL } from '../../graphql/clients';
import { useLazyQuery } from '@apollo/client';

import PropTypes from 'prop-types';

const Search = ({ labelTitle }) => {
    const [ buscarClienteVendedor, { loading, data, error } ] = useLazyQuery(SEARCH_CLIENT_GQL);
    const clientsContext = useContext(ClientsContext);
    const { searchClient } = clientsContext;
    const [ search, setSearch ] = useState('');
    const handleChange = (e) =>{
        setSearch(e.target.value);
    };

    const handleClick = (search)=>{
        buscarClienteVendedor({
            variables: {
                email: search
            }
        });
        setSearch("");
    };

    useEffect(()=>{
        
        if(!loading){
            if(data){
                if(data.buscarClienteVendedor){
                    searchClient(data.buscarClienteVendedor);
                };
            };
          ;}
    },[loading, data]);

    return ( 
        <>
            <div className="bg-blue-50 px-4 w-full flex flex-col sm:flex-row sm:justify-center sm:items-center my-2">
               <h4 className={titleh4CSS}>{labelTitle}</h4>
               { loading ? <LoadingComponent /> : (
                   <>
                   <div className="w-full sm:w-1/2 md:w-1/3">
                        <input 
                            type="email"
                            placeholder="correo electronico"
                            className={InputTextCSS}
                            value={search}
                            onChange={ handleChange }
                        />
                    </div>
                    <button 
                        className={ButtonCSS('bg-blue-500', 'bg-blue-400' ,'w-40 sm:w-1/4 md:w-20 h-1/4 mb-2 sm:mb-0 flex justify-center' )}
                        onClick={()=> handleClick(search) }
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </button>
                 
                </>
               ) }
            </div>
            { error ? <SmallAlert descripcion={error.message} /> : null }
        </>
      );
}

Search.propTypes = {
    labelTitle: PropTypes.string.isRequired
}

export default Search;