import Link from 'next/link';
import PropTypes from 'prop-types';
import ButtonCSS from './UI/buttons';
const LinkPage = ({name, namePage}) => {
    return ( 
        <Link href={`/${namePage}`}>
            <a 
                className={ButtonCSS('bg-blue-400', 'bg-blue-300', 'w-40 sm:w-1/2 md:w-1/4 lg:w-1/5')}
            >{name}
            </a>
        </Link>
     );
}
LinkPage.propTypes = {
    name: PropTypes.string.isRequired,
    namePage: PropTypes.string.isRequired
}
export default LinkPage;