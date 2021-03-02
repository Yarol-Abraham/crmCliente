import Layout from "../components/layout/layout";
import ProtectRouter from '../config/protectRoutes';
import GetAllClients from '../components/clients/getAllClients';

const Clients = () => {
 
    return ( 
        <ProtectRouter>
            <Layout>    
                <GetAllClients />
            </Layout>
        </ProtectRouter>
     );
}
 
export default Clients;