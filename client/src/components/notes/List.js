import React from 'react'
import {connect} from "react-redux"
import {startGetNotes} from "../../actions/notes"
import { CirclePicker } from 'react-color';
import reactCSS from 'reactcss'
import Modal from 'react-modal';
import {startEditNote} from '../../actions/notes'
import Create from "../notes/Create"
import Edit from "../notes/Edit"
import "../../bootstrap.css"
import { startDeleteNote } from '../../actions/notes'



class NoteList extends React.Component{
    constructor(){
        super()
        this.state={
            color:"",
            displayColorPicker: false,
            modalIsOpen: false,
            editNoteId: false,
        }
    }

    componentDidMount(){
        this.props.dispatch(startGetNotes())
    }

    //Modal open
    openModal = () => {
        this.setState({modalIsOpen: true});
    }

    //create-Task,Label Modal close
    closeModal = () => {
        this.setState({modalIsOpen: false, editNoteId: false});
    }

    handleClick = (id) => {
        this.setState({ displayColorPicker: id })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: undefined })
    };

    handleChangeComplete = (color) => {
        let clr = color.hex
        let formData={"color": clr}
        this.props.dispatch(startEditNote(this.state.displayColorPicker, formData, this.props))
        this.setState({ color: clr});
    };

    deleteHandle=(e, id)=>{
        e.preventDefault()
        this.props.dispatch(startDeleteNote(id, this.props))
    }

    render(){
        // modal style
        const customStyles = {
            content : {
              top                   : '50%',
              left                  : '50%',
              right                 : 'auto',
              bottom                : 'auto',
              minWidth              : '30%',
              marginRight           : '-50%',
              transform             : 'translate(-50%, -50%)',
              overflow              : 'visible'
            }
        };
        //color-palette
        const styles = reactCSS({
            'default': {
              color: {
                width: '36px',
                height: '14px',
                borderRadius: '2px',
                background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
              },
              swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
              },
              popover: {
                position: 'absolute',
                zIndex: '2',
              },
              cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
              },
            },
          });
          console.log(this.state.color)
        return(
            <div className="row">
                {this.props.notes &&
                    <div className="col-md-10 offset-md-1">
                        <div className="row mt-3 ml-5">
                            <h2>Listing Notes - {this.props.notes.length}</h2>
                            <a className="ml-3 mt-2" href= "# " onClick={this.openModal}><i className="fa fa-plus-circle" aria-hidden="true"></i></a>
                            {/* Create Note Modal */}
                            <Modal isOpen={this.state.modalIsOpen} style={customStyles} onRequestClose={this.closeModal} contentLabel="Create Note">
                                <Create cancelHandle={this.closeModal}/>
                            </Modal>
                        </div>
                        <ul className="row mt-2">{
                            this.props.notes.map((note, index)=>{
                                return(
                                    <div key={note._id} className="col-md-3">
                                        <div className={`card text-white mb-3 `}  style={{maxWidth: "17rem", backgroundColor: note.color}}  key={note._id}>
                                            <div className="card-header">
                                                <span><h5 className="float-left"> {note.title}</h5></span>
                                                <span key={note._id} className= 'badge badge-pill badge-secondary ml-2'>
                                                    <a href="# " className="green" data-toggle="tooltip" title="view related tickets" style={{color:'white', textDecoration: "none"}}>{note.categoryId.name}</a>
                                                </span>
                                            </div>
                                            <div className="card-body">
                                                <p className="card-text">{note.description}</p>
                                                <div className="row">
                                                    <a href = "# " onClick={()=>{this.setState({editNoteId: note._id})}}  className="justify content end"><i className="ml-3 fas fa-edit" style={{color:'white'}}></i></a>
                                                    {/* Edit Note Modal */}
                                                    <Modal isOpen={this.state.editNoteId !== false} style={customStyles} onRequestClose={this.closeModal} contentLabel="Edit Note">
                                                        <Edit cancelHandle={this.closeModal} editNoteId={this.state.editNoteId}/>
                                                    </Modal>
                                                    <a href = "# " className="justify content end"><i className="ml-3 fas fa-palette" style={{color:'white'}}  onClick={ ()=>this.handleClick(note._id) }></i></a>
                                                    <a href='# ' className="justify content end"><i className="ml-3 fas fa-trash-alt"  style={{color:'white'}}  onClick={(e)=>this.deleteHandle(e, note._id)}></i></a>
                                                    <div>
                                                        <div >
                                                            <div style={ styles.color } />
                                                        </div>
                                                        { this.state.displayColorPicker == note._id ? <div style={ styles.popover }>
                                                        <div style={ styles.cover } onClick={ this.handleClose }/>
                                                        <CirclePicker color={ this.state.color } onChange={this.handleChangeComplete} />
                                                        </div> : null }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }</ul>
                    </div>
                }
                <div className="col-md-1"></div>
            </div>
        )
    }
}

Modal.setAppElement('#root')

const mapStateToProps=(state)=>{
    return {
        notes: state.notes
    }
}

export default connect(mapStateToProps)(NoteList)