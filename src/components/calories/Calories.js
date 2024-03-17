import React, { Component } from 'react';
import Select from "react-select";
import { Tooltip } from 'react-tooltip'


const tracking_options = [
    { label: "Exchange Lists", value: "exchange" },
    { label: "Brands", value: "brand" },
];

const food_groups = [
    {label: "Starch/Bread", value: "strach"},
    {label: "Meat", value: "meat"},
    {label: "Vegetable", value: "vegetable"},
    {label: "Fruit", value: "fruit"},
    {label: "Milk", value: "milk"},
    {label: "Fat", value: "fat"},

]

class Calories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            track_method: "exchange",
            meal_name: '',
            meals: [
            ],
            food_group: '',
            ingredients_for: '',
            errors: {
                meal_name: '',
                ingredients: 'A meal must be added first.'
            }
        };
    }

    trackChange = (selectedOption) => {
        this.setState({ track_method: selectedOption.value });
    };

    nameChange = (event) => {
        const { value } = event.target;
        let errors = { ...this.state.errors };

        errors.meal_name = value.trim() === '' ? 'Meal name is required.' : '';

        this.setState({ meal_name: value, errors });
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

    addIngredient = () => {

    }


    groupChange = (selectedOption) => {
        this.setState({ food_group: selectedOption.value });
    };

    render() {
        const { meal_name, meals, ingredients_for, errors } = this.state;

        return (
            <div className="mt4">
                <div className="fl w-60">
                    <div className="detailed-card">
                        <h1 className="detailed-title">Meal Information</h1>
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
                        </div>
                        <div className="card-tools">
                            <button
                                className="btn-submit"
                                onClick={this.addMeal}
                                disabled={!!errors.meal_name}
                            >
                            <i className="fa-solid fa-plus"></i> Add
                            </button>
                        </div>
                    </div>
                    <div className="detailed-card mt5">
                        <h1 className="detailed-title">Ingredients</h1>
                        <div className="card-fields">
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
                                        defaultValue={tracking_options[0]}
                                        onChange={this.trackChange}
                                        options={tracking_options}
                                        className="w-80"
                                    />
                                </div>
                            </div>
                            {this.state.track_method == 'exchange' ? 
                            <div className="field-row">
                                <div className="field-label">
                                    <label>Food Group</label>
                                </div>
                                <div className="field-value">
                                    <Select
                                        defaultValue={food_groups[0]}
                                        onChange={this.groupChange}
                                        options={food_groups}
                                        className="w-80"
                                    />
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
                <div className="fl w-40">

                </div>
            </div>
        );
    }
}

export default Calories;
