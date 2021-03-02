import '../styles/tailwind.css';

import UsuariosState from '../context/usuarios/ususariosState';
import AuthenticationState from '../context/authentication/authenticationState';
import ClientsState from '../context/clients/clientsState';
import ProductsState from '../context/products/productsState';
import OrdersState from '../context/orders/ordersState';

import { ApolloProvider } from '@apollo/client';
import Client from '../config/apollo';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider
      client={Client}
    >
    <AuthenticationState>
      <UsuariosState>
        <ClientsState>
          <ProductsState>
            <OrdersState>
              <Component {...pageProps}/>
            </OrdersState>  
          </ProductsState>
        </ClientsState>
      </UsuariosState>
    </AuthenticationState>
    </ApolloProvider>
    )
}

export default MyApp
