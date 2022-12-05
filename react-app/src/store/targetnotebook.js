import notebooks from "./notebooks"

const SINGLE_NOTEBOOK = "targetnotebook/SINGLE_NOTEBOOK"
const GET_NOTEBOOK_NOTES = "notebooks/GET_NOTEBOOK_NOTES"

const getNotebookNotes = (notes) => ({
    type: GET_NOTEBOOK_NOTES,
    notes
})

const singleNotebook = (notebook) => ({
    type: SINGLE_NOTEBOOK,
    notebook
})

export const getNotebookNotesThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/notebooks/${id}/notes`)
    if (res.ok) {
        const notes = await res.json()
        dispatch(getNotebookNotes(notes))
        return notes
    }
}

export const getSingleNotebookThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/notebooks/${id}`)
    if (res.ok) {
        const notebook = await res.json()
        dispatch(singleNotebook(notebook))
        return notebook
    }
}

const initialState = {
    notes: {},
    notebook: {}
}

export default function targetNotebook(state = initialState, action) {
    let newState = {}
    switch (action.type) {
        case SINGLE_NOTEBOOK:
            newState = { ...state }
            newState.notebook = { ...action.notebook }
            return newState
        case GET_NOTEBOOK_NOTES:
            newState = { ...state }
            newState.notes = { ...action.notes }
            return newState
        default:
            return state
    }
}