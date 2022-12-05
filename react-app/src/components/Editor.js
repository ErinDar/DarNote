import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuill } from 'react-quilljs'
import * as notebookActions from '../store/notebooks'
import * as notesActions from '../store/notes'
import * as targetNoteActions from '../store/targetnote'
import 'quill/dist/quill.snow.css'
import { Modal } from '../context/Modal';


export default function Editor({ noteId, targetNote }) {
    const dispatch = useDispatch()
    const notebooks = Object.values(useSelector(state => state.notebooks))
    const theme = 'snow'
    const modules = { toolbar: '#toolbar' }
    const formats = ['size', 'bold', 'italic', 'underline', 'strike', 'script']
    const placeholder = "Start writing..."
    const { quill, quillRef } = useQuill({ theme, modules, formats, placeholder })
    const [notebookSelect, setNotebookSelect] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [errors, setErrors] = useState([])
    const title = targetNote.title
    const body = targetNote.body
    const notebookId = targetNote.notebook_id
    const [noteData, setNoteData] = useState({
        title: title,
        body: body,
        notebook_id: notebookId
    })

    const editNote = async (e) => {
        e.preventDefault();
        setNoteData({ body: quillRef.current.firstChild.innerHTML })
        const note = await dispatch(notesActions.editNoteThunk(noteId, noteData))
        if (note) {
            setErrors(note)
            alert()
        }
    }

    useEffect(() => {
        dispatch(notesActions.getNotesThunk())
            .then(() => dispatch(notebookActions.getNotebooksThunk()))
            .then(() => dispatch(targetNoteActions.singleNoteThunk(noteId)))
            .then(() => setIsLoaded(true))

        if (quill) {
            console.log('quill', quill)
            // find which has the information I want to save to database
            quill.on('text-change', (delta, oldDelta, source) => {
                //  autosave: fire off a put request as this changes
                // quill.updateContents(delta)
                console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
            });
        }

    }, [dispatch, quill]);


    const saveQuillHTML = async () => {
        // create fetch request
        await dispatch(notesActions.postNoteThunk(noteData))
    }
    return (
        <>
            {isLoaded && (
                <main className='notes-editor-section-container'>
                    <form onSubmit={editNote}>
                        <div className='notes-editor-controls'>
                            <div className='notebook-select-field-button-holder'>
                                <div className='notebook-select-field-button-wrapper'>
                                    <button className='notebook-select-field-button'>Move to Notebook</button>
                                </div>
                            </div>
                            <div className='note-save-button-container'>
                                <div className='note-save-button-wrapper'></div>
                                <button type='submit' className='note-save-button' onClick={saveQuillHTML}>Save Note</button>
                            </div>
                        </div>
                        <div className='notes-editor-title'>
                            <input
                                type="text"
                                value={noteData.title}
                                onChange={(e) => setNoteData({ title: e.target.value })}
                                placeholder='Title'
                            />
                        </div>
                        <br />
                        <div style={{ width: '100%', height: '100vh' }}>
                            <div id="toolbar">
                                <select className="ql-size">
                                    <option value='small' />
                                    <option value='large' />
                                    <option value='huge' />
                                </select>
                                <button className='ql-bold' />
                                <button className='ql-italic' />
                                <button className='ql-underline' />
                                <button className='ql-script' value='sub' />
                                <button className='ql-script' value='super' />
                                <button className='ql-indent' value='-1' />
                                <button className='ql-indent' value='+1' />
                            </div>
                            <div id='editor' />
                            <div ref={quillRef}>

                            </div>
                        </div>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                    </form>
                </main>
            )}
            {notebookSelect && (
                <Modal onClose={() => setNotebookSelect(false)}>

                </Modal>
            )}
        </>
    );
}