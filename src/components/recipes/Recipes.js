import React, { Component } from 'react';
import Title from '../title/Title';
import { Omnibar } from "@blueprintjs/select";
import { Card, H4, Button, Drawer, Icon, MenuItem, ButtonGroup, OverlayToaster, Toast2, Alert} from "@blueprintjs/core";
import "./Recipes.css";
import About from '../about/About';
import Loader from '../loader/Loader';
import SearchRecipeUI from './SearchRecipeUI';
import AddRecipeUI from './AddRecipeUI';
import { recipes_desc } from '../../descriptions';

/**
 * 
 * The Recipe component allows the user to search for different recipes in the database
 * and incase they are not present the user can create a new recipe or delete one
 * 
 * @property {Object} state - The state of the component
 * @property {Object} state.user - Represents the user logged into the session
 * @property {Object} recipe_data - Represents the recipe which the user has searched for
 * @property {Object} new_recipe_data - Represents the new recipe which the user has created
 * @property {Array}  recipes - Represents the list of recipes coming from the database
 * @property {Array}  grams_breakdown - Represents the breakdown of wieght by nutrient type
 * @property {Object} state.loggedIn - Represents whether the user is logged in or not, this is used to alert the user if their session ends
 * @property {Object} state.timedOut- Represents if the user's session is valid or not
 * @property {Object} state.loading - Flag used to trigger the loading screen
 * @property {Object} state.alert - Flag used to trigger the alerts
 * @property {Object} state.ToasterSuccess - Used to display alert on success
 * @property {Object} state.ToasterFailed - Used to display alert on failure
 * @property {boolean} isSearchOpen - Indicates whether the search feature is currently open or not.
 * @property {boolean} isSearchDeleteOpen - Indicates whether the search deletion feature is currently open or not.
 * @property {boolean} isDrawerOpen - Indicates whether the drawer (like a sidebar or a dropdown menu) is currently open or not.
 * @property {string} drawerTitle - Represents the title of the drawer. It's currently empty if not set.
 * 
 * 
 * 
 * @author David Wacaser
 *
 * @example 
 * <Recipes/>
 *
 */



class Recipes extends Component{

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
            alert_delete: {
                isLoading: false,
                isOpen: true
            },
            delete_recipe: {},
            recipe_title: '',
            recipe_data: {
                title: '',
                description: '',
                ingredients: '',
                instructions: '',
                id: 0,
            },
            new_recipe_data: {
                title: '',
                description: '',
                ingredients: '',
                instructions: '',
            },
            isSearchOpen: false,
            isSearchDeleteOpen: false,
            isDrawerOpen: false,
            drawerTitle: '',
            recipes: [],
            serving_unit: '',
            grams_breakdown: [],
            calories_breakdown: {},
            showUi: {
                searchRecipe: false,
                addRecipe: false,
                deleteRecipe: false
            },
            ToasterSuccess: {
                show: false,
                message: ''
            },
            ToasterFailed: {
                show: false,
                message: ''
            },
            errors: {
                recipe_title: '',
                ingredients: 'A meal must be added first.'
            }
            
        };
    }
    /**
     * Upates the toaster to display either success or failure
     * 
     * @summary This method controls the alerts to display
     * 
     * @instance
     * @memberOf Recipes
     * @method updateToaster
     * 
     */
    updateToaster = (success, failed) => {
        if (success !== null) {
          this.setState({ToasterSuccess: {show: success.show, message: success.message}});
        }
        if (failed !== null) {
            this.setState({ToasterFailed: {show: failed.show, message: failed.message}});
        }
    };

    /**
     * Upates the timeout
     * 
     * @summary This method updates whther the user should be timedout or not
     * 
     * @instance
     * @memberOf Recipes
     * @method updateToaster
     * 
     */

    updateTimeout = (value) => {
        this.setState({timedOut: value});
    };


    /**
     * Used to close the alert that is disaplyed either of succes or failure
     * 
     * @instance
     * @memberOf Recipes
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
    
        clearSession = () => {
    
        this.setState({ user: { name: '', id: '' }, loggedIn: false, timedOut: true});
        };

    /**
     * Clears the session details and logs them out
     * 
     * @summary This method uses setState to remove the user's data
     * 
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
            } else if (data.loggedIn === false){
            this.clearSession();
            } else {
            console.log(data.error);
            }
        });
    };

    /**
     * On mounting the componenet, it is checked if the user is in session
     * 
     * @instance
     * @memberOf Register
     * @method componentDidMount
     */
    
    componentDidMount() {
        setTimeout(() => {
            this.setState({ loading: false });
        }, 3000);
        this.checkSession();
        
    }

    /**
     * Handles meal title change.
     * 
     * @instance
     * @memberOf Recipes
     * @method titleChange
     * 
     * @param {object} event - The event object.
     * 
     */
    titleChange = (event) => {
        const { value } = event.target;
        let errors = { ...this.state.errors };
        let dirty = {...this.state.dirty};

        dirty.title = true;

        errors.title = value.trim() === '' ? 'Recipe title is required.' : '';


        this.setState({ title: value, errors, dirty});
    }

    /**
     * Handles meal decription change.
     * 
     * @instance
     * @memberOf Recipes
     * @method descriptionChange
     * 
     * @param {object} event - The event object.
     * 
     */

    descriptionChange = (event) => {
        const { value } = event.target;
        this.setState({ description: value});
    }

    /**
     * Handles meal ingredient change.
     * 
     * @instance
     * @memberOf Recipes
     * @method ingredientsChange
     * 
     * @param {object} event - The event object.
     * 
     */


    ingredientsChange = (event) => {
        const { value } = event.target;
        this.setState({ ingredients: value});
    }

    /**
     * Handles meal instructions change.
     * 
     * @instance
     * @memberOf Recipes
     * @method instructionsChange
     * 
     * @param {object} event - The event object.
     * 
     */



    instructionsChange = (event) => {
        const { value } = event.target;
        this.setState({ instructions: value});
    }

    /**
     * Whenever the name changes for the recipe in the search bar, a query is made to the backend to fetch all possible
     * enteries that start with the first letter
     * 
     * @instance
     * @memberOf Recipes
     * @method nameChange
     * 
     * @param {object} event - The event object.
     * 
     */
   


    nameChange = (event) => {
        let value = event;

        if(value.trim() !== ''){
            fetch(`${process.env.NODE_ENV==='development' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_DEPLOYED_URL}/recipes/${value}/get`, {
                method: 'get',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            })
            .then(response => response.json())
            .then(data => {
                if (data.result === "success"){
                    this.setState({recipes: data.data});
                } 
            })
            .catch(error => {
                console.error('Error fetching recipe:', error);
            });
        }

    }

    /**
     * Handles opening the search bar
     * 
     * @instance
     * @memberOf Recipes
     * @method openSearchBar
     * 
     * 
     */


    openSearchBar = () => {
        this.setState({isSearchOpen: true});
    }

    /**
     * Handles closing the search bar
     * 
     * @instance
     * @memberOf Recipes
     * @method handleCloseChange
     * 
     * 
     */

    handleSearchClose = () => {
        this.setState({isSearchOpen: false});
    }

    /**
     * Handles opeining the delete search bar
     * 
     * @instance
     * @memberOf Recipes
     * @method openDeleteBar
     * 
     * 
     */


    openDeleteBar = () => {
        this.setState({isSearchDeleteOpen: true});
    }

    /**
     * Handles closing the delete search bar
     * 
     * @instance
     * @memberOf Recipes
     * @method handleDeleteClose
     * 
     * 
     */

    handleDeleteClose = () => {
        this.setState({isSearchDeleteOpen: false});
    }

    /**
     * Handles opening the model that contains the add recipe's ui
     * 
     * @instance
     * @memberOf Recipes
     * @method openAddRecipe
     * 
     * 
     */


    openAddRecipe = () => {
        let showUi = {...this.state.showUi};
        Object.keys(showUi).forEach(key => {
            showUi[key] = key === 'addRecipe';
        });
        this.setState({isDrawerOpen: true, showUi, drawerTitle: "Add Recipe"});
    }
    
    closeDrawer = () => {
        
        this.setState({isDrawerOpen: false});
    }


    handleItemSelectSearch = (recipe) => {
        let showUi = {...this.state.showUi};
        Object.keys(showUi).forEach(key => {
            showUi[key] = key === 'searchRecipe';
        });
        this.setState({isSearchOpen: false, isDrawerOpen: true, drawerTitle: recipe.title, recipe_data: recipe, showUi});
    }

    handleItemDeleteSearch = (recipe) => {
        this.setState({isSearchDeleteOpen: false});
        let showUi = {...this.state.showUi};
        Object.keys(showUi).forEach(key => {
            showUi[key] = key === 'deleteRecipe';
        });
        this.setState({recipe_data: recipe, showUi});
    }


    handleDeleteConfirm = () => {
        let alert_delete = {...this.state.alert};
        alert_delete.isLoading = true;
        this.setState({ alert_delete });

        fetch(`${process.env.NODE_ENV==='development' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_DEPLOYED_URL}/recipe/delete`, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                title: this.state.recipe_data.title
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === "success"){
               this.updateToaster({show: true, message: data.message}, null)
            } else{
                this.updateToaster(null, {show: true, message: data.message})
            }
            let alert_delete = {
                isLoading: false,
                isOpen: false
            }
            this.setState({ alert_delete });
        })
        .catch(error => {
            console.error('Error occurred while deleting recipe:', error);
        });
        this.setState({recipe_data: {}})

    };

    handleItemSelectDelete = (recipe) => {
        let showUi = {...this.state.showUi};
        Object.keys(showUi).forEach(key => {
            showUi[key] = key === 'deleteRecipe';
        });
        this.setState({isSearchOpen: false, showUi, delete_recipe: recipe});
    }

    renderItem = (recipe, { handleClick, modifiers }) => {
        return (
            <MenuItem
                key={recipe.title}
                text={recipe.title}
                onClick={() => handleClick(recipe)}
                active={modifiers.active}
            />
        );
    };

    itemMatcher = (query, recipes) => {
        const matches = recipes.filter(recipe => {
            return recipe.title.toLowerCase().includes(query.toLowerCase());
        });
    
        return matches;
    };

    render(){
        const {recipe_data, recipe_title, isSearchOpen, isSearchDeleteOpen, recipes, timedOut, ToasterSuccess, ToasterFailed,loading, drawerTitle, isDrawerOpen, message, alert,alert_delete, showUi, errors } = this.state;
        return (
            <div className='vh-100 d-flex flex-column justify-center items-center'>
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
                {ToasterSuccess.show &&
                (<OverlayToaster className="mt5">
                    <Toast2 
                    icon="tick-circle" 
                    intent="success" 
                    message={ToasterSuccess.message}
                    isCloseButtonShown={false}
                    action={{
                        text: "Refresh",
                        onClick: () => window.location.reload() 
                    }}
                    timeout={0}
                    
                    />
                </OverlayToaster>
                )}
                {ToasterFailed.show &&
                (<OverlayToaster className="mt5">
                    <Toast2 
                    icon="warning-sign" 
                    intent="danger" 
                    message={ToasterFailed.message} 
                    isCloseButtonShown={false}
                    action={{
                        text: "Refresh",
                        onClick: () => window.location.reload() 
                    }}
                    timeout={0}
                    
                    />
                </OverlayToaster>
                )}
                <div className="flex">
                <div className="w-60">
                    <Title text={`Recipes`} />
                    <About text={recipes_desc}/>
                    <div style={{paddingLeft: "2rem", paddingRight: "2rem", marginLeft: "4rem"}}>
                        <h2>Instructions <Icon icon="info-sign" className="mb1 ml1"/> </h2>
                        <ul className="w-60">
                        <li><strong className="mr2">Search Recipes:</strong>Explore our database of recipes that are designed to be packed with nutrients. Selecting a recipe will show details regarding its ingredients, the calories present in them, the instructions for preparing them. Click on the Search Recipes button to get started!</li>
                        <li><strong className="mr2">Add Recipes:</strong>Unable to find a recipe you are looking for ? You can create a personalized recipe using the Add Recipe button. Create a recipe, add ingredients and the method of preperation!</li>
                        <li><strong className="mr2">Delete Recipes:</strong>Added the wrong recipe by mistake, you can delete it using the Delete Recipe button!</li>
                        </ul>
                    </div>
                </div>
                <div className="flex items-center w-40">
                    <div className="mt5 flex">
                        <div>   
                            <Card interactive={true} elevation={4} className="card-content flex items-center justify-center" style={{height: "300px", width: "300px"}}>
                            <div>
                                <ButtonGroup fill={true} large={true} vertical={true}>
                                    <Button className="customButton submit-btn" icon={<Icon icon="database" intent="primary" style={{color: "white"}} />} text="Search for a recipe" onClick={this.openSearchBar}/>
                                    <Button className="customButton submit-btn" icon={<Icon icon="plus" intent="primary" style={{ color: "white" }} />} text="Add Recipe" onClick={this.openAddRecipe}/>
                                    <Button className="customButton submit-btn" icon={<Icon icon="delete" intent="primary" style={{ color: "white" }} />} text="Delete Recipe" onClick={this.openDeleteBar}/>
                                </ButtonGroup>
                            </div>
                            <Omnibar
                                isOpen={isSearchOpen}
                                itemRenderer={this.renderItem}
                                onQueryChange={this.nameChange}
                                items={recipes}
                                itemListPredicate={this.itemMatcher}
                                onItemSelect={this.handleItemSelectSearch}
                                overlayProps={{ hasBackdrop: true}}
                                resetOnSelect={true}
                                onClose={this.handleSearchClose}
                                noResults={<MenuItem disabled={true} text="No results." />}
                            />
                            <Omnibar
                                isOpen={isSearchDeleteOpen}
                                itemRenderer={this.renderItem}
                                onQueryChange={this.nameChange}
                                items={recipes}
                                itemListPredicate={this.itemMatcher}
                                onItemSelect={this.handleItemDeleteSearch}
                                overlayProps={{ hasBackdrop: true}}
                                resetOnSelect={true}
                                onClose={this.handleDeleteClose}
                                noResults={<MenuItem disabled={true} text="No results." />}
                            />
                            {showUi.deleteRecipe &&
                            <Alert
                            style={{backgroundColor: "#6eadca", color: "#ffe39f", fontWeight: "bold"}}    
                            confirmButtonText="Delete"
                            intent={"danger"}
                            isOpen={alert_delete.isOpen}
                            loading={alert_delete.isLoading}
                            onConfirm={this.handleDeleteConfirm}
                            >
                            <p>
                                Are you sure you want to delete this recipe ?
                            </p>
                            </Alert>
                            }
                            <Drawer
                                title={<span style={{color: "#FFE39F", fontSize: "25px"}}>{drawerTitle}</span>}
                                size={"550px"}
                                canOutsideClickClose={true}
                                canEscapeKeyClose={true}
                                hasBackdrop={true}
                                isCloseButtonShown={true}
                                isOpen={isDrawerOpen}
                                onClose={this.closeDrawer}
                            >
                                <div className="w-100 h-100">
                                    {showUi.searchRecipe && 
                                        <div className="pa4 bp5-text-large">
                                        <div className="mt4 bp5-text-large">
                                            <H4>Description</H4>
                                            <p>{recipe_data.description}</p>
                                        </div>
                                        <div className="mt4 bp5-text-large">
                                            <H4>Ingredients</H4>
                                            <SearchRecipeUI recipeId={recipe_data.id} /> 
                                        </div>
                                        <div className="mt4 bp5-text-large">
                                            <H4>Instructions</H4>
                                            <ol>
                                            {recipe_data.instructions.split(",").map((instruction, index) => (
                                                <li style={{color:"#ffffffd6", textTransform: "capitalize"}} key={index}>{instruction.trim()}</li>
                                            ))}
                                            </ol>
                                        </div>
                                    </div>
                                    }
                                    {showUi.addRecipe && 
                                        <AddRecipeUI  updateToaster={this.updateToaster}
                                        updateTimeout={this.updateTimeout}/>
                                    }
                                </div>
                                
                            </Drawer>

                            </Card>
                        </div>
                    </div>
                    
                </div>
                </div>
                
                
               
                 </>
                )}  
            </div>
        );
    }
    
}
export default Recipes;