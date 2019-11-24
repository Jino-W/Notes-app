import React from 'react'
import axios from '../../config/axios'
import Form from './Form'
import {Redirect} from 'react-router-dom'

class noteEdit extends React.Component{
    constructor(props){
        super(props)
        this.state={
            note : props.location.state.note,
            redirect:false
        }
    }

    submitHandle=(formData)=>{
        const id = this.props.match.params.id
        axios.put(`/notes/${id}`, formData, {
            headers:{
                "x-auth" : localStorage.getItem("authToken")
            }
        })
        .then(response=>{
            if(response.data.hasOwnProperty('notes')){
                alert(response.data.message)
            }else{
                this.setState({redirect:true, note:response.data})
            }
        })
        .catch(err=>{
            alert(err)
        })
    }

    render(){
        console.log("note",this.state.note)
        return(
            <div>
                <h2>Edit Note</h2>
                <Form note={this.state.note} submitHandle={this.submitHandle}/>
                {this.state.redirect && <Redirect to={{ pathname: `/notes/${this.state.note._id}` , state: {note: this.state.note} }} />}
            </div>
        )
    }
}

export default noteEdit