import axios from "../config/axios"

export const showNote=(note)=>{
    console.log("2")
    return {
        type:"SHOW_NOTE",
        payload: note
    }
}

export const startShowNote=(id)=>{
    return (dispatch)=>{
        axios.get(`/notes/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const note=response.data
            console.log("1", response.data)
            dispatch(showNote(note))
        })
        .catch(err=>{
            alert(err)
        })
    }
}