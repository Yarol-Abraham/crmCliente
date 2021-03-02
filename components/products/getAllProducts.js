import { useContext, useEffect, useState } from 'react';

import { titleh1CSS } from '../UI/Titles';
import ButtonCSS from '../UI/buttons';
import FormAlert from '../alerts/formAlert';
import LoadingComponent from '../loadingComponent';

import { GET_ALL_PRODUCTS_GQL } from '../../graphql/products';
import { useQuery } from '@apollo/client';

import ProductsContext from '../../context/products/productsContext';
import LinkPage from '../linkPage';
import SearchProduct from './search';

import Product from './product';

const GetAllProducts = () => {
    const { data, loading, error } = useQuery(GET_ALL_PRODUCTS_GQL,  {
        fetchPolicy: 'cache-and-network'
      });
    const productsContext = useContext(ProductsContext);
    const {
        products,
        getAllProducts,
        refreschProducts
    }  = productsContext;

    const [ copyProducts, setcopyProducts ] = useState(null);
    const [ conditionProducts, setconditionProducts ] = useState(true);

    const handleRefresch = () =>{
        refreschProducts(copyProducts);
    }; 

    useEffect(()=>{
        if(!loading){
          if(data.obtenerProductos){
            getAllProducts(data.obtenerProductos);
            if(conditionProducts){
                setcopyProducts(data.obtenerProductos);
                setconditionProducts(false);
            }
          }
        }
       
    }, [data, loading]);

   return ( 
        <>
            { loading ? <LoadingComponent /> : (
                <div className="w-full h-full overflow-auto">
                    <h1 className={titleh1CSS}>Listado de productos</h1> 
                    <div className="w-full flex flex-col">
                        <LinkPage name="Nuevo producto" namePage="newProduct" />
                            <SearchProduct labelTitle="Buscar" /> 
                        <button 
                                className={ButtonCSS('bg-yellow-500', 'bg-yellow-400' ,'w-1/4 sm:w-1/4 md:w-20 h-1/4 flex justify-center' )}
                                    onClick={handleRefresch}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"  className="w-6">
                                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                </svg>
                        </button>
                    </div>
                  
                    {
                        products ? 
                        <div className="w-full overflow-auto p-4">
                            <table  className="table-auto bg-white shadow-md w-full w-lg">
                                <thead>
                                    <tr>
                                        <th className="text-gray-500 text-xs border-b-2 uppercase p-2" >Nombre</th>
                                        <th className="text-gray-500 text-xs border-b-2 uppercase p-2">Existencias</th>
                                        <th className="text-gray-500 text-xs border-b-2 uppercase p-2">Costo</th>
                                        <th className="text-gray-500 text-xs border-b-2 uppercase p-2">Precio</th>
                                        <th className="text-gray-500 text-xs border-b-2 uppercase p-2">Estado</th>
                                        <th className="text-gray-500 text-xs border-b-2 uppercase p-2">Acciones</th>
                                    </tr>
                                </thead>
                                { products.map(product =>(   
                                    <Product key={product._id} product={product} />
                                )) }
                            </table>
                        </div>
                        :   <FormAlert 
                                descripcion="No tienes productos agregados"
                                width="w-full"
                                widthColor="bg-yellow-400"
                            />
                     }
                </div>
           ) }
        </>
    );
}
 
export default GetAllProducts;