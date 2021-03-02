import Link from 'next/link';
import { titleh3CSS } from '../UI/Titles'; 
const Footer = () => {
    const year = new Date().getFullYear();
    return ( 
    <>
        <footer className="bg-gray-800 text-center sm:bg-white p-2 flex flex-col sm:flex-row sm:justify-between">
            <p className="font-light tracking-wide text-white sm:text-black">&copy;Copyright {year}</p>
            <Link href={"/"}><h3 className={`cursor-pointer ${titleh3CSS}`}>CRM Clientes</h3></Link>
        </footer>
    </>
    );
}
 
export default Footer;