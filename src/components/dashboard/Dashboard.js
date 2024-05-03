import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { Alert, Card, H5, Button } from "@blueprintjs/core";
import Loader from '../loader/Loader';
import Title from '../title/Title';
import About from '../about/About';
import MealLineChart from './MealLineChart';

class Dashboard extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user: {
          name: '',
          id: ''
        },
        diet: {
          goal: {
            tdee: '',
            action: '',
            activity: '',
            bmr: ''
          },
          current: {
            tdee: '',
            meals: []
          }
        
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

      fetchDietDetails = (id) => {
        if (id != undefined){
            fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_DEPLOYED_URL}/user/${id}/diet/details`, {
              method: 'get',
              headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            })
            .then(response => response.json())
            .then(data => {
              this.setState({diet: data.diet})
            });
        }
        
      }
  
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
          this.fetchDietDetails(data.user.id);

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
          this.fetchDietDetails();
          
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

      const {user, timedOut, loading, message, alert} = this.state;
      const {diet} = this.state;
      const { goal, current } = diet;

      const mealData = current.meals.map(meal => ({
        name: meal.name,
        calories: parseInt(meal.total_calories) 
      }));
      const goalTdee = parseInt(goal.tdee); 
      
      let action = diet.goal.action;
      let eat = diet.goal.action == "gain" ? "more" : "less";
      let current_tdee = diet.current.tdee 
      let goal_tdee = diet.goal.tdee;
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
              <>
              {loading && (
                <div className="loader-overlay">
                    <Loader message={message} />
                </div>
              )}
              <div className='vw-100 vh-100 d-flex flex-column justify-center items-center' style={{ display: loading ? 'none' : '' }}>
              <Title text={`${user.name}'s Dashboard`} color="#FFE39F" />
              <About text={`The dashboard allows you to quickly view your calories for the day. Given that you aim to ${action} weight, you should aim to consume ${eat} than the calories mentioned below`} />
              <div className="flex align-items justify-between ml5 ph4-ns">
                <table className="mt2" style={{ border: '2px solid #a6d940', borderRadius: '5px', padding: '0.5rem' }}>
                  <caption className="tc"><h2 className="f3">Calories consumed today</h2></caption>
                  <thead>
                    <tr>
                      <th className="tc"><h2 className="f3">Current</h2></th>
                      <th className="tc"><h2 className="f3">Goal</h2></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="tc f1">
                        <h1 className={`dashboard mt1 ${action === "gain" ? parseFloat(current_tdee) < parseFloat(goal_tdee) ? "dark-red" : "green" : parseFloat(current_tdee) > parseFloat(goal_tdee) ? "dark-red" : "green"}`}>
                          {current_tdee}
                        </h1>
                      </td>
                      <td className="tc f1"><h1 className="mt1">{goal_tdee}</h1></td>
                    </tr>
                  </tbody>
                </table>
                <div className="w-60 mt5">
                <div>
                  <MealLineChart mealData={mealData} goalTdee={goalTdee} />
                </div>

                </div>
              </div>
            </div>

              </>
              
            )
          }
        </div>
      );
        
      
    }
  }
  export default Dashboard;

  