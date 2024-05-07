
import { SHOP_CART } from '../utils/constant';

const initState = {
    listCartItem: [],
    dataVoucher: {},
    dataTypeShip: {}
}

const shopCartReducer = (state = initState, action) => {
    switch (action.type) {
        case SHOP_CART.ADD_ITEM_CART_SUCCESS:
            {
                return {
                    ...state,
                }
            }
        case SHOP_CART.ADD_ITEM_CART_FAILD:
            {
                return {
                    ...state,
                }
            }
        case SHOP_CART.GET_ITEM_CART_SUCCESS:
            {
                let copyState = { ...state }
                copyState.listCartItem = action.data

                return {
                    ...copyState,
                }
            }
        case SHOP_CART.GET_ITEM_CART_FAILD:
            {
                state.listCartItem = []
                return {
                    ...state,
                }
            }
        case SHOP_CART.CHOOSE_VOUCHER_START:
            {
                let copyState = { ...state }
                copyState.dataVoucher = action.data
                return {
                    ...copyState,
                }
            }
        case SHOP_CART.CHOOSE_TYPESHIP_START:
            {
                let copyState = { ...state }
                copyState.dataTypeShip = action.data
                return {
                    ...copyState,
                }
            }
        default:
            return state
    }
}

export default shopCartReducer