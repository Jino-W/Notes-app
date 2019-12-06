const categoriesInitialState = []

const categoriesReducer = (state = categoriesInitialState, action)=>{
    switch (action.type) {
        case "GET_CATEGORIES":{
            return [...action.payload]
        }
        case "DELETE_CATEGORY":{
            return [...state].filter(category => category._id !== action.payload.category_id)
        }
        case "EDIT_CATEGORY":{
            return [...state].map(category=> {
                if(action.payload.category_id == category._id){
                    return Object.assign(category, action.payload.formData)
                }
                return category
            })
        }
        case "CREATE_CATEGORY":{
            console.log("3")
            return [...state, action.payload.formData]
        }
        default:{
            return [...state]
        }
    }
}

export default categoriesReducer