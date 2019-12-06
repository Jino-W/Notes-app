import React from 'react'
import Form from './Form'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {startShowNote} from "../../actions/note"
import {startEditNote} from '../../actions/notes'

class noteEdit extends React.Component{

    constructor(props){
        super(props)
        this.state={
            editNoteId: this.props.editNoteId
        }
    }

    submitHandle=(formData)=>{
        this.props.dispatch(startEditNote(this.props.editNoteId, formData))
        this.props.cancelHandle()
    }

    componentDidMount(){
        const id=this.props.editNoteId
        this.props.dispatch(startShowNote(id, this.props))
    }

    render(){
        return(
            <div style={{color: "black"}}>
                <a href='# ' className="row justify-content-end mr-2"><i className="fas fa-times-circle" onClick={()=>this.props.cancelHandle()}></i></a>
                <h4 className="text-center">Edit Note</h4>
                {this.props.note.categoryId && <Form note={this.props.note} submitHandle={this.submitHandle}/>}
                <br/>
            </div>
        )
    }
}

const mapStateToProps = (state, props)=> {   
    return {
        note: state.notes.find(note => props.editNoteId == note._id)  || state.note
    }
}

export default connect(mapStateToProps)(noteEdit)