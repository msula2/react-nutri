import React, { Component } from 'react';
import Select from "react-select";
import { Tooltip } from 'react-tooltip'
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import MealTable from './MealTable';
import {columns, food_groups, tracking_options, starches, starch_items} from './calories_data.js';

class Calories extends Component {

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

    trackChange = (selectedOption) => {
        this.setState({ track_method: selectedOption });
    };

    nameChange = (event) => {
        const { value } = event.target;
        let errors = { ...this.state.errors };

        errors.meal_name = value.trim() === '' ? 'Meal name is required.' : '';

        this.setState({ meal_name: value, errors });
    }

    dateChange = (dateTime) => {
        this.setState({datetime: dateTime})
    }

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

    mealChange = (selectedOption) => {
        const { meals, errors } = this.state;
        
        this.setState({ingredients_for: selectedOption});
    }


    groupChange = (selectedOption) => {
        let group = selectedOption.value;

        let categories = starches;

        if (group == "starch"){
            categories = starches
        }

        this.setState({ food_group: selectedOption, categories: categories, category: categories[0]});
    };

    categoryChange = (selectedOption) => {
        let category = selectedOption.value;
        let ingredients = starch_items.category;

        if (category.endsWith("_ss")){
            ingredients = starch_items[category];
        }
        this.setState({ category: selectedOption, ingredients: ingredients, ingredient: ingredients[0]});

    }


    ingredientChange = (selectedOption) => {
        this.setState({ ingredient: selectedOption});
    }


    addIngredient = () => {
        const {ingredients_for, track_method, food_group, category, ingredient, data} = this.state
        let newData = []

        let calories = 0;
        let new_ingredient = {id: data.length + 1, mealName: ingredients_for.label, ingredients: [ingredient.label], calories: 0};
        if (food_group.value === "starch"){
            new_ingredient.calories = 80;
        }
        
        let meal_exists = data.filter((item) => item.mealName === ingredients_for.label);

        if (meal_exists.length == 0){
            let new_meal = new_ingredient;
            newData = [...data, new_meal];
        }

        this.setState({data: newData});

    }

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
