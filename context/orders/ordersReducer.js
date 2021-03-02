import {
    GET_ALL_ORDERS,
    SELECT_CLIENT,
    SELECT_PRODUCT,
    DATA_PAYMENT,
    CALCULATE_TOTAL,
    NEW_ORDER,
    ERROR_ORDER
} from '../../types/orders';

const OrdersReducer = (state, action) => {
    
    switch (action.type) {
    
        case GET_ALL_ORDERS:
            return{
                ...state,
                orders: action.payload
            }

        case SELECT_CLIENT:
            return{
                ...state,
                ordersClient: action.payload
            }

        case SELECT_PRODUCT:
            return{
                ...state,
                ordersProducts: action.payload
            }
        
        case DATA_PAYMENT: 
            return{
                ...state,
                ordersProducts: state.ordersProducts.map( prod => prod._id === action.payload._id ? prod = action.payload : prod )
            }
        
        case CALCULATE_TOTAL:
            return{
                ...state,
                ordersTotalNeto: state.ordersProducts.reduce((sum, art)=> sum += art.totalPrice, 0 ),
                ordersIva: state.ordersProducts.reduce((sum, art)=> sum += art.iva, 0 ),
                ordersTotal: state.ordersProducts.reduce((sum, art)=> sum += art.total, 0 ),
                ordersQuantity: state.ordersProducts.reduce((sum, art)=> sum += art.addQuantity, 0 ),
                ordersStocks:state.ordersProducts.reduce((sum, art)=> sum += art.existencias, 0 )
            }
        
        case NEW_ORDER:
            return{
                ...state,
                ordersClient: {},
                ordersProducts: [],
                ordersIva: 0,
                ordersTotalNeto: 0,
                ordersTotal: 0
            }
        
        case ERROR_ORDER:
            return{
                ...state,
                ordersProducts: [],
                ordersIva: 0,
                ordersTotalNeto: 0,
                ordersTotal: 0
            }

        default:
            return state;
    }
    
}
 
export default OrdersReducer;