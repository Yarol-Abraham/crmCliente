
import Layout from '../components/layout/layout';
import Template from '../components/login&Account/template';

const Login = () => {
    return ( 
        <Layout>
            <Template
                title="Iniciar Sesión"
                href="/createAccount"
                descripcion="No tienes una cuenta? "
                textLink="crea una."
            />
        </Layout>
     );
}
 
export default Login;
