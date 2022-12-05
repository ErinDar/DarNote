import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import Sidebar from './SideBar';
import EditNoteForm from './Forms/EditNoteForm';
import * as notebookActions from '../store/notebooks'
import * as noteActions from '../store/notes'
import * as targetNoteActions from '../store/targetnote'
import "./CSS/EditNote.css"


export default function EditNote() {
    const dispatch = useDispatch()
    const notes = Object.values(useSelector(state => state.notes)).reverse()
    const targetNote = useSelector(state => state.targetNote)
    const location = useLocation()
    const noteId = Number(location.pathname.split("/")[2])
    const body = document.querySelector("body")
    const classes = body.classList

    if (location.pathname.includes('/notes')) {
        document.body.classList.remove(...classes)
        document.body.classList.add("notes-page")
    }

    // const [data, setData] = useState({
    //     title: targetNote.title,
    //     body: targetNote.body,
    //     notebook_id: targetNote.notebook_id
    // })

    // const handleChange = (e) => {
    //     setData({ ...data, [e.target.name]: e.target.value })
    // }

    // const targetTitle = useSelector(state => state.targetNote.title)
    // const targetBody = useSelector(state => state.targetNote.body)
    // const targetNotebookId = useSelector(state => state.notebook_id)
    // const [newTitle, setNewTitle] = useState(targetTitle)
    // const [newBody, setNewBody] = useState(targetBody)
    // const [newNotebookId, setNewNotebookId] = useState(targetNotebookId)

    const [notebookSelect, setNotebookSelect] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(noteActions.getNotesThunk())
    }, [dispatch])

    useEffect(() => {
        dispatch(notebookActions.getNotebooksThunk())
    }, [dispatch])

    useEffect(() => {
        if (noteId) {
            (async () => {
                await dispatch(targetNoteActions.singleNoteThunk(noteId))
                    .then(() => setIsLoaded(true))
            })();
        }
    }, [dispatch, noteId])

    return (
        <>
            {/* {isLoaded && ( */}
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
                                                                        <button className="list-note-button">
                                                                            <NavLink to={`/notes/${note.id}`}
                                                                                style={{ textDecoration: 'none' }}
                                                                                activestyle={{ background: '#262626', border: '2px solid transparent', borderColor: '#737373' }}
                                                                            >
                                                                                <div className="list-note-button-body-container">
                                                                                    <div className="list-note-button-body-holder">
                                                                                        <div className="list-note-button-body-wrapper">
                                                                                            <div className="list-note-title">{note?.title}</div>
                                                                                            <div>{note?.body}</div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </NavLink>
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
                                    <EditNoteForm noteId={noteId} targetNote={targetNote} />
                                    {/* <Editor noteId={noteId} targetNote={targetNote} /> */}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            {/* )} */}
        </>
    )
}