import React, { Component } from 'react';
import Select from "react-select";
import { Tooltip } from 'react-tooltip'
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import MealTable from './MealTable';

const columns =  [
    { Header: 'ID', accessor: 'id', disableSortBy: true },
    { Header: 'Meal Name', accessor: 'mealName' },
    { Header: 'Ingredients', accessor: 'ingredients', Cell: row => row.value.join(', ') },
    { Header: 'Calories', accessor: 'calories', disableSortBy: true }
]

const tracking_options = [
    { label: "Exchange Lists", value: "exchange" },
    { label: "Brands", value: "brand" },
];

const food_groups = [
    {label: "Starch/Bread", value: "starch"},
    {label: "Meat", value: "meat"},
    {label: "Vegetable", value: "vegetable"},
    {label: "Fruit", value: "fruit"},
    {label: "Milk", value: "milk"},
    {label: "Fat", value: "fat"},

]

const starches = [
    {label: "Cereals/Grains/Pasta", value: "cereals_grain_pasta_ss"},
    {label: "Dried Beans/Peas/Lentils", value: "dried_beans_peas_lentils_ss"},
    {label: "Starchy Vegetables", value: "starchy_vegetables_ss"},
    {label: "Bread", value: "bread_ss"},
    {label: "Crackers/Snacks", value: "crackers_snacks_ss"},
    {label: "Starchy Foods Prepared with Fat", value: "starchy_foods_prepared_with_fat_ss"}
];

const starch_items = {
    cereals_grain_pasta_ss: [
        { label: "Bran cereals, concentrated", value: "bran_cereals_conc" },
        { label: "Bran cereals, flaked", value: "bran_cereals_flaked" },
        { label: "Bulgur (cooked)", value: "bulgur_cooked" },
        { label: "Cooked cereals", value: "cooked_cereals" },
        { label: "Cornmeal (dry)", value: "cornmeal_dry" },
        { label: "Grape Nuts", value: "grape_nuts" },
        { label: "Grits (cooked)", value: "grits_cooked" },
        { label: "Other ready-to-eat, unsweetened (plain) cereals", value: "ready_to_eat_cereals" },
        { label: "Pasta (cooked)", value: "pasta_cooked" },
        { label: "Puffed cereal", value: "puffed_cereal" },
        { label: "Rice, white or brown (cooked)", value: "rice_cooked" },
        { label: "Shredded wheat", value: "shredded_wheat" },
        { label: "Wheat germ", value: "wheat_germ" }
    ],
    dried_beans_peas_lentils_ss: [
        { label: "Beans and peas (cooked)", value: "beans_and_peas_cooked" },
        { label: "Lentils (cooked)", value: "lentils_cooked" },
        { label: "Baked beans", value: "baked_beans" }
    ],
    starchy_vegetables_ss: [
        { label: "Corn", value: "corn" },
        { label: "Corn on the cob", value: "corn_on_the_cob" },
        { label: "Lima beans", value: "lima_beans" },
        { label: "Peas, green (canned or frozen)", value: "green_peas" },
        { label: "Plantain", value: "plantain" },
        { label: "Potato, baked", value: "baked_potato" },
        { label: "Potato, mashed", value: "mashed_potato" },
        { label: "Squash, winter (acorn, butternut)", value: "winter_squash" },
        { label: "Yam, sweet potato", value: "sweet_potato" }
    ],
    bread_ss: [
        { label: "Bagel", value: "bagel" },
        { label: "Bread sticks, crisp", value: "crisp_bread_sticks" },
        { label: "Croutons low fat", value: "low_fat_croutons" },
        { label: "English muffin", value: "english_muffin" },
        { label: "Frankfurter or hamburger bun", value: "bun" },
        { label: "Pita", value: "pita" },
        { label: "Plain roll, small", value: "plain_roll" },
        { label: "Raisin, unfrosted", value: "raisin_bread" },
        { label: "Rye, pumpernickel", value: "rye_bread" },
        { label: "White, Wheat, Whole wheat", value: "whole_wheat_bread" }
    ],
    crackers_snacks_ss: [
        { label: "Animal crackers", value: "animal_crackers" },
        { label: "Graham crackers", value: "graham_crackers" },
        { label: "Matzoh", value: "matzoh" },
        { label: "Melba toast", value: "melba_toast" },
        { label: "Oyster crackers", value: "oyster_crackers" },
        { label: "Popcorn", value: "popcorn" },
        { label: "Pretzels", value: "pretzels" },
        { label: "Rye crisp", value: "rye_crisp" },
        { label: "Saltine-type crackers", value: "saltine_crackers" },
        { label: "Whole-wheat crackers, no fat added", value: "whole_wheat_crackers" },
        { label: "Whole-wheat crackers, fat added", value: "whole_wheat_crackers_fat" }
    ],
    starchy_foods_prepared_with_fat_ss: [
        { label: "Biscuit", value: "biscuit" },
        { label: "Chow mein noodles", value: "chow_mein_noodles" },
        { label: "Corn bread", value: "corn_bread" },
        { label: "Cracker, round butter type", value: "butter_cracker" },
        { label: "French-fried potatoes", value: "french_fried_potatoes" },
        { label: "Muffin", value: "muffin" },
        { label: "Pancake", value: "pancake" },
        { label: "Stuffing, bread (prepared)", value: "bread_stuffing" },
        { label: "Taco shell", value: "taco_shell" },
        { label: "Waffle", value: "waffle" }
    ]
};



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

    addIngredient = () => {

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
