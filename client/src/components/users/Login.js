import React from "react"
import {connect} from 'react-redux'
import {startUserLogin} from '../../actions/user'
import "../../bootstrap.css"
import {Link} from "react-router-dom"



class Login extends React.Component{
    constructor(){
        super()
        this.state={
            email:'',
            password:''
        }
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const formData = {
            email:this.state.email,
            password:this.state.password
        }

        console.log(formData)

        this.setState({
            email:'',
            password:''
        })

        this.props.dispatch(startUserLogin(formData,this.props))
    }

    render(){
        return(
            <div class="container" style={{color: "black"}}>
                <div class="row">
                    <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div class="card card-signin my-5">
                            <div class="card-body">
                                <h5 class="card-title text-center">User Login</h5>
                                <form id="form-style" className="justify-content-center" onSubmit={this.handleSubmit}>
                                    <div className="form-group"> 
                                        <label  className="sr-only" htmlFor="email" >Email: </label>
                                        <input placeholder="jinoesther@gmail.com" id="email" className="form-control" type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label  className="sr-only" htmlFor="pass">Password : </label>
                                        <input id="pass" placeholder="Jino@811*" className="form-control" type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                                    </div>
                                    <div>
                                        <Link className="float-left" to='/users/register'><ins>Create new account</ins></Link>
                                        <input type="submit" className="btn btn-primary btn-sm float-right" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



export default connect()(Login);