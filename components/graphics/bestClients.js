
import { titleh1CSS, titleh2CSS } from '../UI/Titles';
import  BestClientCSS  from "./bestClients.module.css";
import ErrorComponent from '../alerts/Error';
import LoadingComponent from '../loadingComponent';
import FormAlert from '../alerts/formAlert';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

import { BEST_CLIENTS_GQL } from '../../graphql/graphics';

import { useQuery } from '@apollo/client';

const BestsClients = () => {

    const { data, loading, error } = useQuery(BEST_CLIENTS_GQL,  {
        fetchPolicy: 'cache-and-network'
      });

    if(loading) return <LoadingComponent />
    if(error) return <ErrorComponent />
    const { mejoresClientes } = data;

    let clienteGrafica = [];

    mejoresClientes.map((cliente, i)=>{
        clienteGrafica[i] = {
            ...cliente.cliente[0],
            total: cliente.total
        }
    })

    return ( 
        <>
        <h1 className={titleh1CSS} >Inicio / graficas</h1>
        <div className="w-full flex justify-center items-center flex-col overflow-auto">
            <h2 className={titleh2CSS}>Mejores clientes</h2>
                <>
                {mejoresClientes.length > 0 ? 
                (
                    <ResponsiveContainer 
                    width={'99%'}
                    height={350}
                 >
                    <BarChart
                    className={BestClientCSS.bestClients}
                        width={800}
                        height={300}
                        data={clienteGrafica}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nombre" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#3B82F6" />
                </BarChart> 
                </ResponsiveContainer>
                )
                : <FormAlert 
                    descripcion={"Aun no tienes pedidos creados para ver las graficas"}
                    width="w-full"
                    widthColor="bg-green-500"
                />
            }
            </>
               
                
        </div>
        </>
     );
}
 
export default BestsClients;