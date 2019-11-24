import React from "react"
import axios from '../../config/axios'

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
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const item = this.state.categories.find(category=>{
            return category.name === this.state.category
        })
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
        console.log(this.state.note)
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Title: &nbsp;
                        <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                    </label><br/><br/>
                    <label>Description: &nbsp;
                        <input type="textarea" name="description" value={this.state.description} onChange={this.handleChange} />
                    </label><br/><br/>
                    <label>Category: &nbsp;
                        <select value={this.state.category} name="category" onChange={this.handleChange}>
                            {this.state.categories.map(category=>{
                                return (
                                    <option key={category._id} name="category" value = {category.name}>{category.name}</option>
                                )
                            })}
                        </select>
                    </label><br/><br/>
                    <input type="submit" />
                </form>
            </div>
        )
    }
}



export default Form;