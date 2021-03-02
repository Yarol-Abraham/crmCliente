import LinkNavigate from './linkNavigate';
import Link from 'next/link';
import { titleh3CSS } from '../UI/Titles'; 

const Navigate = () => {
    return ( 
        <>
            <Link href={"/home"}><h3 className={`cursor-pointer ${titleh3CSS}`}>CRM Clientes</h3></Link>
            <nav className="flex flex-col">
                <LinkNavigate name="Clientes" namePage="clients" />
                <LinkNavigate name="Pedidos" namePage="orders" />
                <LinkNavigate name="Productos" namePage="products" />
            </nav>
        </>
     );
}
 
export default Navigate;