import Layout from "../components/layout/layout";
import ProtectRouter from '../config/protectRoutes';
import GetAllProducts from '../components/products/getAllProducts';

const Productos = () => {
    return ( 
        <ProtectRouter>
        <Layout>    
            <GetAllProducts />
        </Layout>
    </ProtectRouter>
     );
}
 
export default Productos;