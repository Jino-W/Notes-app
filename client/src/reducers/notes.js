const notesInitialState = []

const notesReducer = (state=notesInitialState, action)=>{
    switch (action.type) {
        case "GET_NOTES":{
            return [...action.payload]
        }
        case "DELETE_NOTE":{
            return [...state].filter(note=> note._id !== action.payload.note_id)
        }
        case "EDIT_NOTE":{
            return [...state].map(note=> {
                if(action.payload.note_id == note._id){
                    return Object.assign(note, action.payload.formData)
                }
                return note
            })
        }
        case "CREATE_NOTE":{
            return [...state, action.payload.formData]
        }
        default:{
            return [...state]
        }
    }
}

export default notesReducer