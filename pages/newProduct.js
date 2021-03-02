import Layout from "../components/layout/layout";
import ProtectRouter from '../config/protectRoutes';
import FormNewProduct from '../components/products/formNewProduct';
const Clients = () => {
 
    return ( 
        <ProtectRouter>
            <Layout> 
                <FormNewProduct />
            </Layout>
        </ProtectRouter>
     );
}
 
export default Clients;