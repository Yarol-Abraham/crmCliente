import { useContext, useState, useEffect } from 'react';

import { titleh1CSS } from '../UI/Titles';
import FormCSS from '../UI/form';
import ButtonCSS from '../UI/buttons';
import InputTextCSS from '../UI/InputText';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import SmallAlert from '../alerts/smallAlert';
// import FormAlert from '../alerts/formAlert';

import ProductsContext from '../../context/products/productsContext';

const FormNewProduct = () => {
    const productsContext = useContext(ProductsContext);
    const { 
        newProduct
    } = productsContext;
    const [ btnSubmit, setbtnSubmt ] = useState(false);
    const formik = useFormik({
        initialValues: {
            nombre: '',
            existencias: '',
            costo: '',
            precio: '',
            estado: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
            .required('Hace falta el nombre'),
            existencias: Yup.string()
            .required('Faltan las existencias'),
            costo: Yup.number()
            .required("El costo no puede ir vacio"),
            precio: Yup.number()
            .required("El precio no puede ir vacio"),
            estado: Yup.string()
            .required('El campo de estado esta vacio'),
        }),
        onSubmit: values =>{
            setbtnSubmt(true);
            console.log(values);
            newProduct(values);
        }
    });

    return ( 
        <>
        <div className="w-full h-full overflow-auto">
        <h1 className={titleh1CSS}>Nuevo producto</h1>
            <form 
                className={FormCSS('w-full sm:w-4/5 lg:w-1/2 overflow-auto m-auto')}
                onSubmit={formik.handleSubmit}
            >
                <input 
                    type="text" 
                    id="nombre"
                    placeholder="Nombre" 
                    className={InputTextCSS}
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                /> 

                 <input 
                    type="Number" 
                    id="existencias"
                    placeholder="existencias" 
                    className={InputTextCSS}
                    value={formik.values.existencias}
                    onChange={formik.handleChange}
                /> 
                <input 
                    type="Number" 
                    id="costo"
                    placeholder="costo" 
                    className={InputTextCSS}
                    value={formik.values.costo}
                    onChange={formik.handleChange}
                /> 
                <input 
                    type="Number" 
                    id="precio"
                    placeholder="precio" 
                    className={InputTextCSS}
                    value={formik.values.precio}
                    onChange={formik.handleChange}
                /> 
                <select
                     id="estado"
                     className={InputTextCSS}
                     value={formik.values.estado}
                     onChange={formik.handleChange}
                >
                    <option value="">--Seleccionar--</option>
                    <option value="ACTIVO" >ACTIVO</option>
                    <option value="INACTIVO">INACTIVO</option>
                </select>
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
                    disabled={btnSubmit}
                    value="Crear producto"
                    className={ButtonCSS('bg-blue-500', 'bg-blue-400' ,'w-full md:w-1/2' )} 
                />
            </form>
        </div>
        </>
     );
}
 
export default FormNewProduct;