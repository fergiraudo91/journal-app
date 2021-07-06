import { RegisterScreen } from "../../../components/auth/RegisterScreen";
import React from 'react';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import configureStore from 'redux-mock-store' //ES6 modules
import { mount } from "enzyme";
import { MemoryRouter } from 'react-router';
import { types } from "../../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msError: null
    }
}

let store = mockStore(initState);

describe('Pruebas en <RegisterScreen/>', () => {

    const wrapper = mount(
      
        <Provider store  = {store}>
            <MemoryRouter>
                <RegisterScreen/>
            </MemoryRouter>
        </Provider>
        
    );
   
    test('Debe mostrarse correctamente', () => {
        
        expect(wrapper).toMatchSnapshot();

    });
    
    test('Debe de hacer el dispatch de la accion respectiva ', () => {
       
        const emailField = wrapper.find('input[name="email"]');
        emailField.simulate('change', {
            target: '',
            name: 'email'
        });

        wrapper.find('form').simulate('submit');

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.uiSetErrors,
            payload: 'Name is required'
        });

    });

    test('Debe de mostrar la caja de alerta con el error', () => {

        const initState = {
            auth: {},
            ui: {
                loading: false,
                msError: 'Email no es correcto'
            }
        }

        let store = mockStore(initState);

        const wrapper = mount(
      
            <Provider store  = {store}>
                <MemoryRouter>
                    <RegisterScreen/>
                </MemoryRouter>
            </Provider>
        );


        expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
        expect(wrapper.find('.auth__alert-error').text().trim()).toBe(initState.ui.msError);
        
    })
    
    
    
});
