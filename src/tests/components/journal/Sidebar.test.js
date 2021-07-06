import React from 'react';
import { Sidebar } from "../../../components/journal/Sidebar";
import thunk from "redux-thunk";
import configureStore from 'redux-mock-store' //ES6 modules
import { mount } from "enzyme";
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { logout, startLogOut } from '../../../actions/ui';
import { startNewNote } from '../../../actions/notes';

jest.mock('../../../actions/ui', () => {
    return {
        logout: jest.fn(),
        startLogOut: jest.fn()
    }
});

jest.mock('../../../actions/notes', () => {
    return {
        startNewNote: jest.fn()
    }
});


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'dOjAFaDtmpQff5ByOQWfC4TUHcS2',
        name: 'Fernando Giraudo'
    },
    ui: {
        loading: false,
        msError: null
    },
    notes: {
        notes: [],
        active: null
    }
}

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en <Sidebar />', () => {

    const wrapper = mount(
          
        <Provider store={store}>
            <MemoryRouter>
                <Sidebar />
            </MemoryRouter>
        </Provider>
    );


    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });
    
    test('Debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
        
    });

    test('Debe de llamar la acción en el logout', () => {

        wrapper.find('button').simulate('click');
        expect(startLogOut).toHaveBeenCalled();
        
    });

    test('Debe de llamar el startNewNote', () => {
        
        wrapper.find('.journal__new-entry').prop('onClick')();
        expect(startNewNote).toHaveBeenCalled();
    })
    
});
