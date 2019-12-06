const categoryInititalState={}

const categoryReducer=(state=categoryInititalState,action)=>{
    switch(action.type){
        case "SHOW_CATEGORY":{
            return {...action.payload}
        }
        default:{
            return {...state}
        }
    }
}

export default categoryReducer