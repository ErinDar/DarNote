import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useQuill } from 'react-quilljs'
import * as notesActions from '../store/notes'
import * as targetNote from '../store/targetnote'
import 'quill/dist/quill.snow.css'
import { Modal } from '../context/Modal';


export default function Editor() {
    const dispatch = useDispatch()
    const note = Object.values(useSelector(state => state.targetNote))
    const notebooks = Object.values(useSelector(state => state.notebooks))
    const { id } = useParams()
    const { quill, quillRef } = useQuill()
    const [noteData, setNoteData] = useState({
        title: "",
        body: "",
        notebook_id: ""
    })
    const [errors, setErrors] = useState([])
    const [notebookSelect, setNotebookSelect] = useState(false)

    const editNote = async (e) => {
        e.preventDefault();
        const note = await dispatch(notesActions.editNoteThunk(id, noteData))
        if (note) {
            setErrors(note)
        }
    }

    useEffect(() => {
        dispatch(notesActions.getNotesThunk())
            .then(() => dispatch(targetNote.singleNoteThunk(id)))
        // if (quill) {
        //     // default text for editor
        //     quill.clipboard.dangerouslyPasteHTML('<p>Start writing...</p>');

        //     // find which has the information I want to save to database
        //     quill.on('text-change', (delta, oldDelta, source) => {
        //         //  autosave: fire off a put request as this changes
        //         console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
        //     });
        // }

    }, [dispatch]);


    // const saveQuillHTML = async () => {
    //     title = 'Untitled'
    //     body = (quillRef.current.firstChild.innerHTML)
    //     let notebooks = 1
    //     // create fetch request
    //     console.log('body', body)
    //     const note = await dispatch(notesActions.postNoteThunk({ title, body, notebooks }))
    //     console.log('note', note.body)
    //     // console.log('inner html', quill.clipboard.dangerouslyPasteHTML(note.body))
    // }
    return (
        <>
            <div>
                <form onSubmit={editNote}>
                    <div>
                        <div>{ }</div>
                    </div>
                    <p>Begin editing at your leisure.</p>

                    <div style={{ width: 500, height: 300 }}>
                        <div ref={quillRef} />
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    {/* <button onClick={saveQuillHTML}>Save Data for now</button> */}
                </form>
            </div>
            {notebookSelect && (
                <Modal onClose={() => setNotebookSelect(false)}>

                </Modal>
            )}
        </>
    );
}