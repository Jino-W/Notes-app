import React from 'react'
import axios from '../../config/axios'
import Form from './Form'

class noteCreate extends React.Component{

    submitHandle=(formData)=>{
        axios.post(`/notes`, formData, {
            headers:{
                "x-auth" : localStorage.getItem("authToken")
            }
        })
        .then(response=>{
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            }else{
                this.props.history.push(`/notes`)
            }
        })
        .catch(err=>{
            alert(err)
        })
    }

    render(){
        return(
            <div>
                <h2>Edit Note</h2>
                <Form submitHandle={this.submitHandle}/>
            </div>
        )g
    }
}

export default noteCreate