import React from 'react'



export default function EditNoteForm({ noteId, targetNote }) {

    // let title = targetNote.title

    // const updateTitle = (e) => {
    //     title = e.target.value
    // }

    const [data, setData] = React.useState({
        title: targetNote.title,
        body: targetNote.body,
        notebook_id: targetNote.notebook_id
    })
    console.log('title', data.title)
    console.log('targetNote', targetNote)
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    return (
        <form>
            <div className='notes-editor-controls'>
                <div className='notebook-select-field-button-holder'>
                    <div className='notebook-select-field-button-wrapper'>
                        <button className='notebook-select-field-button'>Move to Notebook</button>
                    </div>
                </div>
                <div className='note-save-button-container'>
                    <div className='note-save-button-wrapper'></div>
                    <button type='submit' className='note-save-button'>Save Note</button>
                </div>
            </div>
            <div className='notes-editor-title'>
                <input
                    type='text'
                    name='title'
                    value={data.title}
                    onChange={handleChange}
                />
                <textarea
                    type='text'

                />
            </div>
        </form>
    )
}