
import { 
    GET_ALL_PRODUCTS,
    SEARCH_PRODUCTS,
    REFRESCH_PRODUCTS
} from '../../types/products';

const ProductsReducer = (state, action) => {
    
    switch (action.type) {
        case REFRESCH_PRODUCTS:
        case SEARCH_PRODUCTS:
        case GET_ALL_PRODUCTS:
            return{
                ...state,
                products: action.payload
            }

        default:
            return state;
    }

}
 
export default ProductsReducer;