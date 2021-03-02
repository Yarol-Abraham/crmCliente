import Layout from "../components/layout/layout";
import ProtectRouter from '../config/protectRoutes';
import GetAllOrders from '../components/orders/getAllOrders';

const Pedidos = () => {
    return (
        <ProtectRouter > 
            <Layout>
                <GetAllOrders />
            </Layout>
        </ProtectRouter>
     );
}
 
export default Pedidos;