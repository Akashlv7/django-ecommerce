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

export const addressListReducer = (state = { address: [] }, action ) => {
    switch (action.type) {
        case ADDRESS_LIST_REQUEST:
            return { loading: true, address: [] }

        case ADDRESS_LIST_SUCCESS:
            return { loading: false, address: action.payload }

        case ADDRESS_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const editAddressReducer = (state = {address: []}, action) => {
    switch (action.type) {
        case ADDRESS_EDIT_REQUEST:
            return { loading: true}

        case ADDRESS_EDIT_SUCCESS:
            return { loading: false, address: action.payload }

        case ADDRESS_EDIT_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const addAddressReducer = (state = {address: []}, action) => {
    switch (action.type) {
        case ADDRESS_ADD_REQUEST:
            return { loading: true}

        case ADDRESS_ADD_SUCCESS:
            return { loading: false, address: action.payload }

        case ADDRESS_ADD_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}