import { finishLoading, removeError, setError, startLoading } from "../../actions/ui";
import { types } from "../../types/types";


describe('pruebas en ui-actions', () => {
    test('Set Error debe funcionar', () => {
        
        const action = setError('Help!');
        expect(action).toEqual({
            type: types.uiSetErrors,
            payload: 'Help!'
        });

    });

    test('removeError debe funcionar', () => {
        
        const action = removeError();
        expect(action).toEqual({
            type: types.uiRemoveErrors
        });

    });

    test('startLoading debe funcionar', () => {
        
        const action = startLoading();
        expect(action).toEqual({
            type: types.uiStartingLoading
        });

    });

    test('finishLoading debe funcionar', () => {
        
        const action = finishLoading();
        expect(action).toEqual({
            type: types.uiFinishLoading
        });

    });
    
    
});
