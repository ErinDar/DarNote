const SINGLE_NOTEBOOK = "targetnotebook/SINGLE_NOTEBOOK"
const GET_NOTEBOOK_NOTES = "notebooks/GET_NOTEBOOK_NOTES"

const getNotebookNotes = (notes) => ({
    type: GET_NOTEBOOK_NOTES,
    notes
})

export const getNotebookNotesThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/notebooks/${id}/notes`)
    if (res.ok) {
        const notes = await res.json()
        dispatch(getNotebookNotes(notes))
        return notes
    }
}