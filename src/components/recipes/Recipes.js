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

    updateToaster = (success, failed) => {
        if (success !== null) {
          this.setState({ToasterSuccess: {show: success.show, message: success.message}});
        }
        if (failed !== null) {
            this.setState({ToasterFailed: {show: failed.show, message: failed.message}});
        }
    };

    updateTimeout = (value) => {
        this.setState({timedOut: value});
    };

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

    titleChange = (event) => {
        const { value } = event.target;
        let errors = { ...this.state.errors };
        let dirty = {...this.state.dirty};

        dirty.title = true;

        errors.title = value.trim() === '' ? 'Recipe title is required.' : '';


        this.setState({ title: value, errors, dirty});
    }

    descriptionChange = (event) => {
        const { value } = event.target;
        this.setState({ description: value});
    }

    ingredientsChange = (event) => {
        const { value } = event.target;
        this.setState({ ingredients: value});
    }

    instructionsChange = (event) => {
        const { value } = event.target;
        this.setState({ instructions: value});
    }

    submitEditRecipe = () => {
        fetch(`${process.env.NODE_ENV==='development' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_DEPLOYED_URL}recipe`, {
            method: 'put',
            //query: 'title=Salad'
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                ingredients: this.state.ingredients,
                instructions: this.state.instructions
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === "success"){
                console.log("Recipe edited successfully")
            } else{
                console.log("Error occurred while editing recipe");
            }
        })
        .catch(error => {
            console.error('Error occurred while edditing recipe:', error);
        });
        this.setState({title: '', description: '', ingredients: '', instructions: ''})
    }
   


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


    openSearchBar = () => {
        this.setState({isSearchOpen: true});
    }

    handleSearchClose = () => {
        this.setState({isSearchOpen: false});
    }

    openDeleteBar = () => {
        this.setState({isSearchDeleteOpen: true});
    }

    handleDeleteClose = () => {
        this.setState({isSearchDeleteOpen: false});
    }

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
            <div className='vw-100 vh-100 d-flex flex-column justify-center items-center'>
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
                {loading && <Loader message={message}/>}
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