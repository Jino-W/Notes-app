import axios from '../config/axios'
import swal from 'sweetalert';


export const getNotes = (notes)=>{
    return {
        type: "GET_NOTES",
        payload: notes
    }
}

export const deleteNote = (id)=>{
    return {
        type: "DELETE_NOTE",
        payload: {
            note_id: id
        }
    }
}


export const editNote =(id, formData)=>{
    return {
        type: "EDIT_NOTE",
        payload: {
            note_id : id,
            formData
        }
    }
}


export const createNote =(formData)=>{
    return {
        type: "CREATE_NOTE",
        payload: {
            formData
        }
    }
}



export const startGetNotes = ()=>{
    return (dispatch)=>{
        axios.get('/notes', {
            headers:{
                "x-auth" : localStorage.getItem('authToken')
            }
        })
            .then(response=>{
                const notes = response.data
                dispatch(getNotes(notes))
            })
            .catch(err=>{
                alert(err)
            })
    }
}

export const startDeleteNote = (id, props)=>{
    return (dispatch)=>{
        swal({
            title: "Are you sure?",
            text: "Are you sure you want to delete this Note?",
            icon: "warning",
            dangerMode: true,
            buttons: true
        })
            .then(willDelete => {
                if (willDelete) {
                    axios.delete(`/notes/${id}`,{
                        headers:{
                            "x-auth" : localStorage.getItem('authToken')
                        }
                    })
                        .then(response=>{
                            dispatch(deleteNote(id))
                            swal("Deleted!", "Note is deleted successfully!", "success");
                        })
                        .catch(err=>{
                            alert(err)
                        })
                }
            });
    }
}


export const startEditNote = (id, formData) => {
    return (dispatch)=>{
        axios.put(`/notes/${id}`, formData, {
            headers:{
                "x-auth" : localStorage.getItem("authToken")
            }
        })
            .then(response=>{
                if(response.data.hasOwnProperty('error')){
                    alert(response.data.message)
                }else{
                    dispatch(editNote(id, response.data))
                    // if(Object.keys(formData)[0] !== 'color')  props.history.push(`/notes`)
                }
            })
            .catch(err=>{
                alert(err)
            })
    }
}


export const startCreateNote = (formData)=>{
    return (dispatch)=>{
        axios.post(`/notes`, formData, {
            headers:{
                "x-auth" : localStorage.getItem("authToken")
            }
        })
            .then(response=>{
                if(response.data.hasOwnProperty('errors')){
                    alert(response.data.message)
                }else{
                    dispatch(createNote(response.data))
                }
            })
            .catch(err=>{
                alert(err)
            })
    }
}