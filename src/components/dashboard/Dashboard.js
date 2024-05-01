import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { Alert} from "@blueprintjs/core";

class Dashboard extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user: {
          name: '',
          id: ''
        },
        loggedIn : null,
        timedOut: null,
        loading: true,
        message: '',
        alert: {
            isLoading: false,
            isOpen: true
        },
      };
    }

    setUserDetails = (name, id, loggedIn) => {
      this.setState({ user: { name: name, id: id }, loggedIn: loggedIn, timedOut: false});
      };
  
      clearSession = () => {
  
      this.setState({ user: { name: '', id: '' }, loggedIn: false, timedOut: true});
      };
  
      checkSession = () => {
      fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_DEPLOYED_URL}/user`, {
          method: 'get',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include'
      })
      .then(response => response.json())
      .then(data => {
          if (data.loggedIn === true){
          this.setUserDetails(data.user.username, data.user.id, data.loggedIn);
          } else if (data.loggedIn === false){
          this.clearSession();
          } else {
          console.log(data.error);
          }
      });
      };
  
      componentDidMount() {
          setTimeout(() => {
              this.setState({ loading: false });
          }, 3000);
          this.checkSession();
          
      }
  
      handleMoveConfirm = () => {
          let alert = {...this.state.alert};
          alert.isLoading = true;
          this.setState({ alert });
  
          
          const close = () => {
              let alert = {
                  isLoading: false,
                  isOpen: false
              }
              this.setState({ alert });
              window.location.replace("/#/login");
          };
          setTimeout(close, 2000);
      };
  
    render() {

      const {user, timedOut, alert} = this.state;

      return (
        <div>
          {timedOut ? 
            (
                <Alert
                    style={{backgroundColor: "#6eadca", color: "#ffe39f", fontWeight: "bold"}}    
                    confirmButtonText="Login"
                    intent={"success"}
                    isOpen={alert.isOpen}
                    loading={alert.isLoading}
                    onConfirm={this.handleMoveConfirm}
                >
                <p>
                    Your session has ended, please log back in again
                </p>
                </Alert>
            )
            :
            (
              <h1 className='white'>Welcome {user.name}</h1>
            )
          }
        </div>
      );
    }
  }
  export default Dashboard;

  