import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip'
import Title from '../title/Title';
import About from '../about/About';
import recipes_logo from "../../assets/imgs/recipes.png"
import Popup from 'reactjs-popup';

import 'reactjs-popup/dist/index.css';
import "./Recipes.css";



class Recipes extends Component{

    constructor(props) {
        super(props);
        this.state = {
            recipe_title: '',
            recipe_data: {
                title: '',
                description: '',
                ingredients: '',
                instructions: ''
            },
            //new_recipe_data: {
                title: '',
                description: '',
                ingredients: '',
                instructions: '',
            //},
            errors: {
                recipe_title: '',
                ingredients: 'A meal must be added first.'
            }
        };
    }

    titleChange = (event) => {
        const { value } = event.target;
        this.setState({ title: value});
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

    submitNewRecipe = () => {
        fetch(`${process.env.NODE_ENV==='development' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_DEPLOYED_URL}recipe`, {
            method: 'post',
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
                console.log("Recipe added successfully")
            } else{
                console.log("Error occurred while adding recipe");
            }
        })
        .catch(error => {
            console.error('Error occurred while adding recipe:', error);
        });
        this.setState({title: '', description: '', ingredients: '', instructions: ''})
    }

    submitDeleteRecipe = () => {
        fetch(`${process.env.NODE_ENV==='development' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_DEPLOYED_URL}recipe`, {
            method: 'delete',
            //query: 'title=Salad'
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                title: this.state.title
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === "success"){
                console.log("Recipe deleted successfully")
            } else{
                console.log("Error occurred while deleting recipe");
            }
        })
        .catch(error => {
            console.error('Error occurred while deleting recipe:', error);
        });
        this.setState({title: '', description: '', ingredients: '', instructions: ''})
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
        const { value } = event.target;
        let errors = { ...this.state.errors };

        errors.recipe_title = value.trim() === '' ? 'Recipe title is required.' : '';

        if(value.trim() !== ''){
            fetch(`${process.env.NODE_ENV==='development' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_DEPLOYED_URL}recipe?title=${value}`, {
                method: 'get',
                //query: 'title=Salad'
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
                // body: JSON.stringify({
                //     title: value
                // })
            })
            .then(response => response.json())
            .then(data => {
                if (data.result === "success"){
                    this.setState({recipe_data: data.data});
                    console.log(this.state.recipe_data)
                } else{
                    this.setState({recipe_data: {
                        title: '',
                        description: '',
                        ingredients: '',
                        instructions: ''
                    }});
                }
            })
            .catch(error => {
                console.error('Error fetching recipe:', error);
            });
        }

        this.setState({ recipe_title: value, errors });
    }

    render(){
        const {title, description, ingredients, instructions, recipe_data, recipe_title, errors } = this.state;
        
        const AddRecipePopup = () => (
            <Popup trigger={<button className="button"> Add Recipe </button>} modal nested>
                {close => (
                    <div className="modal">
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                        <div className="header"> Add Recipe </div>
                        <div className="content">
                            <div className="field-row">
                                <div className="field-label">
                                    <label>Recipe Title</label>
                                </div>
                                <div className="field-value">
                                    <input
                                        className="field-input"
                                        type="text"
                                        value={title}
                                        onChange={this.titleChange}
                                    />
                                    {errors.meal_name && 
                                        <div className="err" >
                                            <a data-tooltip-id="meal_name_err" data-tooltip-content={errors.meal_name}>
                                                <i className="fa-solid fa-circle-exclamation error-icon"></i>
                                            </a>
                                            <Tooltip id="meal_name_err" />
                                        </div>
                                        
                                    }
                                    
                                </div>
                            </div>
                            
                            <div className="field-row">
                                <div className="field-label">
                                    <label>Description</label>
                                </div>
                                <div className="field-value">
                                    <input
                                        className="field-input"
                                        type="text"
                                        value={description}
                                        onChange={this.descriptionChange}
                                    />
                                    {errors.meal_name && 
                                        <div className="err" >
                                            <a data-tooltip-id="meal_name_err" data-tooltip-content={errors.meal_name}>
                                                <i className="fa-solid fa-circle-exclamation error-icon"></i>
                                            </a>
                                            <Tooltip id="meal_name_err" />
                                        </div>
                                        
                                    }
                                    
                                </div>
                            </div>
                            
                            <div className="field-row">
                                <div className="field-label">
                                    <label>Ingredients</label>
                                </div>
                                <div className="field-value">
                                    <input
                                        className="field-input"
                                        type="text"
                                        value={ingredients}
                                        onChange={this.ingredientsChange}
                                    />
                                    {errors.meal_name && 
                                        <div className="err" >
                                            <a data-tooltip-id="meal_name_err" data-tooltip-content={errors.meal_name}>
                                                <i className="fa-solid fa-circle-exclamation error-icon"></i>
                                            </a>
                                            <Tooltip id="meal_name_err" />
                                        </div>
                                        
                                    }
                                    
                                </div>
                            </div>

                            <div className="field-row">
                                <div className="field-label">
                                    <label>Instructions</label>
                                </div>
                                <div className="field-value">
                                    <input
                                        className="field-input"
                                        type="text"
                                        value={instructions}
                                        onChange={this.instructionsChange}
                                    />
                                    {errors.meal_name && 
                                        <div className="err" >
                                            <a data-tooltip-id="meal_name_err" data-tooltip-content={errors.meal_name}>
                                                <i className="fa-solid fa-circle-exclamation error-icon"></i>
                                            </a>
                                            <Tooltip id="meal_name_err" />
                                        </div>
                                        
                                    }
                                    
                                </div>
                            </div>
                        </div>
                        <div className="actions">
                            <button
                                className="button"
                                onClick={() => {
                                    console.log('modal closed ');
                                    this.submitNewRecipe();
                                    close();
                                }}
                            >
                                Submit
                            </button>
                            <button
                                className="button"
                                onClick={() => {
                                    console.log('modal closed ');
                                    close();
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </Popup>
        );

        const DeleteRecipePopup = () => (
            <Popup trigger={<button className="button"> Delete Recipe </button>} modal nested>
                {close => (
                    <div className="modal">
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                        <div className="header"> Delete Recipe </div>
                        <div className="content">
                            <div className="field-row">
                                <div className="field-label">
                                    <label>Recipe Title</label>
                                </div>
                                <div className="field-value">
                                    <input
                                        className="field-input"
                                        type="text"
                                        value={title}
                                        onChange={this.titleChange}
                                    />
                                    {errors.meal_name && 
                                        <div className="err" >
                                            <a data-tooltip-id="meal_name_err" data-tooltip-content={errors.meal_name}>
                                                <i className="fa-solid fa-circle-exclamation error-icon"></i>
                                            </a>
                                            <Tooltip id="meal_name_err" />
                                        </div>
                                        
                                    }
                                    
                                </div>
                            </div>
                            
                        </div>
                        <div className="actions">
                            <button
                                className="button"
                                onClick={() => {
                                    console.log('modal closed ');
                                    this.submitDeleteRecipe();
                                    close();
                                }}
                            >
                                Submit
                            </button>
                            <button
                                className="button"
                                onClick={() => {
                                    console.log('modal closed ');
                                    close();
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </Popup>
        );

        const EditRecipePopup = () => (
            <Popup trigger={<button className="button"> Edit Recipe </button>} modal nested>
                {close => (
                    <div className="modal">
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                        <div className="header"> Edit Recipe </div>
                        <div className="content">
                            <div className="field-row">
                                <div className="field-label">
                                    <label>Recipe Title</label>
                                </div>
                                <div className="field-value">
                                    <input
                                        className="field-input"
                                        type="text"
                                        value={title}
                                        onChange={this.titleChange}
                                    />
                                    {errors.meal_name && 
                                        <div className="err" >
                                            <a data-tooltip-id="meal_name_err" data-tooltip-content={errors.meal_name}>
                                                <i className="fa-solid fa-circle-exclamation error-icon"></i>
                                            </a>
                                            <Tooltip id="meal_name_err" />
                                        </div>
                                        
                                    }
                                    
                                </div>
                            </div>
                            
                            <div className="field-row">
                                <div className="field-label">
                                    <label>Description</label>
                                </div>
                                <div className="field-value">
                                    <input
                                        className="field-input"
                                        type="text"
                                        value={description}
                                        onChange={this.descriptionChange}
                                    />
                                    {errors.meal_name && 
                                        <div className="err" >
                                            <a data-tooltip-id="meal_name_err" data-tooltip-content={errors.meal_name}>
                                                <i className="fa-solid fa-circle-exclamation error-icon"></i>
                                            </a>
                                            <Tooltip id="meal_name_err" />
                                        </div>
                                        
                                    }
                                    
                                </div>
                            </div>
                            
                            <div className="field-row">
                                <div className="field-label">
                                    <label>Ingredients</label>
                                </div>
                                <div className="field-value">
                                    <input
                                        className="field-input"
                                        type="text"
                                        value={ingredients}
                                        onChange={this.ingredientsChange}
                                    />
                                    {errors.meal_name && 
                                        <div className="err" >
                                            <a data-tooltip-id="meal_name_err" data-tooltip-content={errors.meal_name}>
                                                <i className="fa-solid fa-circle-exclamation error-icon"></i>
                                            </a>
                                            <Tooltip id="meal_name_err" />
                                        </div>
                                        
                                    }
                                    
                                </div>
                            </div>

                            <div className="field-row">
                                <div className="field-label">
                                    <label>Instructions</label>
                                </div>
                                <div className="field-value">
                                    <input
                                        className="field-input"
                                        type="text"
                                        value={instructions}
                                        onChange={this.instructionsChange}
                                    />
                                    {errors.meal_name && 
                                        <div className="err" >
                                            <a data-tooltip-id="meal_name_err" data-tooltip-content={errors.meal_name}>
                                                <i className="fa-solid fa-circle-exclamation error-icon"></i>
                                            </a>
                                            <Tooltip id="meal_name_err" />
                                        </div>
                                        
                                    }
                                    
                                </div>
                            </div>
                        </div>
                        <div className="actions">
                            <button
                                className="button"
                                onClick={() => {
                                    console.log('modal closed ');
                                    this.submitEditRecipe();
                                    close();
                                }}
                            >
                                Submit
                            </button>
                            <button
                                className="button"
                                onClick={() => {
                                    console.log('modal closed ');
                                    close();
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </Popup>
        );

        return (   
           <div>
                <Title text={`Recipes`} />
                <div className="card-fields">
                    <div className="field-row">
                        <div className="field-label">
                            <label>Search for a recipe</label>
                        </div>
                        <div className="field-value">
                            <input
                                className="field-input"
                                type="text"
                                value={recipe_title}
                                onChange={this.nameChange}
                                />
                            {errors.recipe_title && 
                                <div className="err" >
                                    <a data-tooltip-id="recipe_title_err" data-tooltip-content={errors.recipe_title}>
                                        <i className="fa-solid fa-circle-exclamation error-icon"></i>
                                    </a>
                                    <Tooltip id="recipe_title_err" />
                                </div>
                            }
                        </div>
                        <AddRecipePopup />
                        <EditRecipePopup />
                        <DeleteRecipePopup />
                        <About image={recipes_logo} />
                    </div>
                </div>

                
                <div className="mw9 ph3-ns mt4">
                    <div className="cf ph2-ns">
                        <div className="fl w-70 pa2 mt2">
                            {/*<Link to="/nutrients/carbohydrates" style={{textDecoration: "none"}}>*/}
                                <div className="card bg-light-yellow">
                                    <div className="flex">
                                        <div className="w-80 pa3">
                                            <p className="black">
                                                <br /> {recipe_data.description === "" ? recipe_title === "" ? "" : `No Recipe Found for ${recipe_title}` : "Description: "} <br />
                                                {recipe_data.description}
                                                <br />
                                                <br /> {recipe_data.ingredients === "" ? "" : "Ingredients: "} <br />
                                                {recipe_data.ingredients}
                                                <br />
                                                <br /> {recipe_data.instructions === "" ? "" : "Instructions: "} <br />
                                                {recipe_data.instructions}
                                                <br />
                                            </p>
                                        </div>
                                        <div className="title black">{recipe_data.title}</div>
                                    </div>
                                </div>
                            {/*</Link>    */}
                        </div>
                    </div>                    
                </div>
           </div>
           
        );
    }
    
}
export default Recipes;