const NEW_NOTE = "notes/NEW_NOTE"
const EDIT_NOTE = "notes/EDIT_NOTE"
const GET_NOTES = "notes/GET_NOTES"
const DELETE_NOTE = "notes/DELETE_NOTE"

const newNote = (note) => ({
    type: NEW_NOTE,
    note
})

const editNote = (note) => ({
    type: EDIT_NOTE,
    note
})

const getNotes = (notes) => ({
    type: GET_NOTES,
    notes
})

const deleteNote = (id) => ({
    type: DELETE_NOTE,
    id
})

export const postNoteThunk = (noteData) => async (dispatch) => {
    const { title, body, notebooks } = noteData
    const res = await fetch("/api/notes/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            body,
            notebooks
        })
    })
    if (res.ok) {
        const note = await res.json()
        dispatch(newNote(note))
        return note
    } else if (res.status < 500) {
        const note = await res.json()
        if (note.errors) {
            return note.errors
        }
    }
}

export const editNoteThunk = (id, note) => async (dispatch) => {
    const { title, body, notebook_id } = note
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
        const note = await res.json()
        dispatch(editNote(note))
        return note
    }
}

export const getNotesThunk = () => async (dispatch) => {
    const res = await fetch("/api/notes")
    if (res.ok) {
        const notes = await res.json()
        dispatch(getNotes(notes))
        return notes
    }
}

export const deleteNoteThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/notes/${id}`, {
        method: "DELETE"
    })
    if (res.ok) {
        const deleted = await res.json()
        dispatch(deleteNote(id))
        return deleted
    }
}

const initialState = {}

export default function notes(state = initialState, action) {
    let newState = {};
    switch (action.type) {
        case NEW_NOTE:
            newState = { ...state }
            newState[action.note.id] = action.note
            return newState
        case EDIT_NOTE:
            newState = { ...state }
            newState[action.note.id] = action.note
            return newState
        case GET_NOTES:
            newState = { ...action.notes }
            return newState
        case DELETE_NOTE:
            newState = { ...state }
            delete newState[action.id]
            return newState
        default:
            return state
    }
}