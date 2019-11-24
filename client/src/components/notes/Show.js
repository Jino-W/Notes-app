import React from 'react'
import axios from '../../config/axios'
import {Link,Redirect} from 'react-router-dom'

class Show extends React.Component{
    constructor(props){
        super(props)
        this.state={
            note : props.location.state.note,
            redirectToReferrer: false
        }
    }

    handleBack=()=>{
        this.setState({redirectToReferrer:true})
    }

    deleteHandle=(id)=>{
        axios.delete(`/notes/${id}`,{
            headers:{
                "x-auth" : localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log("delete",response.data)
            this.props.history.push('/notes')
            window.location.reload()

        })
        .catch(err=>{
            alert(err)
        })
    }

    render(){
        console.log(this.state.note)
        const {_id,title,description,categoryId} = this.state.note
        return(
            <div>
                <div>
                    <h2>Contact Information</h2>
                    <p><strong>Id:</strong> {_id}</p>
                    <p><strong>Name:</strong> {title}</p>
                    <p><strong>Email:</strong> {description}</p>
                    <p><strong>Category:</strong> {categoryId.name}</p>
                </div>
                <div>
                    <Link to={`/notes`} onClick={()=>{this.deleteHandle(_id)}}>Delete</Link> | 
                    <Link to= {{ pathname: `/notes/1/${_id}` , state: {note: this.state.note} }}>Edit</Link>
                    <br/><br/>
                
                    <button onClick = {this.handleBack}>Back</button>
                    {this.state.redirectToReferrer && <Redirect to={`/notes`} />}
                </div>
            </div>
        )
    }
}


export default Show

