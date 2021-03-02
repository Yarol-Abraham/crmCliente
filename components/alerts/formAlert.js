import { formAlertCSS } from '../UI/alertas';
const FormAlert = ({descripcion, width, widthColor}) => {
    return ( 
        <p 
            className={formAlertCSS(width,widthColor)}
        >
        {descripcion}
        </p>
     );
}
 
export default FormAlert;