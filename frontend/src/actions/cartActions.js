import axios from 'axios'
import { 
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_ADD_SHIPPING_ADDRESS,
    CART_ADD_PAYMENT_METHOD,
} from '../constants/cartConstants'


export const addToCart = (product_id, qty) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${product_id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (product_id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: product_id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const addShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_ADD_SHIPPING_ADDRESS,
        payload: data
    })
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const addPaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_ADD_PAYMENT_METHOD,
        payload: data
    })
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}