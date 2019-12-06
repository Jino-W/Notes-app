import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import PrivateRoute from './components/common/PrivateRoute'


import Register from "./components/users/Register"
import Login from "./components/users/Login"

import List from './components/category/List'
import Show from './components/category/Show'

import NoteList from './components/notes/List'
import noteCreate from './components/notes/Create'
import noteEdit from './components/notes/Edit'
import noteShow from './components/notes/Show'
import NavBar from './components/common/Navbar';
import './App.css'



function App() {


  return (
    <Router>
      <div>
        <NavBar />


        <Switch>
          <Route exact path='/' component={NoteList} />

          <Route exact path='/users/register' component={Register} />
          <Route exact path='/users/login' component={Login} />

          <PrivateRoute exact path='/notes' component={NoteList} />
          <PrivateRoute exact path='/notes/new' component={noteCreate} />
          <PrivateRoute exact path='/notes/1/:id' component={noteEdit} />
          <PrivateRoute exact path='/notes/:id' component={noteShow} />

          <PrivateRoute exact path='/categories' component={List} />
          <PrivateRoute exact path='/categories/:id' component={Show} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;
