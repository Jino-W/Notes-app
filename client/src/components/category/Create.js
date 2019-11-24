import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

class List extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            category : props.location.history.category,
            name : ""
        }
    }


    handleChange=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    submitHandle=()=>{
        axios.post('/categories', formData, {
            headers:{
                "x-auth": localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log(response.data)
            this.setState(prevState=>{
                return {categories: prevState.categories.concat(response.data), name:""}
            })
        })
        .catch(err=>{
            alert(err)
        })
    }

    
    render(){
        return(
            <div>
                {this.state.categories &&
                    <div>
                        <h2>Category</h2>
                        
                    </div>
                }
                <br/>
                <input type= "text" name="name" value={this.state.name} placeholder="Enter category name" onChange={this.handleChange} />&nbsp;
                <button onClick={this.handleSubmit} >click ok!</button>
            </div>
        )
    }
}

export default List