import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const LinkNavigate = ({name, namePage}) => {
    const router = useRouter();
    return ( 
        <Link href={`/${namePage}`}>
            <a 
                className={`
                    ${router.pathname === "/"+namePage ? 
                        "border-b-2 border-gray-200" 
                        : "border-none"
                    }
                    text-base my-2 text-white sm:text-black
                  hover:bg-blue-300 
                    hover:bg-opacity-25 
                    text-opacity-75
                    transition duration-500 
                    rounded p-2
                    font-light tracking-wide
                    flex justify-between
                `}
            >
                <p>{name}</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
            </a>
        </Link>
     );
}
LinkNavigate.propTypes = {
    name: PropTypes.string.isRequired,
    namePage: PropTypes.string.isRequired
}
export default LinkNavigate;