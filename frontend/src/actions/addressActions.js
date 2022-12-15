import axios from "axios";
import { 
    ADDRESS_LIST_REQUEST,
    ADDRESS_LIST_SUCCESS,
    ADDRESS_LIST_FAIL,

    ADDRESS_EDIT_REQUEST,
    ADDRESS_EDIT_SUCCESS,
    ADDRESS_EDIT_FAIL,

    ADDRESS_ADD_REQUEST,
    ADDRESS_ADD_SUCCESS,
    ADDRESS_ADD_FAIL,
} from '../constants/adressConstants'


export const getAddresses = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: ADDRESS_LIST_REQUEST
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get('/api/address/', config)

        dispatch({
            type: ADDRESS_LIST_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: ADDRESS_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const editAddress = (formData) => async (dispatch, getState) => {
    try{

        dispatch({
            type: ADDRESS_EDIT_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put('/api/address/', formData, config)

        dispatch({
            type: ADDRESS_EDIT_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: ADDRESS_EDIT_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const addAddress = (formData) => async (dispatch, getState) => {
    try{

        dispatch({
            type: ADDRESS_ADD_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post('/api/address/', formData, config)

        dispatch({
            type: ADDRESS_ADD_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: ADDRESS_ADD_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}