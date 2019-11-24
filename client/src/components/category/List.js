import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

class List extends React.Component{
    constructor(){
        super()
        this.state = {
            categories : [],
            name:""
        }
    }


    handleChange=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit=()=>{
        axios.post('/categories', {name: this.state.name}, {
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

    componentDidMount(){
        axios.get('/categories', {
            headers:{
                "x-auth": localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log(response.data)
            this.setState({categories: response.data})
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
                        <h2>Listing Categories - {this.state.categories.length}</h2>
                        {this.state.categories.map(category=>{
                            return(
                                <li key={category._id}><Link to={{pathname:`categories/${category._id}`, state:{category: category}}}>{category.name}</Link></li>
                            )
                        })}
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