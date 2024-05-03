import React, { Component } from 'react';
import Title from '../title/Title';
import About from '../about/About';
import { Button, Icon, MenuItem, ProgressBar, ButtonGroup, Radio, RadioGroup, Card, FormGroup, NumericInput, Tooltip, Toast2, OverlayToaster} from "@blueprintjs/core";
import { Select} from '@blueprintjs/select';
import Loader from '../loader/Loader';
import { diet_desc } from '../../descriptions';

/**
 * 
 * The Diet component prompts the user for personal details such as their age, gender
 * wieght, height and based on their response their tdee and bmr is calculated
 * 
 * 
 * @property {Object} state - The state of the component
 * @property {boolean} state.loading - Flag to indicate if the component is in loading state
 * @property {Object} state.user - Represents the user logged into the session
 * @property {string} state.user.id - User ID extracted from URL parameters
 * @property {number} state.user.weight - User weight
 * @property {Object} state.user.weight_unit - Represents the unit of user's weight
 * @property {string} state.user.weight_unit.label - Label for the weight unit
 * @property {string} state.user.weight_unit.value - Value for the weight unit
 * @property {Object} state.user.height - Represents the user's height
 * @property {number} state.user.height.feet - User's height in feet
 * @property {number} state.user.height.inches - User's height in inches
 * @property {number} state.user.age - User age
 * @property {Object} state.user.activity_level - Represents the user's activity level
 * @property {string} state.user.activity_level.label - Label for the activity level
 * @property {number} state.user.activity_level.value - Value for the activity level
 * @property {string} state.user.activity_level.info - Information about the activity level
 * @property {Object} state.user.goal - Represents the user's weight goal
 * @property {string} state.user.goal.label - Label for the weight goal
 * @property {string} state.user.goal.value - Value for the weight goal
 * @property {string} state.user.gender - User gender
 * @property {Object[]} state.weight_units - Available weight units
 * @property {string} state.weight_units[].label - Label for the weight unit
 * @property {string} state.weight_units[].value - Value for the weight unit
 * @property {Object[]} state.activity_levels - Available activity levels
 * @property {string} state.activity_levels[].label - Label for the activity level
 * @property {number} state.activity_levels[].value - Value for the activity level
 * @property {string} state.activity_levels[].info - Information about the activity level
 * @property {Object} state.activity_levels[].icon - Icon for visualization
 * @property {string} state.activity_levels[].icon.type - Type of the icon
 * @property {string} state.activity_levels[].icon.symbol - Symbol of the icon
 * @property {Object[]} state.goals - Available weight goals
 * @property {string} state.goals[].label - Label for the weight goal
 * @property {string} state.goals[].value - Value for the weight goal
 * @property {number} state.tdee - Total Daily Energy Expenditure (TDEE)
 * @property {number} state.progress - Progress value
 * @property {boolean} state.showProgress - Flag to indicate if progress should be shown
 * @property {Object} state.ToasterSuccess - Success toaster notification
 * @property {boolean} state.ToasterSuccess.show - Flag to indicate if toaster should be shown
 * @property {string} state.ToasterSuccess.message - Success message
 * @property {Object} state.ToasterFailed - Failure toaster notification
 * @property {boolean} state.ToasterFailed.show - Flag to indicate if toaster should be shown
 * @property {string} state.ToasterFailed.message - Failure message
 * @property {Object} state.dirty - Dirty state for form fields
 * @property {boolean} state.dirty.weight - Flag to indicate if weight field is dirty
 * @property {boolean} state.dirty.height - Flag to indicate if height field is dirty
 * @property {boolean} state.dirty.age - Flag to indicate if age field is dirty
 * @property {Object} state.errors - Validation errors for form fields
 * @property {string} state.errors.weight - Error message for weight field
 * @property {string} state.errors.age - Error message for age field
 * @property {string} state.errors.height - Error message for height field
 *
 * 
 * 
 * @author Hamdan Sulaiman
 *
 * @example 
 * <Diet />
 *
 */

class Diet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user: {
                id: new URLSearchParams(window.location.hash.split('?')[1]).get('id'),
                weight: 0,
                weight_unit: { label: 'lb', value: 'lb' },
                height: {
                    feet: 0,
                    inches: 0
                },
                age: 0,
                activity_level: { label: "Sedentary", value: 1.2, info: "Little or no exercise, desk job" },
                goal: { label: "Loose Weight", value: "loose" },
                gender: "male"
            },
            weight_units: [{ label: 'kg', value: 'kg' }, { label: 'lb', value: 'lb' }],
            activity_levels: [
                { label: "Sedentary", value: 1.2, info: "Little or no exercise, desk job", icon: {type: "blueprint", symbol: "briefcase" }},
                { label: "Lightly Active", value: 1.375, info: "Light exercise/sports 1-3 days/week", icon: {type: "blueprint", symbol: "walk" }},
                { label: "Moderately Active", value: 1.55, info: "Moderate exercise/sports 6-7 days/week", icon: {type: "fontawesome", symbol: "fa-person-running" }},
                { label: "Very Active", value: 1.725, info: "Hard exercise every day, or exercising 2 times/day", icon: {type: "fontawesome", symbol: "fa-dumbbell"}},
                { label: "Extra Active", value: 1.9, info: "Hard exercise 2 or more times per day, or training for marathon or triathlon", icon: {type: "blueprint", symbol: "cycle" }},
            ],
            goals: [
                { label: "Loose Weight", value: "loose" },
                { label: "Gain Weight", value: "gain" }
            ],
            tdee: null,
            progress: 0,
            showProgress: false,
            ToasterSuccess: {
                show: false,
                message: ''
            },
            ToasterFailed: {
                show: false,
                message: ''
            },
            dirty: {
                weight: false,
                height: false,
                age: false
            },
            errors: {
                weight: '',
                age: '',
                height: ''
            }
        };
    }

     /**
     * On mounting the componenet, it sets the loading flag to false after 3s
     * @summary This method controls the loading screen
     * 
     * @instance
     * @memberOf Diet
     * @method componentDidMount
     */

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loading: false });
        }, 3000);
    }

    /**
     * Updates the weight of the user
     * 
     * @summary This method takes an onChange event and updates the weight of the user accordingly.
     * 
     * @instance
     * @memberOf Diet
     * @method weightChange
     *
     * @param {Event} event from input which serves as the weight of the user
     */


    weightChange = (event) => {
        const value = event;
        let errors = { ...this.state.errors };
        let dirty = {...this.state.dirty};
        let user = this.state.user;

        dirty.weight = true;

        errors.weight = value == 0 ? 'Weight is required.' : '';
        
        user.weight = value;
        
        this.setState({ user, errors, dirty});
    }

    /**
     * Updates the units of the user's weight
     * 
     * @summary This method takes an onChange event and updates the unit of the weight.
     * 
     * @instance
     * @memberOf Diet
     * @method unitChange
     *
     * @param {Event} event from input which serves as the weight of the user
     */

    unitChange = (unit) => {
        const value = unit;
        let user = this.state.user;
        user.weight_unit = value;
        this.setState({ user });
    }


    /**
     * Updates the hieght of the user in feet
     * 
     * @summary This method takes an onChange event and updates the height of the user in feet
     * 
     * @instance
     * @memberOf Diet
     * @method heightFeetChange
     *
     * @param {Event} event from input which serves as the height of the user
     */

    heightFeetChange = (event) => {
        const value = event;
        let errors = { ...this.state.errors };
        let dirty = {...this.state.dirty};
        let user = this.state.user;

        dirty.height = true;

        errors.height = value == 0 ? 'Height in feet is required.' : '';
        
        user.height.feet = value;
        
        this.setState({ user, errors, dirty});
    }

    /**
     * Updates the hieght of the user in inches
     * 
     * @summary This method takes an onChange event and updates the height of the user in inches
     * 
     * @instance
     * @memberOf Diet
     * @method heightInchesChange
     *
     * @param {Event} event from input which serves as the height of the user
     */

    heightInchesChange = (event) => {
        const value = event;
        let errors = { ...this.state.errors };
        let dirty = {...this.state.dirty};
        let user = this.state.user;

        dirty.height = true;

        errors.height = value == 0 ? 'Height in inches is required.' : '';
        
        user.height.inches = value;
        
        this.setState({ user, errors, dirty});
    }

    /**
     * Updates the age of the user
     * 
     * @summary This method takes an onChange event and updates the age of the user
     * 
     * @instance
     * @memberOf Diet
     * @method ageChange
     *
     * @param {Event} event from input which serves as the age of the user
     */

    ageChange = (event) => {
        const value = event;
        let errors = { ...this.state.errors };
        let dirty = {...this.state.dirty};
        let user = this.state.user;

        dirty.age = true;

        errors.age = value == 0 ? 'Age is required.' : '';
        
        user.age = value;
        
        this.setState({ user, errors, dirty});
    }

    /**
     * Updates the activty of the user which can be sedentary, moderately active etc
     * 
     * @summary This method takes an onChange event and updates the activity of the user
     * 
     * @instance
     * @memberOf Diet
     * @method  activityLevelChange
     *
     * @param {Object} activityLevel from seleced option which serves as the activity level
     */

    activityLevelChange = (activityLevel) => {
        let user = { ...this.state.user };
        user.activity_level = activityLevel;
        this.setState({ user });
    }

    /**
     * Updates the goal of the user which can be either to gain wiehgt or loose
     * 
     * @summary This method takes an onChange event and updates the goal of the user
     * 
     * @instance
     * @memberOf Diet
     * @method  goalChange
     *
     * @param {Object} activityLevel from seleced option which serves as the activity level
     */

    goalChange = (goal) => {
        let user = { ...this.state.user };
        user.goal = goal;
        this.setState({ user });
    }


    /**
     * Updates the gender of the user 
     * 
     * @summary This method takes an onChange event and updates the gender of the user
     * 
     * @instance
     * @memberOf Diet
     * @method  handleGenderChange
     *
     * @param {Object} activityLevel from seleced option which serves as the activity level
     */

    handleGenderChange = (event) => {
        const value = event.currentTarget.value;
        let user = { ...this.state.user };
        user.gender = value;
        this.setState({ user });
    }

    /**
     * Creates a diet plan for the user which determines their base calories and sets their peronal details.
     *
     * @summary This method takes no parameters. It adds a diet plan for the user
     * 
     * @instance
     * @memberOf Calories
     * @method addMeal
     */

    addDiet = () => {
        const {user, ToasterSuccess, ToasterFailed} = this.state;
        this.setState({showProgress: true});
        let intervalId = setInterval(() => {
            this.setState(prevState => ({
                progress: Math.min(prevState.progress + 0.2, 0.7) 
            }));
        }, 2000);
        fetch(`${process.env.NODE_ENV==='development' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_DEPLOYED_URL}/diet/user/${user.id}/add`, {
            method: 'post',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                age: user.age,
                gender: user.gender,
                weight: {
                    value: user.weight,
                    unit: user.weight_unit.value
                },
                height: {
                    feet: user.height.feet,
                    inches: user.height.inches
                },
                activity: {
                    label: user.activity_level.label,
                    value: user.activity_level.value
                },
                goal: user.goal.value

            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.result == "success"){
                setTimeout(() => {
                    clearInterval(intervalId);
                    this.setState({ progress: 1.0 });
                    setTimeout(() => {
                        this.setState({tdee: data.tdee, showProgress: false});
                        ToasterSuccess.show = true;
                        ToasterSuccess.message = data.message;
                        this.setState({ ToasterSuccess});
                    }, 2000)
                    
                }, 2000)
                
            }
            else{
                ToasterFailed.show = true;
                ToasterFailed.message = data.message;
                this.setState({ ToasterFailed});
                
            }
        });

        
        
    }

     /**
     * Displays the components of the Diet Module
     *
     * @summary This method renders the components of the Diet Module.
     * 
     * @instance
     * @memberOf Diet
     * @method render
     * 
     * @returns {JSX.Element} The JSX elements representing the rendered components.
     * 
     */

    renderItem = (item, { handleClick, modifiers }) => {
        return (
            <MenuItem
                key={item.value}
                text={
                    <div className="flex justify-between">
                    <div>
                        <div>{item.label}</div>
                        {item.info != undefined &&
                            <div style={{ color: "gray", whiteSpace: "normal" }}>{item.info}</div>
                        }
                    </div>
                    <div>
                        {item.icon != undefined && item.icon.type === "blueprint" &&
                            <Icon icon={item.icon.symbol} />
                        }
                        {item.icon != undefined && item.icon.type === "fontawesome" &&
                            <i className={"fa-solid " + item.icon.symbol}></i>
                        }
                    </div>
                </div>
                }
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
        const { loading, weight_units, activity_levels, goals, user, ToasterSuccess, ToasterFailed, progress, showProgress, tdee, errors } = this.state;
        return (
            <div>
                {loading && (
                    <div className="loader-overlay">
                        <Loader/>
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
                        text: "Go to Login Page",
                        onClick: () => window.location.replace("/#/login") 
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
                <div className='vw-100 vh-100 d-flex flex-column justify-center items-center'>
                    <div className="flex">
                    <div className="w-60">
                        <Title text="Diet Plan" color="#FFE39F" />
                        <About text={diet_desc} className="pb0" />
                        <div className="ml5 ph4-ns">
                            <Card interactive={true} elevation={4} className="card-content w-70">
                                <div className="w-100 mt3">
                                    <div className="pa4 pb0">
                                        <FormGroup
                                            label="Weight"
                                            inline={true}
                                            className="white bp5-text-large"
                                        >
                                        <div className="flex items-center">
                                            <div className="w-30">
                                                <NumericInput
                                                        onValueChange={this.weightChange}
                                                        large={true}
                                                        buttonPosition="none"
                                                        intent={errors.weight === '' ? "success" : "danger"}
                                                        
                                                />
                                            </div>
                                            <div className="w-60">
                                                <div className="w-50">
                                                    <ButtonGroup large={true} className="flex justify-between items-center">
                                                    <Select
                                                    activeItem={user.weight_unit}
                                                    onItemSelect={this.unitChange}
                                                    items={weight_units}
                                                    itemRenderer={this.renderItem}
                                                    filterable={false}
                                                    popoverProps={{ minimal: false, placement: "right" }}
                                                    
                                                    >
                                                        <Button
                                                            rightIcon={<Icon icon="caret-down" intent="success" />}
                                                            text={user.weight_unit ? user.weight_unit.label : 'Select...'}
                                                            fill={true}
                                                            large={true}
                                                            round={true}
                                                            className="select-btn flex justify-space"
                                                        />
                                                    </Select>
                                                    {errors.weight && (
                                                        <Tooltip content={errors.weight} placement="right">
                                                            <i className="fa-solid fa-circle-exclamation error-icon ml3"></i>
                                                        </Tooltip>
                                                    )}
                                                    </ButtonGroup>
                                                </div>
                                            </div>
                                        </div>
                                        </FormGroup>
                                        <FormGroup
                                            label="Height"
                                            inline={true}
                                            className="white bp5-text-large"
                                        >
                                            <div className="flex items-center">
                                                <div className="flex">
                                                <div className="w-30">
                                                    <NumericInput
                                                        onValueChange={this.heightFeetChange}
                                                        large={true}
                                                        buttonPosition="none"
                                                        intent={errors.height === '' ? "success" : "danger"}
                                                        placeholder="Feet"
                                                    />
                                                   <div className="">ft</div>
                                                </div>
                                                <div className="w-30">
                                                    <NumericInput
                                                        onValueChange={this.heightInchesChange}
                                                        large={true}
                                                        buttonPosition="none"
                                                        intent={errors.height === '' ? "success" : "danger"}
                                                        placeholder="Inches"
                                                    />
                                                    <div className="ml2">in</div>
                                                </div>
                                                
                                                </div>
                                                
                                                
                                                
                                                
                                            </div>
                                        </FormGroup>


                                        <FormGroup
                                            label="Age"
                                            inline={true}
                                            className="white bp5-text-large"
                                        >
                                            <div className="flex items-center">
                                            <div className="w-30">
                                            <NumericInput
                                                onValueChange={this.ageChange}
                                                large={true}
                                                buttonPosition="none"
                                                intent={errors.age === '' ? "success" : "danger"}
                                                
                                            />
                                            </div>
                                            <div className="ml2">years</div>
                                            <div>
                                                {errors.age &&
                                                    <Tooltip content={errors.age} placement="right">
                                                        <i className="fa-solid fa-circle-exclamation error-icon ml3"></i>
                                                    </Tooltip>
                                                }
                                            </div>
                                            
                                            </div>
                                            
                                        </FormGroup>
                                        <FormGroup
                                            label="Activity Level"
                                            inline={true}
                                            className="white bp5-text-large"
                                        >
                                            <Select
                                                activeItem={user.activity_level}
                                                onItemSelect={this.activityLevelChange}
                                                items={activity_levels}
                                                itemRenderer={this.renderItem}
                                                filterable={false}
                                                popoverProps={{ minimal: false, placement: "right" }}
                                                className="w-50"
                                            >
                                                <Button
                                                    rightIcon={<Icon icon="caret-down" intent="success" />}
                                                    text={user.activity_level ? user.activity_level.label : 'Select...'}
                                                    fill={true}
                                                    large={true}
                                                    round={true}
                                                    className="select-btn flex justify-space"
                                                />
                                            </Select>
                                        </FormGroup>
                                        <FormGroup
                                            label="Goal"
                                            inline={true}
                                            className="white bp5-text-large"
                                        >
                                            <Select
                                                activeItem={user.goal}
                                                onItemSelect={this.goalChange}
                                                items={goals}
                                                itemRenderer={this.renderItem}
                                                filterable={false}
                                                popoverProps={{ minimal: false, placement: "right" }}
                                                className="w-50"
                                            >
                                                <Button
                                                    rightIcon={<Icon icon="caret-down" intent="success" />}
                                                    text={user.goal ? user.goal.label : 'Select...'}
                                                    fill={true}
                                                    large={true}
                                                    round={true}
                                                    className="select-btn flex justify-space"
                                                />
                                            </Select>
                                        </FormGroup>
                                        <FormGroup
                                            label="Gender"
                                            inline={true}
                                            className="white bp5-text-large"
                                        >
                                            <div className="flex items-center">
                                                <RadioGroup
                                                    inline={true}
                                                    name="group"
                                                    onChange={this.handleGenderChange}
                                                    selectedValue={user.gender}
                                                >
                                                    <Radio label="Male" value="male" />
                                                    <Radio label="Female" value="female" />
                                                </RadioGroup>
                                            </div>
                                        </FormGroup>
                                    </div>
                                    <div className="flex items-center justify-end mr2">
                                                
                                        <Tooltip content="Click to submit" placement="right">
                                            <Button className={"submit-btn"} 
                                            rightIcon="plus" intent="success" 
                                            text="Submit" large={true} 
                                            disabled={this.addEnabled()}
                                            onClick={this.addDiet}/>
                                        </Tooltip>
                                            
                                        </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                   
                    <div className="w-40" style={{margin: "auto"}}>
                        <div className='w-70'>
                        {showProgress &&
                        <div style={{margin: "auto"}}>
                            <h2 className="tc">Calculating your total daily energy expenditure (TDEE)</h2>
                            <ProgressBar intent={"success"} value={progress}stripes={false} />
                        </div>
                        }
                        {tdee &&
                        <div style={{margin: "auto"}}>
                            <h2 className="tc">To {user.goal.value} weight you must consume {user.goal.value == "loose" ? "less" : "more"} than</h2>
                            <h1 className="tc f-6 pt1 pb1 mb0">{tdee} </h1>
                            <h2 className="tc">calories per day</h2>
                        </div>
                        }
                        </div>
                        
                    </div>
                </div>

                    
                </div>
            </div>
        );
    }
}

export default Diet;
