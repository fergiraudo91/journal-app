/**

* @jest-environment node

*/
import { startLoadingNotes, startNewNote, startSaveNotes, startUploading } from "../../actions/notes";
import thunk from "redux-thunk";

import configureStore from 'redux-mock-store' //ES6 modules
import { types } from "../../types/types";
import { db } from "../../firebase/firebase-config";

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

describe('Pruebas en las acciones de notes', () => {

    beforeEach(() => {
        store = mockStore(initState);
    })

    test('Debe crear una nueva nota startNewNote', async () => {

        await store.dispatch(startNewNote());
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload:{
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        const noteID = actions[0].payload.id;
        await db.doc(`/TESTING/journal/notes/${noteID}`).delete();
    }, 10000);

    test('Start loading notes debe cargar las notas',  async () => {
        await store.dispatch(startLoadingNotes('TESTING'));
        const actions = store.getActions();
        expect(actions).toEqual([
            {
                type: types.notesLoad,
                payload: expect.any(Array)
            }
        ])

    }, 10000)

    test('Start save note debe actualizar la nota', async () => {
        const note = {
            id: '0fUVj7N3ClvKaoyzhpbQ',
            title: 'Hola Mundo',
            body: 'Estoy actualizando'
        }

        await store.dispatch(startSaveNotes(note));

        const actions = store.getActions();

        expect(actions[0].type).toBe(types.notesUpdated);

        const docRef = await db.doc(`/TESTING/journal/notes/${note.id}`).get();
        console.log(docRef.data());
        expect(docRef.data().title).toBe(note.title);

    });

});
