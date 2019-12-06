import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { startEditCategory, startDeleteCategory } from '../../actions/categories'
import { startShowCategory } from '../../actions/category'


class Show extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: props.category ? props.category.name :"",
            isEdit: false,
        }
        props.category && console.log(props.category.name)
    }


    handleChange=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    deleteHandle=(id)=>{
        this.props.dispatch(startDeleteCategory(id, this.props))
    }

    submitHandle=()=>{
        this.props.dispatch(startEditCategory(this.props.match.params.id, {"name": this.state.name}, this.props))
        this.setState({isEdit:false})
    }

    editHandle=()=>{
        this.setState(prevState=>{
            return {isEdit: !prevState.isEdit}
        })
    }

    componentDidMount(){
        const id=this.props.match.params.id
        this.props.dispatch(startShowCategory(id, this.props))
    }
    
    
    render(){
        console.log("category",this.props.category)
        return(
            <div>
                {this.props.category && <div>
                    <h2>Category</h2>
                    <p>Name: {this.props.category.name}</p>
                    <Link to={`/categories`} onClick={()=>{this.deleteHandle(this.props.category._id)}}>Delete</Link> | 
                    <Link to="#" onClick={this.editHandle}>Edit</Link> |
                    <Link to= {{ pathname: `/notes`}}>Back</Link>

                    <br/><br/>
                                
                    {this.state.isEdit &&
                        <div>
                            <input type= "text" name="name" value={this.state.name} placeholder="Enter category name" onChange={this.handleChange} />&nbsp;
                            <button onClick={this.submitHandle} >click ok!</button>
                            <br/><br/>
                            <Link to="#" onClick={this.editHandle}>Back</Link>
                        </div>
                    }
                </div>}
            </div>
        )
    }
}


const mapStateToProps=(state, props)=>{
    return {
        category: state.categories.find(category=> category._id == props.match.params.id) || state.category
    }
}

export default connect(mapStateToProps)(Show)