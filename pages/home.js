import Layout from "../components/layout/layout";
import ProtectRouter from '../config/protectRoutes';
import BestsClients from '../components/graphics/bestClients';
const Home = () => {

  return (
    <>
      <ProtectRouter>
        <Layout>
              <BestsClients />
        </Layout>
      </ProtectRouter>
    </>
  )
}
 
export default Home;