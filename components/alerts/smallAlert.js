import { smallAlertCSS } from '../UI/alertas';
import PropTypes from 'prop-types';

const SmallAlert = ({ descripcion }) => {
    return ( 
        <p className={smallAlertCSS}>{descripcion}</p>
     );
}

SmallAlert.propTypes = {
    descripcion: PropTypes.string.isRequired
}

export default SmallAlert;