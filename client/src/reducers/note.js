const noteInititalState={}

const noteReducer=(state=noteInititalState,action)=>{
    switch(action.type){
        case "SHOW_NOTE":{
            console.log("3",{...action.payload})
            return {...action.payload}
        }
        default:{
            return {...state}
        }
    }
}

export default noteReducer