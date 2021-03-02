import Layout from "../components/layout/layout";
import ProtectRouter from '../config/protectRoutes';
import FormNewClient from '../components/clients/formNewClient';
const Clients = () => {
 
    return ( 
        <ProtectRouter>
            <Layout> 
                <FormNewClient />
            </Layout>
        </ProtectRouter>
     );
}
 
export default Clients;