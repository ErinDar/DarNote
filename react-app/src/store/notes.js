const NEW_NOTE = "notebooks/NEW_NOTE"
const EDIT_NOTE = "notebooks/EDIT_NOTE"
const GET_NOTES = "notebooks/GET_NOTES"
const DELETE_NOTE = "notebooks/DELETE_NOTE"

const newNote = (notebook) => ({
    type: NEW_NOTE,
    notebook
})

const editNote = (notebook) => ({
    type: EDIT_NOTE,
    notebook
})

const getNotes = (notebooks) => ({
    type: GET_NOTES,
    notebooks
})

const deleteNote = (id) => ({
    type: DELETE_NOTE,
    id
})

export const postNoteThunk = ({ title, body, notebooks }) => async (dispatch) => {
    const res = await fetch("/api/notes/new", {
        method: "POST",
        headers: {
            "Content-Type": "applicatin/json"
        },
        body: JSON.stringify({
            title,
            body,
            notebooks
        })
    })
    if (res.ok) {
        const notebook = await res.json()
        dispatch(newNote(notebook))
        return notebook
    }
}

export const editNoteThunk = (id, notebook) => async (dispatch) => {
    const { title, body, notebook_id } = notebook
    const res = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            body,
            notebook_id
        })
    })
    if (res.ok) {
        const notebook = await res.json()
        dispatch(editNote(notebook))
        return notebook
    }
}

export const getNotesThunk = () => async (dispatch) => {
    const res = await fetch("/api/notebooks")
    if (res.ok) {
        const notebooks = res.json()
        dispatch(getNotes(notebooks))
        return notebooks
    }
}

export const deleteNoteThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/notebooks/${id}`, {
        method: "DELETE"
    })
    if (res.ok) {
        const deleted = res.json()
        dispatch(deleteNote(id))
        return deleted
    }
}

const initialState = {}

export default function notebooks(state = initialState, action) {
    let newState = {};
    switch (action.type) {
        case NEW_NOTEBOOK:
            newState = { ...state }
            newState[action.notebook.id] = action.notebook
            return newState
        case EDIT_NOTEBOOK:
            newState = { ...state }
            newState[action.notebook.id] = action.notebook
            return newState
        case GET_NOTEBOOKS:
            newState = { ...action.notebooks }
            return newState
        case DELETE_NOTEBOOKS:
            newState = { ...state }
            delete newState[action.id]
            return newState
        default:
            return state
    }
}