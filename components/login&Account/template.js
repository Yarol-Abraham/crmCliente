import FormLogin from './formLogin';
import FormAccount from './formAccount';

import { titleh2CSS } from '../UI/Titles';

import { useRouter } from 'next/router';

import PropTypes from 'prop-types';

const Template = ({ title, href, descripcion, textLink }) => {
    const router = useRouter();
    const handleClick = (e) => {
        e.preventDefault();
        router.push(href);
    }

    return ( 
        <>
            <div className="
                    min-h-screen w-full 
                    flex flex-col justify-center items-center"
            >
            <h2 className={titleh2CSS}>{title}</h2>
            { router.pathname === '/' ? <FormLogin /> : null }
            { router.pathname === '/createAccount' ? <FormAccount /> : null }
            <p>{descripcion}
                <a 
                    href={href} 
                    onClick={handleClick}
                    className="text-blue-400"
                >{textLink}</a> 
            </p>
         </div>
        </>
     );
}
Template.propTypes = {
    title: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    textLink: PropTypes.string.isRequired
}
export default Template;