import React, { useState } from 'react'
import * as notebookActions from '../../store/notebooks'
import { useDispatch } from 'react-redux'
import './NotebookForm.css'

export default function NotebookForm({ setNotebookForm }) {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [errors, setErrors] = useState([])

    const newNotebook = async (e) => {
        e.preventDefault();
        const notebook = await dispatch(notebookActions.postNotebookThunk({ name }))
        if (notebook) {
            setErrors(notebook)
        }
    }

    return (
        <>
            <header className='new-notebook-header'>
                <div className='new-header-items'>
                    <div>
                        <h1 className="new-header-title">Create new notebook</h1>
                    </div>
                    <div>
                        <button onClick={() => setNotebookForm(false)}>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="exit-button">
                                <path d="M17.53 6.47a.75.75 0 00-1.06 0L12 10.94 7.53 6.47a.75.75 0 00-1.06 1.06L10.94 12l-4.47 4.47a.75.75 0 101.06 1.06L12 13.06l4.47 4.47a.75.75 0 101.06-1.06L13.06 12l4.47-4.47a.75.75 0 000-1.06z"
                                    fill="currentColor"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <h2 className='new-notebook-tagline'>Notebooks are useful for grouping notes around a common topic. They can be private or shared.</h2>
            </header>
            <form className="new-notebook-dash-form">
                <label className='form-name'>Name</label>
                <div className='form-name-input'>
                    <input
                        type="text"
                        value={name}
                        placeholder="Notebook name"
                        onChange={(e) => setName(e.target.value)}
                        className="form-name-input-field"
                    />
                </div>
                {!!errors.length && (
                    <div className='error-messages'>
                        {errors.map((err, idx) => (
                            <div key={idx}>{err}</div>
                        ))}
                    </div>
                )}
                <div className='spacer'></div>
            </form>
            <div className='dash-new-notebook-action-buttons'>
                <div className='action-buttons'>
                    <button className='cancel-new-notebook-dash' onClick={() => setNotebookForm(false)}>Cancel</button>
                    <button className={name.length >= 3 ? 'create-new-notebook-dash-active' : 'create-new-notebook-dash-disabled'} onClick={newNotebook}>Create</button>
                </div>
            </div>
        </>
    )
}