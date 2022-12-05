const SINGLE_NOTE = 'targetnote/SINGLE_NOTE'

const singleNote = (note) => ({
    type: SINGLE_NOTE,
    note
})

export const singleNoteThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/notes/${id}`)
    if (res.ok) {
        const note = await res.json()
        dispatch(singleNote(note))
        return note
    }
}

const initialState = {}

export default function targetNote(state = initialState, action) {
    let newState = {}
    switch (action.type) {
        case SINGLE_NOTE:
            newState = { ...action.note }
            return newState
        default:
            return state
    }
}