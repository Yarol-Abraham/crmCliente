
import {
    NEW_USER,
    FAIL_USER,
    CLEAR_ALERT
 } from '../../types/usuarios';

const UsuariosReducer = (state, action) => {  
      switch (action.type) {
        case NEW_USER:
            return{
                ...state,
                userLoading: action.payload.userLoading,
                userSuccess: action.payload.userSuccess,
                userFail: action.payload.userFail,
                userMessage: action.payload.userMessage
            }
        
        case FAIL_USER:
            return{
                ...state,
                userLoading: action.payload.userLoading,
                userFail: action.payload.userFail,
                userSuccess:action.payload.userSuccess,
                userMessage: action.payload.userMessage
            }
        
        case CLEAR_ALERT:
            return{
                ...state,
                userLoading: true,
                userSuccess: false,
                userFail: false,
                userMessage: '',
            }

        default:
            return state;
      };  
};
 
export default UsuariosReducer;