import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe('Pruebas en authReducer', () => {
   
    test('types login debe retornar un uid y un name', () => {

        const action = {
            type: types.login,
            payload: {
                uid: '123456789',
                displayName: 'Fernando'
            }
        }
       
        const result = authReducer({}, action); 

       expect(result).toEqual({
           uid: action.payload.uid,
           name: action.payload.displayName
       });
        
    });

    test('should revoe the state and set it as a empty object', () => {
        const action = {
            type: types.logout,
            payload: ''
        }
        const state = {
            uid: '123456789',
            name: 'Fernando'
        }
        const result = authReducer(state, action);
        expect(result).toEqual({});
    });

    test('Debe devolver el mismo estado', () => {
       
        const state = {
            id: 123,
            name: 'Fernando'
        }

        const result = authReducer(state, 'colarota');

        expect(result).toEqual(state);
        
    });
    
    
    
    
});
