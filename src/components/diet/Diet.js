import React, { Component } from 'react';
import Title from '../title/Title';
import About from '../about/About';
import { Button, Icon, MenuItem, ProgressBar, ButtonGroup, Radio, RadioGroup, Card, FormGroup, NumericInput, Tooltip, Toast2, OverlayToaster} from "@blueprintjs/core";
import { Select} from '@blueprintjs/select';
import Loader from '../loader/Loader';
import { diet_desc } from '../../descriptions';

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

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loading: false });
        }, 3000);
    }

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

    unitChange = (unit) => {
        const value = unit;
        let user = this.state.user;
        user.weight_unit = value;
        this.setState({ user });
    }

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

    activityLevelChange = (activityLevel) => {
        let user = { ...this.state.user };
        user.activity_level = activityLevel;
        this.setState({ user });
    }

    goalChange = (goal) => {
        let user = { ...this.state.user };
        user.goal = goal;
        this.setState({ user });
    }

    handleGenderChange = (event) => {
        const value = event.currentTarget.value;
        let user = { ...this.state.user };
        user.gender = value;
        this.setState({ user });
    }

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
