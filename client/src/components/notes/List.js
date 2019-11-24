import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

class NoteList extends React.Component{
    constructor(){
        super()
        this.state={
            notes : []
        }
    }

    componentDidMount(){
        axios.get('/notes', {
            headers:{
                "x-auth" : localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log("response",response.data)
            const notes = response.data
            this.setState({notes})
        })
        .catch(err=>{
            alert(err)
        })
    }

    render(){
        console.log(this.state.notes)
        return(
            <div>
                {this.state.notes &&
                    <div>
                        <h2>Listing Notes - {this.state.notes.length}</h2>
                        <ul>{
                            this.state.notes.map((note)=>{
                                return(
                                    <li key={note._id}><Link to ={{pathname: `/notes/${note._id}`, state:{note:note}}}>{note.title} - {note.description}</Link></li>
                                )
                            })
                        }</ul>
                    </div>
                }
                
                <Link to= {{ pathname: `/notes/new`}}>New note</Link>

            </div>
        )
    }
}


export default NoteList