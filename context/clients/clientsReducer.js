
import { 
    GET_CLIENTS,
    NEW_CLIENT,
    ERROR_NEW_CLIENT,
    CLEAN_CLIENTS,
    SEARCH_CLIENT,
    REFRESCH_CLIENTS
} from '../../types/clients';

const ClientsReducer = (state, action) => {
    
    switch (action.type) {
        case REFRESCH_CLIENTS:
        case GET_CLIENTS:
            return{
                ...state,
                clients: action.payload
            }
        case NEW_CLIENT:
        case ERROR_NEW_CLIENT:
        case CLEAN_CLIENTS:
            return{
                ...state,
                clientSucess: action.payload.clientSucess,
                clientFail: action.payload.clientFail,
                clientMessage: action.payload.clientMessage
            }
        
        case SEARCH_CLIENT:
            return{
                ...state,
                clients:[action.payload]
            }
        
        default:
            return state;
    }
    
}
 
export default ClientsReducer;