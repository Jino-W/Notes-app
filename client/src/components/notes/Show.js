import React from 'react'
import {Link} from 'react-router-dom'
import { startDeleteNote } from '../../actions/notes'
import {startShowNote} from "../../actions/note"
import {connect} from "react-redux"

class Show extends React.Component{

    deleteHandle=(id)=>{
        this.props.dispatch(startDeleteNote(id, this.props))
    }

    componentDidMount(){
        const id=this.props.match.params.id
        this.props.dispatch(startShowNote(id, this.props))
    }

    render(){
        return(
            <React.Fragment>
                {this.props.note &&
                <div>
                    <div>
                        <h2>Contact Information</h2>
                        <p><strong>Id:</strong> {this.props.note._id}</p>
                        <p><strong>Name:</strong> {this.props.note.title}</p>
                        <p><strong>Description:</strong> {this.props.note.description}</p>
                        {this.props.note.categoryId && <p><strong>Category:</strong> {this.props.note.categoryId.name}</p>}
                    </div>
                    <div>
                        <Link to={`/notes`} onClick={()=>{this.deleteHandle(this.props.note._id)}}>Delete</Link> | 
                        <Link to= {{ pathname: `/notes/1/${this.props.note._id}`}}>Edit</Link> | 
                        <Link to= {{ pathname: `/notes`}}>Back</Link>
                    </div>
                </div>}
            </React.Fragment>
        )
    }
}

const mapStateToProps=(state, props)=>{
    return {
        note: state.notes.find(note => note._id === props.match.params.id) || state.note
    }
}

export default connect(mapStateToProps)(Show)

