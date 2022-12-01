const NEW_NOTEBOOK = "notebooks/NEW_NOTEBOOK"
const EDIT_NOTEBOOK = "notebooks/EDIT_NOTEBOOK"
const GET_NOTEBOOKS = "notebooks/GET_NOTEBOOKS"
const DELETE_NOTEBOOKS = "notebooks/DELETE_NOTEBOOKS"

const newNotebook = (notebook) => ({
    type: NEW_NOTEBOOK,
    notebook
})

const editNotebook = (notebook) => ({
    type: EDIT_NOTEBOOK,
    notebook
})

const getNotebooks = (notebooks) => ({
    type: GET_NOTEBOOKS,
    notebooks
})

const deleteNotebooks = (id) => ({
    type: DELETE_NOTEBOOKS,
    id
})

export const postNotebookThunk = ({ name }) => async (dispatch) => {
    const res = await fetch("/api/notebooks/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name
        })
    })
    if (res.ok) {
        const notebook = await res.json()
        dispatch(newNotebook(notebook))
        return notebook
    }
}

export const editNotebookThunk = (id, notebook) => async (dispatch) => {
    const { name } = notebook
    const res = await fetch(`/api/notebooks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name
        })
    })
    if (res.ok) {
        const notebook = await res.json()
        dispatch(editNotebook(notebook))
        return notebook
    }
}

export const getNotebooksThunk = () => async (dispatch) => {
    const res = await fetch("/api/notebooks")
    if (res.ok) {
        const notebooks = await res.json()
        dispatch(getNotebooks(notebooks))
        return notebooks
    }
}

export const deleteNotebooksThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/notebooks/${id}`, {
        method: "DELETE"
    })
    if (res.ok) {
        const deleted = await res.json()
        dispatch(deleteNotebooks(id))
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