import axios from 'axios'
import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,

    PRODUCT_EDIT_REQUEST,
    PRODUCT_EDIT_SUCCESS,
    PRODUCT_EDIT_FAIL,
    PRODUCT_EDIT_RESET,

    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,

    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
    PRODUCT_TOP_RESET,
 } from "../constants/productConstants"

export const listProducts = (keyword = '') => async (dispatch) => {
    try{
        dispatch({
            type: PRODUCT_LIST_REQUEST
        })

        const {data} = await axios.get(`/api/products${keyword}`)
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const listProductDetails = (product_id) => async (dispatch) => {
try{
    dispatch({
        type: PRODUCT_DETAILS_REQUEST
    })

    const {data} = await axios.get(`/api/products/${product_id}/`)
    dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data
    })
}catch(error){
    dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message
    })
}
}


export const deleteProduct = (product_id) => async (dispatch, getState) => {
try{
    dispatch({
        type: PRODUCT_DELETE_REQUEST
    })

    const { userLogin: {userInfo} } = getState()

    const config = {
        headers: {
            // 'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const {data} = await axios.delete(
        `/api/products/${product_id}/`,
        config
        )
    dispatch({
        type: PRODUCT_DELETE_SUCCESS,
    })
}catch(error){
    dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message
    })
}
}

export const createProduct = () => async(dispatch, getState) => {

    try{

        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })


        const {userLogin: {userInfo}} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(
            '/api/products/',
            {},
            config
        )

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })


    }catch(error){
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }

}

export const editProduct = (product_id, product) => async(dispatch, getState) => {

    try{

        dispatch({
            type: PRODUCT_EDIT_REQUEST
        })


        const {userLogin: {userInfo}} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(
            `/api/products/${product_id}/`,
            product,
            config
        )

        dispatch({
            type: PRODUCT_EDIT_SUCCESS,
            payload: data
        })

        // dispatch({
        //     type: PRODUCT_DETAILS_SUCCESS,
        //     payload: data
        // })


    }catch(error){
        dispatch({
            type: PRODUCT_EDIT_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }

}


export const createReview = (review) => async(dispatch, getState) => {

    try{

        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        })


        const {userLogin: {userInfo}} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(
            `/api/products/review/`,
            review,
            config
        )

        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: data
        })


    }catch(error){
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }

}


export const listTopProducts = () => async (dispatch) => {
    try{
        dispatch({
            type: PRODUCT_TOP_REQUEST
        })

        const {data} = await axios.get('/api/products/top/')
        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}