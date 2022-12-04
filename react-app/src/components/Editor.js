import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useQuill } from 'react-quilljs'
import * as notesActions from '../store/notes'
import 'quill/dist/quill.snow.css'


export default function Editor() {
    const dispatch = useDispatch()
    const { quill, quillRef } = useQuill()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')


    useEffect(() => {
        if (quill) {
            // default text for editor
            quill.clipboard.dangerouslyPasteHTML('<p>Start writing...</p>');

            // find which has the information I want to save to database
            quill.on('text-change', (delta, oldDelta, source) => {
                //  autosave: fire off a put request as this changes
                setTitle('Untitled')
                setBody(quillRef.current.firstChild.innerHTML)
                dispatch(notesActions.postNoteThunk({ title, body }))
                console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
            });
        }

    }, [quill]);


    // const saveQuillHTML = async () => {
    //     const dataToSave = {
    //         body: quillRef.current.firstChild.innerHTML
    //     }
    //     // create fetch request
    // }
    return (
        <>
            <div>
                <h1>Edit Secret text here:</h1>
                <p>Begin editing at your leisure.</p>

                <div style={{ width: 500, height: 300 }}>
                    <div ref={quillRef} />
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            {/* <button onClick={saveQuillHTML}>Save Data for now</button> */}
        </>
    );
}