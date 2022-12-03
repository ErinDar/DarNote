import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { Modal } from '../context/Modal'
import Sidebar from './SideBar'
import NotebookForm from './Forms/NotebookForm'
import background from './assets/dashboard-image.png'
import * as notebookActions from '../store/notebooks'
import * as notesActions from '../store/notes'
import "./CSS/Dashboard.css"

export default function Dashboard() {
    const dispatch = useDispatch()
    const history = useHistory()
    // const user = useSelector(state => state.session.user)
    const notebooks = Object.values(useSelector(state => state.notebooks)).reverse()
    const notes = Object.values(useSelector(state => state.notes)).reverse()
    // const task = useSelector(state => state.task)
    const [notebookForm, setNotebookForm] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const location = useLocation()
    const body = document.querySelector("body")
    const classes = body.classList

    if (location.pathname === '/dashboard') {
        document.body.classList.remove(...classes)
        document.body.classList.add("dashboard-body")
    }

    useEffect(() => {
        dispatch(notebookActions.getNotebooksThunk())
            .then(() => dispatch(notesActions.getNotesThunk()))
            .then(() => setIsLoaded(true))
    }, [dispatch])

    if (!isLoaded) {
        return null
    }
    return (
        <>
            <div className='dashboard'>
                <div className='dashboard-container'>
                    <div className='dashboard-holder'>
                        <div className='dashboard-wrapper'>
                            <Sidebar />
                            <div className='dashboard-main-body'>
                                <div className='main-body-container'>
                                    <div className='top-main-body'>
                                        <div className='main-body-header'>
                                            <div className='main-header-image' style={{ backgroundImage: `url(${background})` }}></div>
                                        </div>
                                    </div>
                                    <div className='lower-main-body'>
                                        <div className='dashboard-components-grid'>
                                            <div className='notes-dashboard-quad'>
                                                <article className='notes-quad-container'>
                                                    <section className='notes-quad-header'>
                                                        <div className='notes-quad-title-container'>
                                                            <button className='notes-view-button' onClick={() => history.push('/notes')}>
                                                                <h2 className='notes-view-title'>notes</h2>
                                                                <svg className='notes-view-icon' xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox='0 0 8 8'>
                                                                    <g fill="none" fillRule="evenodd">
                                                                        <path d="M0 0h8v8H0z" />
                                                                        <path stroke="#1191f6" d="M2.5 1.5l3 3-3 3" />
                                                                    </g>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </section>
                                                    <section className='notes-quad-body'>
                                                        <div className='notes-quad-container'>
                                                            <div className='notes-container'>
                                                                <div className='notes-wrapper'>
                                                                    {notes[0] && notes.map((note, idx) => (
                                                                        <button className='go-to-note-button'>
                                                                            <div className='notes-button'>
                                                                                <div className='notes-button-header'>
                                                                                    <div className='notes-button-title'>{note.title}</div>
                                                                                    <div className='notes-button-body'>
                                                                                        <span key={idx}>{note.body}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </button>
                                                                    ))}
                                                                    <div className='create-note-paper'>
                                                                        <div className='create-notebook-body' onClick={() => history.push('/notes')}>
                                                                            <p className='create-notebook-title'>Create new note</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className='notebook-side-left'></div>
                                                                    <div className='notebook-side-right'></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>
                                                </article>
                                            </div>
                                            <div className='task-dashboard-quad'>
                                                <article className='task-quad-container'>
                                                    <section className='task-quad-header'>
                                                        <div className='task-quad-title-container'>
                                                            <button className='task-view-button'>
                                                                <h2 className='task-view-title'>my tasks</h2>
                                                                <svg className='task-view-icon' xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox='0 0 8 8'>
                                                                    <g fill="none" fillRule="evenodd">
                                                                        <path d="M0 0h8v8H0z" />
                                                                        <path stroke="#1191f6" d="M2.5 1.5l3 3-3 3" />
                                                                    </g>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </section>
                                                    <section className='task-quad-body'>
                                                        <div className='task-quad-container'>
                                                            {/* if there are no task */}
                                                            <div className='task-quad-wrapper'>
                                                                <p className='empty-task-message'>Add tasks to any note and prioritize them with due dates and tags</p>
                                                                <div className='empty-new-task-button-container'>
                                                                    <div className='empty-new-task-button-wrapper'>
                                                                        <button className='empty-new-task-button'>
                                                                            <span className='empty-new-task-button-title'>Add new task</span>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* end if there are not task */}
                                                        </div>
                                                    </section>
                                                </article>
                                            </div>
                                            <div className='tags-dashboard-quad'>
                                                <article className='tags-quad-container'>
                                                    <section className='tags-quad-header'>
                                                        <div className='tags-quad-title-container'>
                                                            <button className='tags-view-button'>
                                                                <h2 className='tags-view-title'>tags</h2>
                                                                <svg className='task-view-icon' xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox='0 0 8 8'>
                                                                    <g fill="none" fillRule="evenodd">
                                                                        <path d="M0 0h8v8H0z" />
                                                                        <path stroke="#1191f6" d="M2.5 1.5l3 3-3 3" />
                                                                    </g>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </section>
                                                    <section className='tags-quad-body'>
                                                        <div className='tags-quad-container'>
                                                            {/* if there are no tags */}
                                                            <div className='tags-quad-wrapper'>
                                                                <p className='empty-tags-message'>Tag notes with keywords to make them easier to find.</p>
                                                                <div className='empty-new-tags-button-container'>
                                                                    <div className='empty-new-tags-button-wrapper'>
                                                                        <button className='empty-new-tags-button'>
                                                                            <span className='empty-new-tags-button-title'>Create new tag</span>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* end if there are no tags */}
                                                        </div>
                                                    </section>
                                                </article>
                                            </div>
                                            <div className='notebooks-dashboard-quad'>
                                                <article className='notebooks-quad-container'>
                                                    <section className='notebooks-quad-header'>
                                                        <div className='notebooks-quad-title-container'>
                                                            <button className='notebooks-view-button' onClick={() => history.push('/notebooks')}>
                                                                <h2 className='notebooks-view-title'>notebooks</h2>
                                                                <svg className='notebooks-view-icon' xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox='0 0 8 8'>
                                                                    <g fill="none" fillRule="evenodd">
                                                                        <path d="M0 0h8v8H0z" />
                                                                        <path stroke="#1191f6" d="M2.5 1.5l3 3-3 3" />
                                                                    </g>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </section>
                                                    <section className='notebooks-quad-body'>
                                                        <div className='notebooks-quad-container'>
                                                            <div className='notebooks-quad-wrapper'>
                                                                <div className='notebooks-wrapper'>
                                                                    {notebooks[0] && notebooks.map((notebook, idx) => (
                                                                        <article key={idx} className='notebook-item' onClick={() => history.push(`/notebooks/${notebook.id}`)}>
                                                                            <div className='notebook-item-body'>
                                                                                <h2 className='notebook-item-title'>{notebook.name}</h2>
                                                                                <span></span>
                                                                            </div>
                                                                        </article>
                                                                    ))}
                                                                    <article className='create-notebook-book'>
                                                                        <div className='create-notebook-body' onClick={() => setNotebookForm(true)}>
                                                                            <p className='create-notebook-title'>Create new notebook</p>
                                                                        </div>
                                                                    </article>
                                                                    <div className='notebook-side-left'></div>
                                                                    <div className='notebook-side-right'></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>
                                                </article>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {notebookForm && (
                <Modal onClose={() => setNotebookForm(false)}>
                    <NotebookForm setNotebookForm={setNotebookForm} />
                </Modal>
            )}
        </>
    )
}