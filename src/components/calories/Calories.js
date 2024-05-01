import React, { Component } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import MealTable from './MealTable';
import {columns, food_groups, tracking_options, starches, starch_items} from './calories_data.js';
import { Card, H3, Button, FormGroup, InputGroup, Tooltip, Icon, MenuItem, NumericInput, Popover, ButtonGroup, OverlayToaster, Toast2, Alert} from "@blueprintjs/core";
import { Select, MultiSelect} from '@blueprintjs/select';
import { DateInput3} from "@blueprintjs/datetime2";
import { nutrients_desc } from '../../descriptions';
import nutrients_logo from "../../assets/imgs/nutrients.png";
import Title from '../title/Title';
import About from '../about/About';
import './Calories.css';
import BreakdownChart from './BreakdownChart.js';
import Loader from '../loader/Loader';
import "./blueprint-datetime.css";
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
 * @property {Object} state.datetime - Represents the date and time, initialized to the current date and time
 * @property {Object} state.food_group - Represents the selected food group for ingredient selection, defaulting to "Starch/Bread"
 * @property {Object} state.category - Represents the selected category for ingredient selection, defaulting to "Cereals/Grains/Pasta"
 * @property {Array} state.categories - Represents the list of categories for the selected food group
 * @property {Object} state.ingredient - Represents the selected ingredient for adding to the meal, defaulting to "Bran cereals, concentrated"
 * @property {Array} state.ingredients - Represents the list of ingredients available for the selected category
 * @property {Array} state.data - Represents the data for meals, initially containing example meal data
 * @property {Object} state.errors - Represents error messages related to meal name and ingredient addition
 * @property {string} state.errors.meal_name - Error message for meal name, initially empty

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
            track_method: {label: "Exchange Lists", value: "exchange"},
            meal_name: '',
            datetime: dayjs(),
            food_group: {label: "Starch/Bread", value: "starch"},
            category: {label: "Cereals/Grains/Pasta", value: "cereals_grain_pasta_ss"},
            categories: starches,
            ingredient: '',
            ingredients_chosen: [],
            ingredients: starch_items.cereals_grain_pasta_ss,
            serving_unit: '',
            serving_size: '',
            grams_breakdown: [],
            calories_breakdown: {},
            ToasterSuccess: {
                show: false,
                message: ''
            },
            ToasterFailed: {
                show: false,
                message: ''
            },
            userMeals: [],
            dirty: {
                meal_name: false,
                ingredients_chosen: false,
                datetime: false
            },
            errors: {
                meal_name: '',
                ingredients_chosen: '',
                duplicate_entry: '',
                datetime: ''
            }
            
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
            fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_DEPLOYED_URL}/calories/user/${data.user.id}/meals/breakdown`, {
                method: 'get',
                credentials: 'include'
              })
              .then(response => response.json())
              .then(data => {
                if (data.result === "success") {
                  this.setState({ userMeals: data.meals });
                  this.setState({ loading: false });
                }
              })
              .catch(error => {
                console.error('Error fetching data:', error);
                this.setState({ loading: false });
              });
          } else if (data.loggedIn === false){
            this.clearSession();
          } else {
            console.log(data.error);
          }
        });
      };

    componentDidMount() { 
        this.checkSession();
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
        let dirty = {...this.state.dirty};

        dirty.meal_name = true;

        errors.meal_name = value.trim() === '' ? 'Meal name is required.' : '';


        this.setState({ meal_name: value, errors, dirty});
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

        let errors = { ...this.state.errors };
        let dirty = {...this.state.dirty};

        dirty.datetime = true;

        errors.datetime = dateTime.trim() === '' ? 'Date and time are required.' : '';

        this.setState({datetime: dateTime, errors, dirty})
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

        let categories = [];
        let category = '';
        fetch(`${process.env.NODE_ENV==='development' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_DEPLOYED_URL}/calories/groups/${group}/categories/get`, {
            method: 'get',
            credentials: 'include'
        })
        .then(response => response.json())
        .then (data => {
            if (data.result == "success"){
                categories = data.categories;
                if (categories.length != 0){
                    category = categories[0];
                }
                this.setState({ food_group: selectedOption, categories: categories, category: category});
            }
        })
        

        
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
        let ingredients = [];
        

        fetch(`${process.env.NODE_ENV==='development' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_DEPLOYED_URL}/calories/categories/${category}/items/get`, {
            method: 'get',
            credentials: 'include'
        })
        .then(response => response.json())
        .then (data => {
            if (data.result == "success"){
                ingredients = data.items;
                this.setState({ category: selectedOption, ingredients: ingredients});
            }
        })



        

    }

    ingredientChange = (selectedOption) => {
        let ingredient = selectedOption.value;
        let ingredient_info = {};
        
        fetch(`${process.env.NODE_ENV==='development' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_DEPLOYED_URL}/calories/items/${ingredient}/get`, {
            method: 'get',
            credentials: 'include'
        })
        .then(response => response.json())
        .then (data => {
            if (data.result == "success"){
                ingredient_info = data.item;
                let pie_chart = ingredient_info.breakdown.grams;
                let table_chart = ingredient_info.breakdown.calories;
                
                let errors = {...this.state.errors}
                let ingredients_chosen = this.state.ingredients_chosen;
        
                if(ingredients_chosen.find((item) => item.value === ingredient)){
                    errors.duplicate_entry = 'This food item already exists'
                }
                else{
                    errors.duplicate_entry = ''
                }
                this.setState({ ingredient: selectedOption, serving_unit: ingredient_info.serving_unit, grams_breakdown: pie_chart, calories_breakdown: table_chart, errors});
                
            }
        })



        

    }

    /**
     * Adds a new ingredient to the meal data based on the selected meal, food group, and ingredient.
     *
     * @summary This method takes no parameters. It adds a new ingredient to the meal data based on the selected meal, food group, and ingredient.
     * This meal is then added to the table.
     * 
     * @instance
     * @memberOf Calories
     * @method addMeal
     */
    addMeal = () => {
        const {ingredients_chosen, meal_name, datetime, ToasterSuccess, ToasterFailed} = this.state;
        const { user } = this.state;

        fetch(`${process.env.NODE_ENV==='development' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_DEPLOYED_URL}/calories/user/${user.id}/meal/add`, {
            method: 'post',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: meal_name,
                datetime: datetime,
                meal_ingredients: ingredients_chosen
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.result == "success"){
                ToasterSuccess.show = true;
                ToasterSuccess.message = data.message;
                this.setState({ ToasterSuccess});
            }
            else{
                if(data.loggedIn == null){
                    ToasterFailed.show = true;
                    ToasterFailed.message = data.message;
                    this.setState({ ToasterFailed});
                }
                else{
                    
                    this.setState({timedOut: true});
                }
                
            }
        });
        
    }

    deleteMeal = (mealId) => {
        const { user } = this.state;
      
        fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_DEPLOYED_URL}/calories/user/${user.id}/meal/${mealId}/delete`, {
          method: 'DELETE',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
          if (data.result === "success") {
            const { ToasterSuccess } = this.state;
            ToasterSuccess.show = true;
            ToasterSuccess.message = data.message;
            this.setState({ ToasterSuccess });
          } else {
            const { ToasterFailed } = this.state;
            ToasterFailed.show = true;
            ToasterFailed.message = data.message;
            this.setState({ ToasterFailed });
          }
        })
        .catch(error => {
          console.error('Error deleting meal:', error);
          const { ToasterFailed } = this.state;
          ToasterFailed.show = true;
          ToasterFailed.message = 'Error deleting meal';
          this.setState({ ToasterFailed });
        });
      };
      

    servingChange = (event) => {
        const size = event;
        const ingredient = this.state.ingredient;
        let ingredient_info = {};   
        if (size != 0){
            fetch(`${process.env.NODE_ENV==='development' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_DEPLOYED_URL}/calories/items/${ingredient.value}/get`, {
            method: 'get',
            credentials: 'include'
            })
            .then(response => response.json())
            .then (data => {
                if (data.result == "success"){
                    ingredient_info = data.item;
                    let grams_breakdown = ingredient_info.breakdown.grams;
                    let calories_breakdown = ingredient_info.breakdown.calories;
                    grams_breakdown = grams_breakdown.map((item) => ({name: item.name, value: item.value * size}));
                    calories_breakdown = {
                        carbohydrates: calories_breakdown.carbohydrates * size,
                        proteins: calories_breakdown.proteins * size,
                        fats: calories_breakdown.fats * size,
                        total: calories_breakdown.total * size
                    };

                    this.setState({ serving_size: size, grams_breakdown, calories_breakdown});
                    
                }
            })
            
            
            
        }
        else{
            this.setState({serving_size: size})
        }
        
    }

    ingredientAdd = () => {
        const {ingredient, serving_size, ingredients_chosen, food_group} = this.state;
        let food_item = {
            label: ingredient.label,
            value: ingredient.value,
            serving_size: serving_size,
            foodgroup: food_group.value
        }
        let errors = {...this.state.errors}
        let dirty = {...this.state.dirty};

        dirty.ingredients_chosen = true;

        if(ingredients_chosen.find((item) => item.label === food_item.label) == undefined){
            let ingredients_chosen_updated = [...ingredients_chosen];
            ingredients_chosen_updated.push(food_item);
            errors.ingredients_chosen = ingredients_chosen_updated.length == 0 ? 'Atleast one ingredient needs to be part of meal.' : '';
            this.setState({ingredients_chosen: ingredients_chosen_updated, ingredient:'', serving_size: '', errors, dirty});
        }
        

        
    }

    ingredientRemove = (itemToRemove) => {
        const { ingredients_chosen } = this.state;
        
        const newIngredientsChosen = ingredients_chosen.filter(item => item.label !== itemToRemove);

        let errors = {...this.state.errors}
        let dirty = {...this.state.dirty};

        dirty.ingredients_chosen = true;

        
        errors.ingredients_chosen = newIngredientsChosen.length == 0 ? 'Atleast one ingredient needs to be part of meal.' : '';
    
        this.setState({ ingredients_chosen: newIngredientsChosen, ingredient: '', dirty, errors });
    };



    addEnabled = () => {
        let errors = {...this.state.errors};
        let dirty = {...this.state.dirty};
        let error_msgs = Object.values(errors).filter(item => item !== '');
        let all_dirty = Object.values(dirty).every(item => item == true);
        if (all_dirty && error_msgs.length == 0){
            return false;
        }
        else{
            return true;
        }
    }

    renderItem = (item, { handleClick, modifiers }) => {
        return (
            <MenuItem
                key={item.value}
                text={item.label}
                onClick={handleClick}
                active={modifiers.active}
            />
        );
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
            window.location.replace("/login");
        };
        setTimeout(close, 2000);
    };


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
        const {meal_name, meals, food_group, category, categories, ingredient, ingredients, ingredients_chosen,  errors, serving_unit, serving_size, grams_breakdown,calories_breakdown, userMeals, dateTime, ToasterSuccess, ToasterFailed, loading, message, alert, timedOut} = this.state;
        


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
                <Title text="Calories" color="#FFE39F" />
                
                <div className="flex justify-center">
                    <div className="mt5 w-80">
                        <Card interactive={true} elevation={4} className="card-content" style={{paddingTop: "0px", paddingBottom: "2rem"}}>
                            <div className="flex h-100 w-100">
                                <div className="w-40 mt3">
                                    <H3 style={{padding: "2rem"}}>Add Meal Information</H3>
                                    <div className="pa4 pb0">
                                        <FormGroup
                                        label="Meal Name"
                                        inline={true}
                                        className="white bp5-text-large"
                                        >
                                            <div className="flex items-center">
                                                <InputGroup 
                                                    onChange={this.nameChange}
                                                    placeholder=""
                                                    intent= {errors.meal_name === '' ? "success": "danger"}
                                                    large={true}
                                                    value={meal_name}
                                                    className="calories"
                                                    
                                                    
                                                />
                                                {errors.meal_name && 
                                                <Tooltip content={errors.meal_name} placement="right" >
                                                    <i className="fa-solid fa-circle-exclamation error-icon ml3"></i>
                                                </Tooltip>
                                                
                                                }
                                            </div>
                                        </FormGroup>

                                        <FormGroup
                                            label="Time"
                                            inline={true}
                                            className="white bp5-text-large"
                                        >
                                            <div className="flex items-center">
                                                <div className="w-100">
                                                    <DateInput3
                                                        locale={"en-US"}
                                                        onChange={this.dateChange}
                                                        popoverProps={{ placement: "right" }}
                                                        rightElement={
                                                            true && <Icon icon="globe" intent="primary" style={{ padding: "11px 7px" }} />
                                                        }
                                                        timePickerProps={true}
                                                        showTimePickerArrows={true}
                                                        useAmPm={true}
                                                        dateFnsFormat={"yyyy-MM-dd HH:mm:ss"}
                                                        timePickerProps={{ showArrowButtons:true, useAmPm: true}}
                                                        value={dateTime}
                                                        className={"bp5-intent-success bp5-large calories"}
                                                    />
                                                    
                                                </div>
                                                {errors.datetime && (
                                                    <Tooltip content={errors.datetime} placement="right" >
                                                        <i className="fa-solid fa-circle-exclamation error-icon ml3"></i>
                                                    </Tooltip>
                                                )}
                                            </div>
                                        </FormGroup>
                                        <FormGroup
                                        label="Food Group"
                                        inline={true}
                                        className="white bp5-text-large"
                                        >
                                            <div className="flex items-center">
                                            <Select
                                                activeItem={food_group}
                                                onItemSelect={this.groupChange}
                                                items={food_groups}
                                                itemRenderer={this.renderItem}
                                                filterable={false}
                                                popoverProps={{ minimal: false, placement: "right"}}
                                                className="w-70"
                                                
                                            >

                                                <Button
                                                    rightIcon={<Icon icon="caret-down" intent="success"/>}
                                                    text={food_group ? food_group.label : 'Select...'}
                                                    fill={true}
                                                    large={true}
                                                    round={true}
                                                    className="select-btn flex justify-space"

                                                />
                                            </Select>
                                            </div>
                                        </FormGroup>
                                        {categories.length != 0 &&
                                        <FormGroup
                                        label="Category"
                                        inline={true}
                                        className="white bp5-text-large"
                                        >
                                            <div className="flex items-center">
                                            <Select
                                                activeItem={category}
                                                onItemSelect={this.categoryChange}
                                                items={categories}
                                                itemRenderer={this.renderItem}
                                                filterable={false}
                                                popoverProps={{ minimal: false, placement: "right"}}
                                                className="w-70"
                                                
                                            >

                                                <Button
                                                    rightIcon={<Icon icon="caret-down" intent="success"/>}
                                                    text={category ? category.label : 'Select...'}
                                                    fill={true}
                                                    large={true}
                                                    round={true}
                                                    className="select-btn flex justify-space"

                                                />
                                            </Select>
                                            </div>
                                        </FormGroup>
                                        }
                                        
                                        <FormGroup
                                        label="Food Item"
                                        inline={true}
                                        className="white bp5-text-large"
                                        >
                                            <div className="flex items-center">
                                            <Select
                                                activeItem={ingredient}
                                                onItemSelect={this.ingredientChange}
                                                items={ingredients}
                                                itemRenderer={this.renderItem}
                                                filterable={false}
                                                popoverProps={{ minimal: false, placement: "right"}}
                                                className="w-70"
                                                
                                            >

                                                <Button
                                                    rightIcon={<Icon icon="caret-down" intent="success"/>}
                                                    text={ingredient ? ingredient.label : 'Select...'}
                                                    fill={true}
                                                    large={true}
                                                    round={true}
                                                    className="select-btn flex justify-space"

                                                />
                                            </Select>
                                            </div>
                                        </FormGroup>
                                        {ingredient != '' &&
                                        <React.Fragment>
                                        <FormGroup
                                        label="Serving Size"
                                        inline={true}
                                        className="white bp5-text-large"
                                        >
                                            <div className="flex items-center">
                                                <div className="w-40">
                                                    <NumericInput 
                                                    onValueChange={this.servingChange} 
                                                    large={true}
                                                    buttonPosition="none"
                                                    intent={"success"}
                                                    disabled={errors.duplicate_entry ? true: false}
                                                    />
                                                </div>
                                                <div className="w-60">
                                                    <div className="w-50">
                                                    <ButtonGroup large={true} className="flex justify-between items-center">
                                                        <div className="mr3">{serving_unit}</div>
                                                        <Popover
                                                        content={
                                                            <div>
                                                                 <div>
                                                                    <BreakdownChart data_pie={grams_breakdown} data_table={calories_breakdown} serving_size={serving_size} serving_unit={serving_unit} width={300} height={300}/>
                                                                 </div>
                                                                 
                                                            </div>
                                                            
                                                        }
                                                        interactionKind="click"
                                                        onInteraction={state => this.handleInteraction(state)} 
                                                        placement="right"
                                                        >
                                                        <Tooltip content={"Click to see caloric breakdown"} placement="right"><i className="fa-solid fa-chart-pie mr3"></i></Tooltip>
                                                        </Popover>
                                                        {errors.duplicate_entry === '' && serving_size != 0 &&
                                                        <Tooltip content={"Click to add to list of food items"} placement="right"><Icon icon="add" onClick={this.ingredientAdd}></Icon></Tooltip>
                                                        }
                                                        {errors.duplicate_entry &&
                                                        <Tooltip content={errors.duplicate_entry} placement="right" >
                                                                <i className="fa-solid fa-circle-exclamation error-icon ml3"></i>
                                                        </Tooltip> 
                                                        }
                                                        
                                                    </ButtonGroup>

                                                    </div>
                                                    
                                                </div>
                                                
                                                
                                            </div>
                                            
                                        </FormGroup>
                                        
                                        </React.Fragment>
                                        
                                        }
                                        <FormGroup
                                            label="Food Items"
                                            inline={true}
                                            className="white bp5-text-large"
                                        >
                                            <div className="flex items-center">
                                                <MultiSelect
                                                    items={ingredients_chosen}
                                                    itemRenderer={this.renderItem}
                                                    tagRenderer={item => item.label}
                                                    placeholder="List of food items"
                                                    popoverProps={{ minimal: true}}
                                                    selectedItems={ingredients_chosen}
                                                    tagInputProps={{
                                                        onRemove: this.ingredientRemove,
                                                    }}
                                                    className="w-70"
                                                />
                                                {errors.ingredients_chosen && 
                                                <Tooltip content={errors.ingredients_chosen} placement="right" >
                                                    <i className="fa-solid fa-circle-exclamation error-icon ml3"></i>
                                                </Tooltip>
                                                
                                                }
                                                
                                            </div>
                                        </FormGroup>
                                        <FormGroup
                                            label=""
                                            inline={true}
                                            className="white bp5-text-large"
                                        >
                                            <div className="flex items-center justify-end mr6">
                                                
                                            <Tooltip content="Click to add meal to the table" placement="right">
                                                <Button className={"submit-btn"} 
                                                rightIcon="plus" intent="success" 
                                                text="Add" large={true} 
                                                disabled={this.addEnabled()}
                                                onClick={this.addMeal}/>
                                            </Tooltip>
                                                
                                            </div>
                                        </FormGroup>
                                        
                                    </div>
                                    
                                </div>
                                <div className="w-60 mt3">
                                    <H3 style={{padding: "2rem", paddingLeft: "0px"}}>Meals Table</H3>
                                    <div className="pa3 pl0">
                                        <MealTable data={userMeals} deleteMeal={this.deleteMeal} />
                                    </div>
                                    
                                </div>

                            </div>
                        </Card>
                    </div>
                </div>
                </>
                )}
                
            </div>

            
        );
    }
}

export default Calories;
