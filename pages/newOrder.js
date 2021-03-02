import Layout from "../components/layout/layout";
import ProtectRouter from '../config/protectRoutes';
import FormNewOrden from '../components/orders/formNewOrder';

const NewOrder = () => {
    return ( 
        <ProtectRouter>
            <Layout>
                <FormNewOrden />
            </Layout>
        </ProtectRouter>
     );
}
 
export default NewOrder;