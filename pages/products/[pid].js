import { useContext, useState } from 'react';

import PorductsContext from '../../context/products/productsContext';

import Layout from "../../components/layout/layout";
import ProtectRouter from '../../config/protectRoutes';
import { useRouter } from 'next/router';

import { titleh1CSS } from '../../components/UI/Titles';
import FormCSS from '../../components/UI/form';
import ButtonCSS from '../../components/UI/buttons';
import InputTextCSS from '../../components/UI/InputText';
import LoadingComponent from '../../components/loadingComponent';

import SmallAlert from '../../components/alerts/smallAlert';

import { GET_PRODUCT_GQL } from '../../graphql/products';
import { useQuery } from '@apollo/client';

import { Formik } from 'formik';
import * as Yup from 'yup';

const Products = () => {
    
    const porductsContext = useContext(PorductsContext);
    const {
        updateProduct
    } = porductsContext;
    const [ btnSubmit, setbtnSubmt ] = useState(false);
    const router = useRouter();
    const { query: { pid } } = router;

    const { data, loading } = useQuery(GET_PRODUCT_GQL, {
        variables: {
            _id: pid
        }
    });

    const schemaValidate = Yup.object({
        nombre: Yup.string()
        .required('Hace falta el nombre'),
        existencias: Yup.string()
        .required('Especifica las existencias'),
        costo: Yup.number()
        .required("El costo no puede ir vacio"),
        precio: Yup.number()
        .required("El precio no puede ir vacio"),
        estado: Yup.string()
        .required("El estado no puede ir vacio")
    });

    return ( 
        <ProtectRouter>
            <Layout> 
            { loading ? <LoadingComponent /> : (
                <div className="w-full h-full overflow-auto">
                <h1 className={titleh1CSS}>Editar producto</h1>
                <Formik
                validationSchema={schemaValidate}
                enableReinitialize
                initialValues={data.obtenerProducto}
                onSubmit={(values)=>{
                    setbtnSubmt(true);
                    updateProduct(values);
                }}
            >
                { props =>{
                    return (
                        <form 
                        className={FormCSS('w-full sm:w-4/5 lg:w-1/2 overflow-auto m-auto')}
                         onSubmit={props.handleSubmit}
                    >
                         <input 
                            type="text" 
                            id="nombre"
                            placeholder="Nombre" 
                            className={InputTextCSS}
                            value={props.values.nombre}
                            onChange={props.handleChange}
                        /> 

                        <input 
                            type="Number" 
                            id="existencias"
                            placeholder="existencias" 
                            className={InputTextCSS}
                            value={props.values.existencias}
                            onChange={props.handleChange}
                        /> 
                        <input 
                            type="Number" 
                            id="costo"
                            placeholder="costo" 
                            className={InputTextCSS}
                            value={props.values.costo}
                            onChange={props.handleChange}
                        /> 
                        <input 
                            type="Number" 
                            id="precio"
                            placeholder="precio" 
                            className={InputTextCSS}
                            value={props.values.precio}
                            onChange={props.handleChange}
                        /> 
                        <select
                            id="estado"
                            className={InputTextCSS}
                            value={props.values.estado}
                            onChange={props.handleChange}
                        >
                            <option value="">--Seleccionar--</option>
                            <option value="ACTIVO" >ACTIVO</option>
                            <option value="INACTIVO">INACTIVO</option>
                        </select>
                        { 
                            Object.keys(props.touched).length > 0 
                            && Object.keys(props.errors).length > 0 ?
                            <SmallAlert 
                                descripcion={`${ Object.values(props.errors).join(', ')}`} 
                            />    
                            : null
                        } 
                        <div className="w-full flex flex-col md:flex-row lg:justify-center">
                            <input 
                                type="submit" 
                                disabled={btnSubmit}
                                value="Guardar cambios"
                                className={ButtonCSS('bg-blue-500', 'bg-blue-400' ,'w-full md:w-1/2 lg:w-1/3' )} 
                            />
                        </div>
                    </form>
                    )
                } }
              
            </Formik>
        </div>
            )}
            
            </Layout>
        </ProtectRouter>
     );
}
 
export default Products;