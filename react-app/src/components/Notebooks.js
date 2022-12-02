import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { useEffect, useState } from "react";
import { Modal } from "../context/Modal";
import Sidebar from "./SideBar";
import NotebookForm from "./Forms/NotebookForm";
import * as notebookActions from '../store/notebooks'
import * as notesActions from '../store/notes'
import "./CSS/Notebooks.css"

export default function Notebook() {
    const dispatch = useDispatch()
    const notebooks = Object.values(useSelector(state => state.notebooks))
    const [notebookForm, setNotebookForm] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const location = useLocation()
    const body = document.querySelector("body")
    const classes = body.classList

    if (location.pathname === '/notebooks') {
        document.body.classList.remove(...classes)
        document.body.classList.add("notebooks-page")
    }

    useEffect(() => {
        dispatch(notebookActions.getNotebooksThunk())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    if (!isLoaded) {
        return null
    }

    return (
        <>
            <div className="notebooks-view-page">
                <div className="notebook-view-container">
                    <div className="notebook-view-wrapper">
                        <Sidebar />
                        <div className="notebook-page-view-body">
                            <section className="notebooks-page-body-container">
                                <div className="notebooks-page-body-holder">
                                    <main className="notebooks-page-body-main">
                                        <div className="notebooks-page-view-header">
                                            <div className="notebooks-page-view-title">Notebooks</div>
                                        </div>
                                        <div className="notebooks-user-actions">
                                            <div className="number-of-notebooks">{notebooks.length} notebooks</div>
                                            <div className="new-notebook-view-page">
                                                <i className="fa-solid fa-file-circle-plus" onClick={() => setNotebookForm(true)}></i>
                                            </div>
                                            <button className="notebooks-page-new-notebook" onClick={() => setNotebookForm(true)}>New Notebook</button>
                                        </div>
                                        <div className="notebooks-page-view-container">
                                            <div className="notebook-table-header">
                                                <div className="notebook-title-table">TITLE</div>
                                                <div className="notebook-author-table">CREATED BY</div>
                                                <div className="notebooks-actions-table">ACTIONS</div>
                                            </div>
                                        </div>
                                    </main>
                                </div>
                            </section>
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