import axios from "axios";
import { 
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,

    ORDER_LIST_ALL_REQUEST,
    ORDER_LIST_ALL_SUCCESS,
    ORDER_LIST_ALL_FAIL,

    ORDER_DELIVERED_REQUEST,
    ORDER_DELIVERED_SUCCESS,
    ORDER_DELIVERED_FAIL,
    ORDER_DELIVERED_RESET,

    ORDER_RAZOR_PAY_REQUEST,
    ORDER_RAZOR_PAY_SUCCESS,
    ORDER_RAZOR_PAY_FAIL,
} from "../constants/orderConstants";
import { CART_ITEMS_RESET } from "../constants/cartConstants";


export const createOrder = (order) => async (dispatch, getState) => {
    try{

        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(
            '/api/order/',
            order,
            config
        )

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

        dispatch({
            type: CART_ITEMS_RESET,
            payload: data
        })

        localStorage.removeItem('cartItems')

    }catch(error){
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}


export const getOrderDetails = (id) => async (dispatch, getState) => {
    try{

        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(
            `/api/order/${id}`,
            config
        )

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try{

        dispatch({
            type: ORDER_PAY_REQUEST
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(
            `/api/order/${id}/pay/`,
            paymentResult,
            config
        )

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}


export const startRazorPay = (paymentDetails) => async (dispatch, getState) => {
    try{

        dispatch({
            type: ORDER_RAZOR_PAY_REQUEST
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(
            `/api/razorpay/pay/`,
            paymentDetails,
            config
        )

        dispatch({
            type: ORDER_RAZOR_PAY_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: ORDER_RAZOR_PAY_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}


export const deliverOrder = (order_id) => async (dispatch, getState) => {
    try{

        dispatch({
            type: ORDER_DELIVERED_REQUEST
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(
            `/api/order/${order_id}/delivered/`,
            {},
            config
        )

        dispatch({
            type: ORDER_DELIVERED_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: ORDER_DELIVERED_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const getOrdersList = () => async (dispatch, getState) => {
    try{

        dispatch({
            type: ORDER_LIST_REQUEST
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(
            `/api/order/`,
            config
        )

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}


export const getAllOrders = () => async (dispatch, getState) => {
    try{

        dispatch({
            type: ORDER_LIST_ALL_REQUEST
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(
            '/api/order/allorders/',
            config
        )

        dispatch({
            type: ORDER_LIST_ALL_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: ORDER_LIST_ALL_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}