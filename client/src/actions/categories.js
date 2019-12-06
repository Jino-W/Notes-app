import axios from '../config/axios'

export const getCategories = (categories)=>{
    return {
        type: "GET_CATEGORIES",
        payload: categories
    }
}

export const deleteCategory = (id)=>{
    return {
        type: "DELETE_CATEGORY",
        payload: {
            category_id: id
        }
    }
}


export const editCategory =(id, formData)=>{
    return {
        type: "EDIT_CATEGORY",
        payload: {
            category_id : id,
            formData
        }
    }
}

export const createCategory =(formData)=>{
    return {
        type: "CREATE_CATEGORY",
        payload: {
            formData
        }
    }
}


export const startGetCategories = () => {
    return (dispatch)=>{
        axios.get('/categories', {
            headers:{
                "x-auth" : localStorage.getItem('authToken')
            }
        })
            .then(response=>{
                const categories = response.data
                dispatch(getCategories(categories))
            })
            .catch(err=>{
                alert(err)
            })
    }
}


export const startDeleteCategory = (id)=>{
    return (dispatch)=>{
        axios.delete(`/categories/${id}`,{
            headers:{
                "x-auth" : localStorage.getItem('authToken')
            }
        })
            .then(response=>{
                dispatch(deleteCategory(id))

            })
            .catch(err=>{
                alert(err)
            })
    }
}


export const startEditCategory = (id, formData) => {
    return (dispatch)=>{
        axios.put(`/categories/${id}`, formData, {
            headers:{
                "x-auth" : localStorage.getItem("authToken")
            }
        })
            .then(response=>{
                if(response.data.hasOwnProperty('error')){
                    alert(response.data.message)
                }else{
                    console.log("h2",id, formData, response.data )
                    dispatch(editCategory(id, response.data))
                }
            })
            .catch(err=>{
                alert(err)
            })
    }
}


export const startCreateCategory = (formData)=>{
    console.log("1")
    return (dispatch)=>{
        axios.post(`/categories`, formData, {
            headers:{
                "x-auth" : localStorage.getItem("authToken")
            }
        })
            .then(response=>{
                if(response.data.hasOwnProperty('errors')){
                    alert(response.data.message)
                }else{
                    console.log("f", response.data)
                    dispatch(createCategory(response.data))
                }
            })
            .catch(err=>{
                alert(err)
            })
    }
}