import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';


export const NoteScreen = () => {
    const dispatch = useDispatch();
    const {active} = useSelector(state => state.notes);
    const [values, handleInputChange, reset] = useForm(active);
    const activeID = useRef(active.id);

    const handleDelete = () => {

        dispatch(startDeleting(values.id));
    }

    useEffect(() => {
        if(active.id !== activeID.current){
            reset(active);
            activeID.current = active.id;
        }
        
    }, [active, reset]);

    useEffect(() => {
        
        dispatch(activeNote(values.id, {...values}));

    }, [values, dispatch]);

    return (
        <div className='notes__main-content'>
            <NotesAppBar date={active.date}/>
            <div className="notes__content animate__animated animate__fadeIn">

                <input
                    type="text"
                    placeholder="some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={values.title}
                    onChange={handleInputChange}
                    name="title"
                />
                <textarea
                    className="notes__text-area"
                    placeholder="What happened today?"
                    value={values.body}
                    onChange={handleInputChange}
                    name="body"
                >

                </textarea>
                {
                    active.imgURL &&
                    <div className="notes__image">
                    <img src={active.imgURL}
                        alt="mountain" />

                </div>}

            </div>
            <button className="btn btn-danger"
            onClick={handleDelete}>Delete</button>
        </div>
    )
}
