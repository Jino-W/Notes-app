import React from "react"
import axios from '../../config/axios'
import "../../bootstrap.css"

class Form extends React.Component{
    constructor(props){
        super(props)
        this.state={
            note: props.note ?  props.note : '',
            title: props.note ?  props.note.title : "",
            description: props.note ? props.note.description : "",
            category: props.note ? props.note.categoryId.name : "",
            categories:[]
        }
    }

    handleChange=(e)=>{
        if(e.target.value !=="---select category---"){
            this.setState({
                [e.target.name] : e.target.value
            })
        }
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const item = this.state.categories.find(category=>{
            return category.name === this.state.category
        })
        console.log("i",item)
        const formData = {
            title: this.state.title,
            description: this.state.description,
            categoryId: item._id
        }

        this.props.submitHandle(formData)
    }

    componentDidMount(){
        axios.get("/categories",{
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log(response.data)
            const categories = response.data
            this.setState({categories})
        })
        .catch(err=>{
            console.log(err)
        })
    }


    render(){
        return(
            <div style={{color: "black"}}>
                <form className="mt-3" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label className="sr-only"  htmlFor="title">Title: </label>
                        <input id="title" placeholder="Name" className="form-control input-sm" type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                    </div>

                    <div className="form-group">
                        <label  className="sr-only" htmlFor="category">Category: </label>
                        <select  id="category" value={this.state.category}  className="form-control input-sm" name="category" onChange={this.handleChange}>
                            <option key="---select category---" name="category" value ="---select category---" >---select category---</option>

                            {this.state.categories.map(category=>{
                                return (
                                    <option key={category._id} name="category" value = {category.name}>{category.name}</option>
                                )
                            })}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="sr-only"  htmlFor="description">Description: </label>
                        <textarea id="description"  placeholder="Write the Note description..." className="form-control input-sm" type="textarea" name="description" value={this.state.description} onChange={this.handleChange} />
                    </div>
                    
                    <input type="submit"  className="btn btn-primary btn-block justify-content-center"  />
                </form>
            </div>
        )
    }
}



export default Form;