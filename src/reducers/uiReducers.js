import { types } from "../types/types";

const initialstate = {
    loading: false,
    msError: null
}


export const uiReducer = (state = initialstate, action) => {

    switch (action.type) {
        case types.uiSetErrors: 
            return{
                ...state,
                msError: action.payload
            }

        case types.uiRemoveErrors:
            return{
                ...state,
                msError: null
            }
        
        case types.uiStartingLoading:
            return {
                ...state,
                loading: true
            }

        case types.uiFinishLoading:
            return{
                ...state,
                loading: false
            }
    
        default:
            return state;
    }

}