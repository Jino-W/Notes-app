import React from 'react';
import axios from './config/axios'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'

import Home from './components/common/Home'

import Register from "./components/users/Register"
import Login from "./components/users/Login"

import List from './components/category/List'
import Show from './components/category/Show'

import NoteList from './components/notes/List'
import noteCreate from './components/notes/Create'
import noteEdit from './components/notes/Edit'
import noteShow from './components/notes/Show'



function App() {
  function handleLogout(){
    axios.delete('/users/logout', {
        headers:{
            "x-auth" : localStorage.getItem("authToken")
        }
    })
        .then(response=>{
            console.log(response.data)
            localStorage.removeItem("authToken")
            window.location.reload()
            window.location.href = "/"   
        })
        .catch(err=>{
            alert(err)
        })
  }


  return (
    <Router>
      <div>
        <h2>Notes App</h2>
        <Link to='/' >Home</Link>

        {localStorage.getItem('authToken') ? 
        (<div>
          <li><Link to='/categories'>Categories</Link></li>
          <li><Link to='/notes'>Notes</Link></li>
          <li><Link to='#' onClick={handleLogout}>Logout</Link></li>
        </div> ):(
        <div>
          <li><Link to='/users/register'>Register</Link></li>
          <li><Link to='/users/login'>Login</Link></li>
        </div>)}


        <Switch>
          <Route exact path='/' component={Home} />

          <Route exact path='/users/register' component={Register} />
          <Route exact path='/users/login' component={Login} />

          <Route exact path='/notes' component={NoteList} />
          <Route exact path='/notes/new' component={noteCreate} />
          <Route exact path='/notes/1/:id' component={noteEdit} />
          <Route exact path='/notes/:id' component={noteShow} />

          <Route exact path='/categories' component={List} />
          <Route exact path='/categories/:id' component={Show} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;
