import Layout from '../components/layout/layout';
import Template from '../components/login&Account/template';

const CreateAccount = () => {
    return ( 
        <Layout>
            <Template
                title="Crear una cuenta"
                href="/"
                descripcion="ya tienes una cuenta? "
                textLink="inicia Sesión."
            />
        </Layout>
     );
}
 
export default CreateAccount;