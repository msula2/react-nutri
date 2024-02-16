import React, { Component } from 'react';

class Login extends Component{
    constructor(){
        super();
        this.state = {
            username: "",
            password: ""
        }
    }

    changeUsername = (event) =>{
        console.log(event);
        console.log("Changed username");
    }

    render(){
        return(
            <main className="pa4 black-80">
            <form className="measure center">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" for="email-address">Username</label>
                    <input onChange={this.changeUsername} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" for="password">Password</label>
                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                </div>
                <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
                </fieldset>
                <div className="">
                <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
                </div>
                <div className="lh-copy mt3">
                <a href="#0" className="f6 link dim black db">Sign up</a>
                </div>
            </form>
            </main>
        );
    }
}
export default Login;
