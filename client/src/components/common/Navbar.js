import React from 'react'
// import Home from './Home'
import {NavLink} from "react-router-dom"
// import "./navbar.css"
import axios from "../../config/axios"
import "../../bootstrap.css"

function NavBar() {

    function handleLogout(){
      axios.delete('/users/logout', {
          headers:{
              "x-auth" : localStorage.getItem("authToken")
          }
      })
          .then(response=>{
              console.log(response.data)
              localStorage.removeItem("authToken")
              window.location.href = "/"  
              window.location.reload()
          })
          .catch(err=>{
              alert(err)
          })
    }
  
  

return (
    <div className='sticky-top'>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{backgroundColor:"#FFFFFF", borderBottom:"solid 1px white"}}>
            <a className="navbar-brand" href={null}><i className="fa fa-book mr-1" aria-hidden="true"></i>Take Notes</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto row">
                    {/* <li className="nav-item" >
                        <NavLink 
                            className="nav-link"
                            exact 
                            to="/" 
                            activeClassName="active">Home
                        </NavLink>
                    </li> */}
                    <li className="nav-item" >
                        <NavLink 
                            className="nav-link" 
                            exact 
                            to="/notes" 
                            // activeClassName="active"
                            >Notes
                        </NavLink>
                    </li>
                    <li className="nav-item" >
                        <NavLink 
                            className="nav-link" 
                            exact 
                            to="/categories" 
                            // activeClassName="active"
                            >categories
                        </NavLink>
                    </li>
                    {!localStorage.getItem('authToken') &&
                    <li className="float-left nav-item" >
                        <NavLink 
                            className="nav-link" 
                            to="/users/register" 
                            exact 
                            // activeClassName="active"
                            >SignUp
                        </NavLink>
                    </li>}
                    {!localStorage.getItem('authToken') ?
                    (<li className="float-left nav-item" >
                        <NavLink 
                            className="nav-link" 
                            to="/users/login" 
                            exact 
                            // activeClassName="active"
                            >Login
                        </NavLink>
                    </li>):(<li className="justify-content-end nav-item" >
                        <NavLink 
                            className="nav-link" 
                            to="# "
                            onClick={handleLogout} 
                            // activeClassName="active"
                            >Logout
                        </NavLink>
                    </li>)}
                </ul>
            </div>
        </nav>
    </div>
)

}

export default NavBar 