// AddRecipeUI.js

import React from 'react';
import { FormGroup, InputGroup, Button, Tooltip, Icon, MenuItem, H4, Popover, NumericInput, ButtonGroup} from '@blueprintjs/core';
import BreakdownChart from '../calories/BreakdownChart.js';
import { Select, MultiSelect} from '@blueprintjs/select';
import {food_groups, starches, starch_items} from '../calories/calories_data';

class AddRecipeUI extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            ingredients: '',
            instructions: '',
            food_group: {label: "Starch/Bread", value: "starch"},
            category: {label: "Cereals/Grains/Pasta", value: "cereals_grain_pasta_ss"},
            categories: starches,
            ingredient: '',
            ingredients: starch_items.cereals_grain_pasta_ss,
            ingredients_chosen: [],
            serving_unit: '',
            serving_size: '',
            grams_breakdown: [],
            calories_breakdown: {},
            steps: [],
            stepId: 0,
            errors :{
                title: '',
                description: '',
                ingredients: '',
                instructions: '',
                ingredients_chosen: '',
                duplicate_entry: '',
            },
            dirty :{
                title: false,
                description: false,
                ingredients_chosen: false,
                // instructions: false
            }

        }
    }

    submitNewRecipe = () => {
        const {title, description, ingredients_chosen, steps} = this.state;

        fetch(`${process.env.NODE_ENV==='development' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_DEPLOYED_URL}/recipe/add`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                title: title,
                description: description,
                ingredients: ingredients_chosen,
                instructions: steps
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.result == "success"){
                this.props.updateToaster({ show: true, message: data.message }, null);
            }
            else{
                if(data.loggedIn == null){
                    this.props.updateToaster(null, { show: true, message: data.message });
                }
                else{
                    this.props.updateTimeout(true);
                }
                
            }
        })
        .catch(error => {
            console.error('Error occurred while adding recipe:', error);
        });
        // this.setState({title: '', description: '', ingredients: '', instructions: ''})
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
        let errors = { ...this.state.errors };
        let dirty = {...this.state.dirty};

        dirty.description = true;

        errors.description = value.trim() === '' ? 'Recipe description is required.' : '';


        this.setState({ description: value, errors, dirty});
    }

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
                    errors.duplicate_entry = 'This ingredient is already present in the recipe'
                }
                else{
                    errors.duplicate_entry = ''
                }
                this.setState({ ingredient: selectedOption, serving_unit: ingredient_info.serving_unit, grams_breakdown: pie_chart, calories_breakdown: table_chart, errors});
                
            }
        })



        

    }


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
            amount: serving_size,
            foodgroup: food_group.value
        }
        let errors = {...this.state.errors}
        let dirty = {...this.state.dirty};

        dirty.ingredients_chosen = true;

        if(ingredients_chosen.find((item) => item.label === food_item.label) == undefined){
            let ingredients_chosen_updated = [...ingredients_chosen];
            ingredients_chosen_updated.push(food_item);
            errors.ingredients_chosen = ingredients_chosen_updated.length == 0 ? 'Atleast one ingredient needs to be part of the recipe.' : '';
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

    instructionsChange = (event) => {
        const { value } = event.target;
        let errors = { ...this.state.errors };
        let dirty = {...this.state.dirty};

        dirty.instructions = true;

        errors.instructions = value.trim() === '' ? 'Recipe instructions are required.' : '';


        this.setState({ instructions: value, errors, dirty});
    }

    addStep = () => {
        this.setState(prevState => ({
          steps: [...prevState.steps, { id: prevState.stepId, value: '' }],
          stepId: prevState.stepId + 1 // Increment stepId for uniqueness
        }));
      };
    
      removeStep = (id) => {
        this.setState(prevState => ({
          steps: prevState.steps.filter(step => step.id !== id)
        }));
      };
    
      handleInputChange = (id, event) => {
        const { value } = event.target;
        this.setState(prevState => ({
          steps: prevState.steps.map(step => (step.id === id ? { ...step, value } : step))
        }));
      };


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

    render() {
        const {title, description, id, instructions, food_group,category, categories, ingredient, ingredients, grams_breakdown, calories_breakdown, serving_unit, serving_size, ingredients_chosen, steps, errors} = this.state;
        return (
            <div className="pa5 pr4 pl4 bp5-text-large">
                
                <div className="mb4">
                    <H4>Recipe Information</H4>
                </div>
                <FormGroup
                    label="Title"
                    inline={true}
                    className="white bp5-text-large"
                >
                    <div className="flex items-center">
                        <InputGroup 
                            onChange={this.titleChange}
                            placeholder=""
                            intent={errors.title === '' ? "success" : "danger"}
                            large={true}
                            value={title}
                        />
                        {errors.title && 
                            <Tooltip content={errors.title} placement="right" >
                                <i className="fa-solid fa-circle-exclamation error-icon ml3"></i>
                            </Tooltip>
                                            
                        }
                    </div>
                </FormGroup>
                <FormGroup
                    label="Description"
                    inline={true}
                    className="white bp5-text-large"
                >
                    <div className="flex items-center">
                        <InputGroup 
                            onChange={this.descriptionChange}
                            placeholder=""
                            intent={errors.description === '' ? "success" : "danger"}
                            large={true}
                            value={description}
                        />
                        {errors.description && 
                            <Tooltip content={errors.description} placement="right" >
                                <i className="fa-solid fa-circle-exclamation error-icon ml3"></i>
                            </Tooltip>
                                            
                        }
                    </div>
                </FormGroup>
                <div className="mb4">
                    <H4>Ingredients Information</H4>
                </div>
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
                label="Ingredient"
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
                label="Amount"
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
                                        <BreakdownChart data_pie={grams_breakdown} data_table={calories_breakdown} serving_unit={serving_unit} width={300} height={300}/>
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
                                <Tooltip content={"Click to add to list of ingredients"} placement="right"><Icon icon="add" onClick={this.ingredientAdd}></Icon></Tooltip>
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
                    label="Ingredient in Recipe"
                    inline={true}
                    className="white bp5-text-large"
                >
                    <div className="flex items-center">
                        <MultiSelect
                            items={ingredients_chosen}
                            itemRenderer={this.renderItem}
                            tagRenderer={item => item.label}
                            placeholder="List of ingredients in recipe"
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
                <FormGroup label="Instructions" inline={true} className="white bp5-text-large">
                <div className="flex items-center pa1">
                    <Tooltip content="Click to add step to the instructions" className="mr2" placement="right">
                    <Icon icon="add" onClick={this.addStep} />
                    </Tooltip>
                </div>
                </FormGroup>
                {steps.map((step, index) => (
                <FormGroup key={step.id} label={`Step ${index + 1}`} inline={true} className="white bp5-text-large">
                <div style={{ display: 'flex', alignItems: 'center', width: '90%' }}>
                  <InputGroup
                    placeholder={`Step ${index + 1}`}
                    value={step.value}
                    large={true}
                    onChange={(event) => this.handleInputChange(step.id, event)}
                  />
                  <div style={{ marginLeft: '8px' }}>
                    <Tooltip content="Click to remove step from the instructions" placement="right">
                      <Icon icon="remove" onClick={() => this.removeStep(step.id)} />
                    </Tooltip>
                  </div>
                </div>
              </FormGroup>
              
                ))}

                <FormGroup
                    label=""
                    inline={true}
                    className="white bp5-text-large"
                >
                    <div className="flex items-center justify-end">
                        
                    <Tooltip content="Click to submit recipe" placement="right">
                        <Button className={"submit-btn"} 
                        rightIcon="plus" intent="success" 
                        text="Submit" large={true} 
                        disabled={this.addEnabled()}
                        onClick={this.submitNewRecipe}/>
                    </Tooltip>
                        
                    </div>
                </FormGroup>
            </div>
        );
    }
}

export default AddRecipeUI;
