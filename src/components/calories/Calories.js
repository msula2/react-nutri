import React, { Component } from 'react';
import Select from "react-select";
import { Tooltip } from 'react-tooltip'
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import MealTable from './MealTable';
import {columns, food_groups, tracking_options, starches, starch_items} from './calories_data.js';
/**
 * 
 * The Calories component allows the user to track their
 * calories. The user has the ability to choose create a meal
 * and add ingredients to it. The calories of the meal are
 * calculated and disaplyed as a table.
 * 
 * @property {Object} state - The state of the component
 * @property {Object} state.track_method - Represents the tracking method for calories, defaulting to "Exchange Lists"
 * @property {string} state.meal_name - Represents the name of the meal, initially empty
 * @property {Array} state.meals - Represents the list of meals, initially empty
 * @property {Object} state.datetime - Represents the date and time, initialized to the current date and time
 * @property {Object} state.food_group - Represents the selected food group for ingredient selection, defaulting to "Starch/Bread"
 * @property {Object} state.ingredients_for - Represents the currently selected meal for adding ingredients, initially empty
 * @property {Object} state.category - Represents the selected category for ingredient selection, defaulting to "Cereals/Grains/Pasta"
 * @property {Array} state.categories - Represents the list of categories for the selected food group
 * @property {Object} state.ingredient - Represents the selected ingredient for adding to the meal, defaulting to "Bran cereals, concentrated"
 * @property {Array} state.ingredients - Represents the list of ingredients available for the selected category
 * @property {Array} state.data - Represents the data for meals, initially containing example meal data
 * @property {Object} state.errors - Represents error messages related to meal name and ingredient addition
 * @property {string} state.errors.meal_name - Error message for meal name, initially empty
 * @property {string} state.errors.ingredients - Error message for adding ingredients, indicating that a meal must be added first

 * 
 * 
 * @author Hamdan Sulaiman
 *
 * @example 
 * <Calories />
 *
 */
class Calories extends Component {

    /**
     * Initializes the state of the Calories component.
     *
     * @summary This method initializes the state of the Calories component with default values.
     * 
     * @constructor
     * @param {Object} props - The props passed to the Calories component.
     * @constructs Calories
     * @memberOf Calories
     * @method constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            track_method: {label: "Exchange Lists", value: "exchange"},
            meal_name: '',
            meals: [
            ],
            datetime: dayjs(),
            food_group: {label: "Starch/Bread", value: "starch"},
            ingredients_for: {},
            category: {label: "Cereals/Grains/Pasta", value: "cereals_grain_pasta_ss"},
            categories: starches,
            ingredient: { label: "Bran cereals, concentrated", value: "bran_cereals_conc" },
            ingredients: starch_items.cereals_grain_pasta_ss,
            data: [
                { id: 1, mealName: 'Breakfast', ingredients: ['Eggs', 'Toast', 'Orange Juice'], calories: 350 },
                { id: 2, mealName: 'Lunch', ingredients: ['Sandwich', 'Salad', 'Apple'], calories: 450 },
                { id: 3, mealName: 'Dinner', ingredients: ['Chicken', 'Rice', 'Broccoli'], calories: 550 }
            ],

            errors: {
                meal_name: '',
                ingredients: 'A meal must be added first.'
            }
        };
    }

    /**
     * Updates the tracking method for calories based on the onChange event.
     * 
     * @summary This method takes an onChange event and updates the tracking method for calories accordingly.
     *
     * @param {Object} selectedOption - The selected option representing the updated tracking method.
     * @param {string} selectedOption.label - The label of the selected option.
     * @param {string} selectedOption.value - The value of the selected option.
     */
    trackChange = (selectedOption) => {
        this.setState({ track_method: selectedOption });
    };

    /**
     * Updates the name of the meal based on the onChange event. The name is required and cannot be left empty
     * 
     * @summary This method takes an onChange event and updates the tracking method for calories accordingly.
     * 
     * @instance
     * @memberOf Calories
     * @method nameChange
     * 
     * @param {Event} event from input which serves as the name of the meal
     */
    nameChange = (event) => {
        const { value } = event.target;
        let errors = { ...this.state.errors };

        errors.meal_name = value.trim() === '' ? 'Meal name is required.' : '';

        this.setState({ meal_name: value, errors });
    }

    /**
     * Updates the date of the meal
     * 
     * @summary This method takes an onChange event and updates the date of the meal.
     *
     * @instance
     * @memberOf Calories
     * @method dateChange
     * 
     * @param {dateTime} Object from input which serves as the date
     * 
     */
    dateChange = (dateTime) => {
        this.setState({datetime: dateTime})
    }
    /**
     * Adds a meal to the list of meals for which calories can be calculated.
     * 
     * @summary This method takes no parameters. It adds a new meal to the list of meals with the provided meal name.
     * 
     * @instance
     * @memberOf Calories
     * @method dateChange 
    */
    addMeal = () => {
        const { meal_name, errors } = this.state;

        if (errors.meal_name) {
            return; 
        }

        let meals_ = this.state.meals;
        let new_meal = { label: meal_name, value: meal_name.toLowerCase() };
        meals_.push(new_meal);

        errors.ingredients = '';

        this.setState({ meals: meals_, meal_name: '', ingredients_for: new_meal, errors });
    }

    /**
     * Updates the selected meal for adding ingredients by setting the 'ingredients_for' state.
     *  
     * @summary This method takes an onChange event and updates the selected meal for adding ingredients.
     *
     * @instance
     * @memberOf Calories
     * @method mealChange
     *  
     * @param {Object} selectedOption - The selected option representing the meal.
     * @param {string} selectedOption.label - The label of the selected meal option.
     * @param {string} selectedOption.value - The value of the selected meal option.
     */
    mealChange = (selectedOption) => {
        const { meals, errors } = this.state;
        
        this.setState({ingredients_for: selectedOption});
    }

    /**
     * Updates the selected food group for ingredient selection and updates the corresponding categories.
     *
     * @summary This method takes an onChange event and updates the selected food group for ingredient selection.

     * @instance
     * @memberOf Calories
     * @method groupChange
     *
     * @param {Object} selectedOption - The selected option representing the food group.
     * @param {string} selectedOption.label - The label of the selected food group option.
     * @param {string} selectedOption.value - The value of the selected food group option.
     */
    groupChange = (selectedOption) => {
        let group = selectedOption.value;

        let categories = starches;

        if (group == "starch"){
            categories = starches
        }

        this.setState({ food_group: selectedOption, categories: categories, category: categories[0]});
    };

    /**
     * Udates the selected category for ingredient selection and updates the corresponding ingredients.
     *
     * @summary This method takes an onChange event and updates the selected category for ingredient selection.
     * 
     * @instance
     * @memberOf Calories
     * @method categoryChange
     *
     * @param {Object} selectedOption - The selected option representing the category.
     * @param {string} selectedOption.label - The label of the selected category option.
     * @param {string} selectedOption.value - The value of the selected category option.
     */
    categoryChange = (selectedOption) => {
        let category = selectedOption.value;
        let ingredients = starch_items.category;

        if (category.endsWith("_ss")){
            ingredients = starch_items[category];
        }
        this.setState({ category: selectedOption, ingredients: ingredients, ingredient: ingredients[0]});

    }
    
    /**
     * Updates the selected ingredient for adding to the meal.
     *
     * @summary This method takes an onChange event and updates the selected ingredient for adding to the meal.
     * 
     * @instance
     * @memberOf Calories
     * @method mealChange
     *
     * @param {Object} selectedOption - The selected option representing the ingredient.
     * @param {string} selectedOption.label - The label of the selected ingredient option.
     * @param {string} selectedOption.value - The value of the selected ingredient option.
     */
    ingredientChange = (selectedOption) => {
        this.setState({ ingredient: selectedOption});
    }

    /**
     * Adds a new ingredient to the meal data based on the selected meal, food group, and ingredient.
     *
     * @summary This method takes no parameters. It adds a new ingredient to the meal data based on the selected meal, food group, and ingredient.
     * This meal is then added to the table.
     * 
     * @instance
     * @memberOf Calories
     * @method mealChange
     */
    addIngredient = () => {
        const { ingredients_for, track_method, food_group, category, ingredient, data } = this.state;
        let newData = [];

        // Initialize calories
        let calories = 0;

        // Create a new ingredient object
        let new_ingredient = {
            id: data.length + 1,
            mealName: ingredients_for.label,
            ingredients: [ingredient.label],
            calories: 0
        };

        // Calculate calories based on the selected food group
        if (food_group.value === "starch") {
            new_ingredient.calories = 80;
        }

        // Check if the meal already exists in the data
        let meal_exists = data.filter((item) => item.mealName === ingredients_for.label);

        // If meal does not exist, create a new meal with the new ingredient
        if (meal_exists.length === 0) {
            let new_meal = new_ingredient;
            newData = [...data, new_meal];
        }

        // Update the state with the new meal data
        this.setState({ data: newData });
    }

    /**
     * Displays the components of the Calories Module
     *
     * @summary This method renders the components of the Calories Module.
     * 
     * @instance
     * @memberOf Calories
     * @method render
     * 
     * @returns {JSX.Element} The JSX elements representing the rendered components.
     * 
     */


    render() {
        const {meal_name, datetime, meals, track_method, ingredients_for, food_group, category, categories, ingredient, ingredients, data,  errors } = this.state;

        return (
            <div className="mt4">
                <div className="fl w-50">
                    <div className="detailed-card">
                        <h1 className="detailed-title">Ingredients</h1>
                        <div className="card-fields">
                            <div className="field-row">
                                <div className="field-label">
                                    <label>Meal Name</label>
                                </div>
                                <div className="field-value">
                                    <input
                                        className="field-input"
                                        type="text"
                                        value={meal_name}
                                        onChange={this.nameChange}
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
                                    <label>Time</label>
                                </div>
                                <div className="field-value">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        value={datetime}
                                        onChange={this.dateChange}
                                        className="w-80"
                                    />
                                </LocalizationProvider>                             
                                </div>
                            </div>
                            <div className="card-tools" style={{marginLeft: "auto"}}>
                                <button
                                    className="btn-submit mr0"
                                    onClick={this.addMeal}
                                    disabled={!!errors.meal_name}
                                >
                                <i className="fa-solid fa-plus"></i> Add
                                </button>
                            </div>
                            <div className="field-row">
                                <div className="field-label">
                                    <label>For Meal</label>
                                </div>
                                <div className="field-value">
                                    <Select
                                        value={ingredients_for}
                                        onChange={this.mealChange}
                                        options={meals}
                                        className="w-80"
                                    />
                                    {errors.ingredients && 
                                    <div className="err" >
                                        <a data-tooltip-id="ingredients_err" data-tooltip-content={errors.ingredients}>
                                            <i className="fa-solid fa-circle-exclamation error-icon"></i>
                                        </a>
                                        <Tooltip id="ingredients_err" />
                                    </div>
                                        
                                    }
                                </div>
                                

                            </div>
                            <div className="field-row">
                                <div className="field-label">
                                    <label>Method of tracking</label>
                                </div>
                                <div className="field-value">
                                    <Select
                                        value={track_method}
                                        onChange={this.trackChange}
                                        options={tracking_options}
                                        className="w-80"
                                    />
                                </div>
                            </div>
                            {this.state.track_method.value == 'exchange' ? 
                            <div className="w-100">
                                <div className="field-row">
                                    <div className="field-label">
                                        <label>Food Group</label>
                                    </div>
                                    <div className="field-value">
                                        <Select
                                            value={food_group}
                                            onChange={this.groupChange}
                                            options={food_groups}
                                            className="w-80"
                                        />
                                    </div>
                                </div>
                                <div className="field-row">
                                    <div className="field-label">
                                        <label>Category</label>
                                    </div>
                                    <div className="field-value">
                                        <Select
                                            value={category}
                                            onChange={this.categoryChange}
                                            options={categories}
                                            className="w-80"
                                        />
                                    </div>
                                </div>
                                <div className="field-row">
                                    <div className="field-label">
                                        <label>Ingredients</label>
                                    </div>
                                    <div className="field-value">
                                        <Select
                                            value={ingredient}
                                            onChange={this.ingredientChange}
                                            options={ingredients}
                                            className="w-80"
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            :
                            <div>To do</div>
                            }
                        </div>
                        <div className="card-tools">
                            <button 
                                disabled={!!errors.ingredients}
                                className="btn-submit" 
                                onClick={this.addIngredient}><i className="fa-solid fa-plus"></i> Add
                            </button>
                        </div>
                    </div>
                </div>
                <div className="fl w-50">
                    <div className="detailed-card">
                        <h1 className="detailed-title">Meal Information</h1>
                        <MealTable columns={columns} data={data} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Calories;
