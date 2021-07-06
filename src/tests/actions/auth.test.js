/**

* @jest-environment node

*/
import thunk from "redux-thunk";
import configureStore from 'redux-mock-store' //ES6 modules
import '@testing-library/jest-dom';
import { login, startLoginEmailPassword } from "../../actions/auth";
import { logout, startLogOut } from "../../actions/ui";
import { types } from "../../types/types";
import createMockStore from "redux-mock-store";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'TESTING'
    },
    notes: {
        active:{
            id: '0fUVj7N3ClvKaoyzhpbQ',
            title: 'Hello there!',
            body: 'Updating...'
        }
    }
}

let store = mockStore(initState);

global.scrollTo = jest.fn();

describe('Pruebas con las acciones de auth', () => {

    beforeEach(() =>{
        store = mockStore(initState);
    })

    test('Login y logout deben de crear las acciones respectivas', () => {
        
        const loginTest = login('123', 'Fernando');
        expect(loginTest).toEqual({
            type: types.login,
            payload: {
                uid: '123',
                displayName: 'Fernando'
            }
        });

        const logoutTest = logout();
        expect(logoutTest).toEqual({
            type: types.logout
        });

    });

    test('Debe de realizar el startLogout', async () => {
       
        await store.dispatch(startLogOut())
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.logout
        });

        expect(actions[1]).toEqual({
            type: types.notesLogoutCleaning
        });
        
    });

    test('Debe de iniciar startLoginEmailPassword ', async () => {
       
        await store.dispatch(startLoginEmailPassword('test@testing.com', '123456'));
        const actions = store.getActions();

        expect(actions[1]).toEqual({
            type: types.login,
            payload: {
                uid: 'pkw48TdGjHVwUJhhfXyqAIUBjYx1',
                displayName: null
            }
        })
        
    });
    
    
    
});


