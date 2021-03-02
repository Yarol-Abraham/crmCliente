
import {
    START_SESION,
    ERROR_SESION,
    GET_USER,
    SIGN_OFF
} from '../../types/authentication';

const AuthenticationReducer = (state, action) => {
    
    switch (action.type) {
        case START_SESION:
            return{
                ...state,
                authLoading: action.payload.authLoading,
                authSuccess: action.payload.authSuccess,
                authFail: action.payload.authFail,
                authMessage: action.payload.authMessage
            }
        case ERROR_SESION:
            localStorage.removeItem("token");
            return{
                ...state,
                authLoading: action.payload.authLoading,
                authSuccess: action.payload.authSuccess,
                authFail: action.payload.authFail,
                authMessage: action.payload.authMessage
            }

        case GET_USER:
            return{
                ...state,
                authUser: action.payload
            }
        
        case SIGN_OFF:
            localStorage.removeItem("token");
            return{
                ...state,
                authUser: null,
                authLoading: true,
                authSuccess: false,
                authFail: false,
                authMessage: ''
            }

        default:
            return state;
    }
    
}
 
export default AuthenticationReducer;