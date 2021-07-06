import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({id, body, title, date, imgURL}) => {
    const noteDate = moment(date);
    const dispatch = useDispatch();

    const handleEntryClick = () => {
        dispatch(activeNote(id, {
            body,
            title,
            date,
            imgURL
        }))
    }

    return (
        <div className="journal__entry pointer "
        onClick={handleEntryClick}>
            {
                imgURL &&
                <div className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url(${imgURL})`,

                }}
            >
            </div>}
            <div className="journal__entry-body animate__animated animate__fadeIn">
                    <p className="journal__entry-title">
                        {title}
                    </p>
                    <p className="journal__entry-content">
                        {body}
                    </p>
                </div>
            <div className="journal__entry-date-box">
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('Do')}</h4>
            </div>
        </div>
    )
}
