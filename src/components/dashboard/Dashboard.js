import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { Alert, Card, H5, Button } from "@blueprintjs/core";
import Loader from '../loader/Loader';
import Title from '../title/Title';
import About from '../about/About';
import MealLineChart from './MealLineChart';

/**
 * 
 * The Dashboard component displays the goal and current calories intake of 
 * the user for the day. Alongside this it also displays the line chart showing
 * the calories in each meal
 * 
 * @property {Object} state - The state of the component
 * @property {Object} state.user - Represents the user logged into the session
 * @property {Object} state.diet.current - Represents the current meals of the user and the total calories consumed by them today
 * @property {Object} state.diet.current.tdee - Represents the total calories consumed by them today
 * @property {Object} state.diet.current.meals - Represents the current meals of the user 
 * @property {Object} state.diet.goal.tdee - Represents the goal calories for the user
 * @property {Object} state.diet.goal.action - Represents wether the user wants to gain or loose weight
 * @property {Object} state.loggedIn - Represents whether the user is logged in or not, this is used to alert the user if their session ends
 * @property {Object} state.timedOut- Represents if the user's session is valid or not
 * @property {Object} state.loading - Flag used to trigger the loading screen
 * @property {Object} state.alert - Flag used to trigger the alerts
 * 
 * 
 * 
 * @author Hamdan Sulaiman
 *
 * @example 
 * <Dashboard />
 *
 */

class Dashboard extends Component {
  
    /**
     * Initializes the state of the Dashboard component.
     *
     * @summary This method initializes the state of the Dashboard component with default values.
     * 
     * @constructor
     * @param {Object} props - The props passed to the Dasboard component.
     * @constructs Dasboard
     * @memberOf Dashboard
     * @method constructor
     */  
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

    /**
     * Updates the session details and whether they are logged in or not
     * 
     * @summary This method uses setState to set the user' data
     * 
     *
     * @param {Object} name - Name of the user
     * @param {string} id - Id of the user
     * @param {boolean} loggedIn - Wehther the user is logged in or not
     */

    setUserDetails = (name, id, loggedIn) => {
      this.setState({ user: { name: name, id: id }, loggedIn: loggedIn, timedOut: false});
      };

      /**
     * Clears the session details and logs them out
     * 
     * @summary This method uses setState to remove the user's data
     * 
     *
     */
  
      clearSession = () => {
  
      this.setState({ user: { name: '', id: '' }, loggedIn: false, timedOut: true});
      };


    /**
     * Fetches the user's details and diet plan
     * 
     * @summary This method uses setState to remove the user's data
     * 
     * @instance
     * @memberOf Dashboard
     * @method fetchUserDetails
     *
     * @param {string} id - Id of the user
     */

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

    /**
     * Check's wehther the user is part of the session or not if the user is logged in, the user's details are set, if not the user's details are cleared
     * 
     * @summary This method check's if the user is in session
     * 
     * @instance
     * @memberOf Dashboard
     * @method checkSession
     * 
     */
  
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

      /**
     * On mounting the componenet, it is checked if the user is in session and the user's diet plan is fetches
     * @summary This method checks for the sesion and fetches the diet plan on mounting
     * 
     * @instance
     * @memberOf Dashboard
     * @method componentDidMount
     */
  
      componentDidMount() {
          setTimeout(() => {
              this.setState({ loading: false });
          }, 3000);
          this.checkSession();
          this.fetchDietDetails();
          
      }

    /**
     * Used to close the alert that is disaplyed either of succes or failure
     * 
     * @instance
     * @memberOf Dashboard
     * @method handleMoveConfirm
     * 
     * @summary This method controls the alert
     * 
     */
  
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

      /**
     * Displays the components of the Dashboard Module
     *
     * @summary This method renders the components of the Dashboard Module.
     * 
     * @instance
     * @memberOf Dashboard
     * @method render
     * 
     * @returns {JSX.Element} The JSX elements representing the rendered components.
     * 
     */
  
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
      let current_tdee = diet.current.tdee.length == 0 ? 0 : diet.current.tdee;
      let goal_tdee = diet.goal.tdee.length == 0 ? 0 : diet.goal.tdee;
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

  