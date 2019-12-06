import React from 'react'
import Form from './Form'
import {connect} from 'react-redux'
import "../../bootstrap.css"
import {startCreateNote} from '../../actions/notes'

class noteCreate extends React.Component{

    submitHandle=(formData)=>{
        this.props.dispatch(startCreateNote(formData))
        this.props.cancelHandle()
    }

    render(){
        return(
            <div style={{color: "black"}}>
                <a href='# ' className="row justify-content-end mr-2"><i className="fas fa-times-circle" onClick={()=>this.props.cancelHandle()}></i></a>
                <h4 className="text-center">Create Notes</h4>
                <Form submitHandle={this.submitHandle}/>
            </div>
        )
    }
}

export default connect()(noteCreate)