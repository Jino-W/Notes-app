import axios from "../config/axios"

export const showCategory=(category)=>{
    return {
        type:"SHOW_CATEGORY",
        payload: category
    }
}

export const startShowCategory=(id)=>{
    return (dispatch)=>{
        axios.get(`/categories/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const category=response.data
            dispatch(showCategory(category))
        })
        .catch(err=>{
            alert(err)
        })
    }
}