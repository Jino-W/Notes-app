import React from 'react'
import {connect} from 'react-redux'
import { startEditCategory, startDeleteCategory } from '../../actions/categories'
import {startGetCategories, startCreateCategory} from '../../actions/categories'

class List extends React.Component{
    constructor(){
        super()
        this.state = {
            name:"",
            editName:"",
            isEdit: false
        }
    }

    deleteHandle=(e,id)=>{
        e.preventDefault()
        this.props.dispatch(startDeleteCategory(id))
    }

    editHandle=(e, category)=>{
        e.preventDefault()
        console.log("e", category.name)
        this.setState({isEdit: category._id, editName: category.name})
    }

    editSubmitHandle=(e)=>{
        console.log(this.state.isEdit)
        e.preventDefault()
        console.log("s", this.state.editName)
        this.props.dispatch(startEditCategory(this.state.isEdit,  {"name": this.state.editName}))
        this.setState({isEdit: false})
    }

    handleChange=(e)=>{
        this.setState({[e.target.name] : e.target.value})
    }


    handleSubmit=(e)=>{
        e.preventDefault()
        this.props.dispatch(startCreateCategory({"name":this.state.name}))
        this.setState({name:""})
    }

    componentDidMount(){
        this.props.dispatch(startGetCategories())
    }
    
    render(){
        return(
            <div className="row mt-5">
                {this.props.categories &&
                    <div className="col-md-6 offset-md-3 list-group" style={{overflowX:"hidden", wordWrap:"break-word"}}>
                        <li className="list-group-item active">
                            <h4 className="float-left">Listing Categories - {this.props.categories.length}</h4>
                            <div className="float-right mr-2">
                            <input type= "text" name="name" value={this.state.name} placeholder="Create Category" onChange={this.handleChange} />&nbsp;
                            <span><input type="submit" className="btn btn-primary btn-sm btn-outline-light float-right" onClick={this.handleSubmit} /></span>
                            </div>
                        </li >
                        <div className="ml-5 mt-3 row" >
                        {this.props.categories.map(category=>{
                            return(
                                <li className="mt-3 card col-md-2 ml-2 mr-1" key={category._id}>
                                    {this.state.isEdit == category._id ?
                                        (<React.Fragment key={category._id}>
                                            <a href='# ' className="row justify-content-end mb-1"><i className="fas fa-times-circle" style={{color:'#007BFF'}} onClick={()=>{this.setState({isEdit: false})}}></i></a>
                                            <div className="mb-1"><input type= "text" name="editName" value={this.state.editName} placeholder="Edit Category" onChange={this.handleChange} /></div>
                                            <a><i className="ml-3 fa fa-check-circle" style={{color:'#007BFF'}} onClick={(e)=>{this.editSubmitHandle(e)}} aria-hidden="true"></i></a>
                                        </React.Fragment>):(
                                        <a href="# " style={{color:'#2d2e31'}} >{category.name}</a>
                                        )
                                    }
                                    <a href = "# " className="justify content end"><i className="ml-3 fas fa-edit" onClick={(e)=>this.editHandle(e, category)} style={{color:'#007BFF'}}></i></a>
                                    <a href='# ' className="justify content end"><i className="ml-3 fas fa-trash-alt" onClick={(e)=>this.deleteHandle(e, category._id)} style={{color:'#007BFF'}} ></i></a>
                                </li>
                            )
                        })}
                        </div>
                    </div>
                }
                <div className="col-md-3"></div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps)(List)