import React, { Component } from 'react';
import Select from "react-select";


const food_groups = [
    {label: "Starch/Bread", value: "strach"},
    {label: "Meat", value: "meat"},
    {label: "Vegetable", value: "vegetable"},
    {label: "Fruit", value: "fruit"},
    {label: "Milk", value: "milk"},
    {label: "Fat", value: "fat"},

]

class ExchangeList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            food_group: null
        };
    }

    groupChange = (selectedOption) => {
        this.setState({ food_group: selectedOption.value });
    };

    render() {
        return (
            <div className="card-fields">
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
        );
    }
}

export default ExchangeList;
