import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Modal } from '../context/Modal';
import Sidebar from './SideBar';
import Editor from './Editor';
import * as notebookActions from '../store/notebooks'
import * as noteActions from '../store/notes'


export default function EditNote() {
    const notes = Object.values(useSelector(state => state.notes)).reverse()
    const location = useLocation()
    const body = document.querySelector("body")
    const classes = body.classList

    if (location.pathname.includes('/notes')) {
        document.body.classList.remove(...classes)
        document.body.classList.add("notes-page")
    }
    console.log('notes', notes)
    return (
        <>
            <div className="notebooks-view-page">
                <div className="notebook-view-container">
                    <div className="notebook-view-wrapper">
                        <Sidebar />
                        <div className="kdfi">
                            <section>
                                <div>
                                    <div></div>
                                    <Editor />
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}