import React, { useState, useEffect } from 'react';
import { H5, Popover, Tooltip, Icon } from '@blueprintjs/core';
import BreakdownChart from '../calories/BreakdownChart'; 

/**
 * Represents a component for displaying recipe ingredients with caloric breakdown.
 * @component
 * @param {Object} props - The props object.
 * @param {string} props.recipeId - The ID of the recipe.
 * @returns {JSX.Element} A React component displaying the ingredients with caloric breakdown.'
 * 
 * 
 * @author Hamdan Sulaiman
 *
 * @example 
 * <SearchRecipe(id)/>
 */

const SearchRecipeUI = ({ recipeId }) => {
    const [ingredientsUI, setIngredientsUI] = useState(null);

    useEffect(() => {
        fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_DEPLOYED_URL}/recipes/${recipeId}/calories/get`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === "success") {
                const items = data.items;
                console.log("Items: ", data.items);
                const updatedIngredientsUI = items.map(item => (
                    <li key={item.label} className="ingredient mt2" style={{color: "#a6d940"}}>
                        <div className="flex">
                            <div style={{color:"#ffffffd6"}} className="w-70">
                                {item.label}
                            </div>
                            <div className="w-30">
                                <Popover
                                    content={
                                        <div>
                                            <BreakdownChart data_pie={item.breakdown.grams} data_table={item.breakdown.calories} serving_size={item.amount} serving_unit={item.serving_unit} width={300} height={300} />
                                        </div>
                                    }
                                    position="right"
                                >
                                    <Tooltip content="Click to see caloric breakdown" position="right">
                                        <Icon icon="doughnut-chart" style={{ color: "#a6d940" }} />
                                    </Tooltip>
                                </Popover>
                            </div>
                        </div>
                        
                    </li>
                ));
                setIngredientsUI(updatedIngredientsUI);
            }
        })
        .catch(error => console.error(error));
    }, [recipeId]);

    return (
        <div>
            <ul>
                {ingredientsUI ? ingredientsUI : <li>Loading ingredients...</li>}
            </ul>
        </div>
    );
};

export default SearchRecipeUI;
