import { JournalEntry } from "../../../components/journal/JournalEntry";

import React from 'react';
import thunk from "redux-thunk";
import configureStore from 'redux-mock-store' //ES6 modules
import { mount } from "enzyme";
import { Provider } from 'react-redux';
import { activeNote } from '../../../actions/notes';


jest.mock('../../../actions/notes', () => {
    return {
        activeNote: jest.fn()
    }
});


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en <JournalEntry />', () => {

    const note = {
        id: 10,
        date: 0,
        title: 'Hola',
        body: 'Mundo',
        imgURL: 'https://algo.jpg'
    }

    const wrapper = mount(
          
        <Provider store={store}>
            <JournalEntry {...note} />
        </Provider>
    );

    test('Debe de mostrarse correctamente ', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de activar la nota ', () => {
       
        wrapper.find('.journal__entry').prop('onClick')();
        expect(store.dispatch).toHaveBeenCalledWith(activeNote(note.id, {...note}));
        
    });
    
    
    
});
