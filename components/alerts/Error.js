import Image from 'next/image'
import { titleh1CSS } from '../UI/Titles';
const ErrorComponent = () => {
    return ( 
    <>
        <div className="w-full h-full flex flex-col items-center justify-center">
            <img src="/images/error.svg" className="w-full sm:w-1/2" />
            <h1 className={titleh1CSS}>Lo sentimos ha ocurrido un error inesperado</h1>
        </div>
    </>
    );
}
 
export default ErrorComponent;