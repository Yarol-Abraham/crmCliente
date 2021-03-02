import { useState, useEffect } from 'react';

import InputTextCSS from '../UI/InputText';

const GetDate = () => {

    const [ geDate, setDate ] = useState("");

    useEffect(() => {
        let fecha = new Date();
        setDate(`${fecha.getDate()}/${fecha.getMonth()+1}/${fecha.getFullYear()}`)
    }, [])

    return (
        <div>
            <p className="text-base font-thin">Fecha</p>
            <input 
                disabled={true}
                name="invoceNumber"
                type="text" 
                className={InputTextCSS}
                value={geDate}
            />
        </div>
      );
}
 
export default GetDate;