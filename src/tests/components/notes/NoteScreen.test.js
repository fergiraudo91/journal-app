import React from 'react';
import thunk from "redux-thunk";
import configureStore from 'redux-mock-store' //ES6 modules
import { mount } from "enzyme";
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { NoteScreen } from "../../../components/notes/NoteScreen";
import { activeNote } from '../../../actions/notes';

jest.mock('../../../actions/notes', () => {
    return {
        activeNote: jest.fn()
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
        active: {
            id: 'QI7eX0TxfyrUni6iNnCQ',
            body: 'Hola body',
            title: 'Hola titulo',
            date: 1625057652942,
            imgURL: 'https://res.cloudinary.com/dpezd0bbw/image/upload/v1625082320/qcjwk9p6kxddqlulykwe.png'
        }
    }
}

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <NoteScreen />
    </Provider>
)

describe('Pruebas en <NoteScreen />', () => {


    test('Debe de mostrarse correctamente ', () => {

        expect(wrapper).toMatchSnapshot();

    });

    test('Debe de disparar el active note', () => {

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola Mundo'
            }
        });

        expect(activeNote).toHaveBeenCalledWith(
            'QI7eX0TxfyrUni6iNnCQ',
            {
                id: 'QI7eX0TxfyrUni6iNnCQ',
                body: 'Hola body',
                title: 'Hola Mundo',
                date: 1625057652942,
                imgURL: 'https://res.cloudinary.com/dpezd0bbw/image/upload/v1625082320/qcjwk9p6kxddqlulykwe.png'
            }
        )

    });


})
