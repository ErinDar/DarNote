import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from 'react-router-dom'
import Sidebar from "./SideBar";
import * as notesActions from '../store/notes'
import "./CSS/Notes.css"

export default function Note() {
    const dispatch = useDispatch()
    const history = useHistory()
    const notes = Object.values(useSelector(state => state.notes)).reverse()
    const [isLoaded, setIsLoaded] = useState(false)
    const location = useLocation()
    const body = document.querySelector("body")
    const classes = body.classList

    if (location.pathname === '/notes') {
        document.body.classList.remove(...classes)
        document.body.classList.add("notes-page")
    }


    //  notes page just shows all the notes by the user with text editor open 
    //  can edit notes from notes page
    //  redirects to edit page when notes are clicked on

    useEffect(() => {
        dispatch(notesActions.getNotesThunk())
            .then(() => setIsLoaded(true))
    }, [dispatch, isLoaded])

    return (
        <>
            {isLoaded && (
                <div className="notebooks-view-page">
                    <div className="notebook-view-container">
                        <div className="notebook-view-wrapper">
                            <Sidebar />
                            <div className="notes-list-editor-container">
                                <section className="notes-list-editor-holder">
                                    <div className="notes-list-editor-wrapper">
                                        <div className="notes-list-section">
                                            <section className="notes-list-container">
                                                <div className="notes-list-holder">
                                                    <header className="notes-list-header-container">
                                                        <div className="notes-list-header-title-container">
                                                            <i className="fa-solid fa-note-sticky fa-2x"></i>
                                                            <h1 className="notes-list-header-title">Notes</h1>
                                                        </div>
                                                        <div className="notes-list-header-number">
                                                            <div className="notes-list-header-number-wrapper">
                                                                <span>{notes?.length} notes</span>
                                                            </div>
                                                        </div>
                                                    </header>
                                                    <div className="my-notes-list-container">
                                                        <div className="my-notes-list-holder">
                                                            <div className="my-notes-list-wrapper">
                                                                <div className="my-notes-list">
                                                                    {notes[0] && notes?.map((note, idx) => (
                                                                        <div key={idx} className="list-note-container">
                                                                            <button className="list-note-button"
                                                                                activestyle={{ background: '#262626', border: '2px solid transparent', borderColor: '#737373' }}
                                                                                onClick={() => history.push(`/notes/${note.id}`)}
                                                                            >
                                                                                <div className="list-note-button-body-container">
                                                                                    <div className="list-note-button-body-holder">
                                                                                        <div className="list-note-button-body-wrapper">
                                                                                            <div className="list-note-title">{note.title}</div>
                                                                                            {/* <div>{note.body}</div> */}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}