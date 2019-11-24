import React from 'react'
import axios from '../../config/axios'
import {Link, Redirect} from 'react-router-dom'

class List extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            category: props.location.state.category,
            name:"" || props.location.state.category.name,
            isEdit: false,
            redirectToReferrer: false

        }
    }

    handleBack=()=>{
        this.setState({redirectToReferrer:true})
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    deleteHandle=(id)=>{
        axios.delete(`/categories/${id}`,{
            headers:{
                "x-auth" : localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log("delete",response.data)
            this.props.history.push('/categories')
            window.location.reload()
        })
        .catch(err=>{
            alert(err)
        })
    }

    submitHandle=()=>{
        const id = this.props.match.params.id        
        axios.put(`/categories/${id}`, {name: this.state.name}, {
            headers:{
                "x-auth": localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log(response.data)
            this.setState({isEdit:false,category:response.data})
        })
        .catch(err=>{
            alert(err)
        })
    }

    editHandle=()=>{
        this.setState({isEdit:true})
    }
    
    
    render(){
        console.log("category",this.state.category)
        return(
            <div>
                <h2>Category</h2>
                <p>Name: {this.state.category.name}</p>
                <Link to={`/categories`} onClick={()=>{this.deleteHandle(this.state.category._id)}}>Delete</Link> | 
                <Link to={{ state:{category:this.state.category} }} onClick={this.editHandle}>Edit</Link> 

                <br/><br/>
                
                <button onClick = {this.handleBack}>Back</button>
                {this.state.redirectToReferrer && <Redirect to="/categories" />}

                <br/><br/>
                              
                {this.state.isEdit &&
                    <div>
                        <input type= "text" name="name" value={this.state.name} placeholder="Enter category name" onChange={this.handleChange} />&nbsp;
                        <button onClick={this.submitHandle} >click ok!</button>
                    </div>
                }
            </div>
        )
    }
}

export default List