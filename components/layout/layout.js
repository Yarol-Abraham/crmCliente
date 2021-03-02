import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import Sidebar from '../sidebar/sidebar';
import Header from "./header";
import Footer from "./footer";

const Layout = ({children}) => {
    const router = useRouter(); 
    return ( 
        <>
            <Head>
                <title>CRMwebApp</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
           {  
                router.pathname === '/' || router.pathname === '/createAccount' ? 
                    (
                        <main className="bg-gray-100 min-h-screen">
                            {children}
                        </main>
                    ) 
                    :
                    (
                        <div className="bg-gray-100 min-h-screen min-w-full flex flex-col sm:flex-row">
                            <Sidebar />
                            <div className="sm:absolute sm:right-0 w-full sm:w-4/6 lg:w-4/5 h-screen flex flex-col justify-between">
                                <Header />
                                    <main className="w-full h-4/5 ">
                                        {children}
                                    </main>
                                <Footer /> 
                            </div>
                        </div>
                    )  
           }
        </>
     );
}

Layout.propTypes = {
    children: PropTypes.element.isRequired
}

export default Layout;