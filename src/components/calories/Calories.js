import React, { Component } from 'react';
import Select from "react-select";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import ExchangeList from './ExchangeList';
import Brand from './Brand';


const tracking_options = [
    {label: "Brands", value: "brand"},
    {label: "Exchange Lists", value: "exchange"} 
];

class Calories extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            track_method: "exchange",
        };
    }

    trackChange = (selectedOption) => {
        this.setState({ track_method: selectedOption.value });
    };

    groupChange = (selectedOption) => {
        this.setState({ food_group: selectedOption.value });
    };

    render() {
        return (
            <div className="mt4">
                <div className="fl w-60">
                    <div className="detailed-card">
                        <h1 className="detailed-title">Meal Information</h1>
                        <div className="card-fields mt3">
                            <div className="field-label">
                                <label>Name</label>
                            </div>
                            <div className="field-value">
                                <input className="field-input" type="text" />
                            </div>
                        </div>
                        <div className="card-tools">
                            <button className="btn-submit" ><FontAwesomeIcon icon={faAdd} /> Add</button>
                        </div>
                    </div>
                    <div className="detailed-card mt5">
                        <h1 className="detailed-title">Ingredients</h1>
                        <div className="card-fields mt3">
                            <div className="field-label">
                                <label>Method of tracking</label>
                            </div>
                            <div className="field-value">
                                <Select
                                    defaultValue={tracking_options[1]}
                                    onChange={this.trackChange}
                                    options={tracking_options}
                                    className="w-80"
                                />
                            </div>
                        </div>
                        {this.state.track_method == 'exchange' ? <ExchangeList/> : <Brand />}
                    </div>
                </div> 
                <div className="fl w-40">
                    
                </div>
            </div>
        );
    }
}

export default Calories;
