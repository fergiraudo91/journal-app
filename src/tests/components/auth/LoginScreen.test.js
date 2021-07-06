import React from 'react';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import configureStore from 'redux-mock-store' //ES6 modules
import { mount } from "enzyme";
import { LoginScreen } from "../../../components/auth/LoginScreen";
import { MemoryRouter } from 'react-router';
import { googleLogin, startLoginEmailPassword } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => {
    return {
        googleLogin: jest.fn(),
        startLoginEmailPassword: jest.fn()
    }
});

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

store.dispatch = jest.fn();

describe('Pruebas en LoginScreen', () => {

    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    })


    const wrapper = mount(

        <Provider store={store}>
            <MemoryRouter>
                <LoginScreen />
            </MemoryRouter>
        </Provider>
    );

    test('Debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de disparar la accion startLoginScreen', () => {

        wrapper.find('.google-btn').prop('onClick')();
        expect(googleLogin).toHaveBeenCalled();

    });

    test('Debe de disparar el startLogin con los respectivos argumentos ', () => {

        wrapper.find('form').simulate('submit');
        expect(startLoginEmailPassword).toHaveBeenLastCalledWith('', '');

    });




});
