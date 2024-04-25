import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Popover, Tooltip, Icon} from '@blueprintjs/core';
import BreakdownChart from './BreakdownChart';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import './MealTable.css'; // Import your custom CSS file

class MealTable extends React.Component {
  foodItemsTemplate(rowData) {
    return (
      <ul>
        {rowData.food_items.map((foodItem, index) => (
          <li key={index}>
            <div className="w-100 flex justify-around pa1">
              <div className="w-70">
                {foodItem.name}
              </div>
              <div className="w-30">
                <Popover
                  content={
                    <div>
                      <BreakdownChart data_pie={foodItem.breakdown.grams} data_table={foodItem.breakdown.calories} width={300} height={300} />
                    </div>
                  }
                  position="right"
                >
                  <Tooltip content="Click to see caloric breakdown" position="right">
                    <Icon icon="doughnut-chart" style={{color: "#a6d940"}}/>
                  </Tooltip>
                </Popover>
              </div>
            </div>
            
          </li>
        ))}
      </ul>
    );
  }

  actionsTemplate(rowData) {
    return (
      <div className="flex justify-around">
          <div>
            <Popover
            content={
              <div>
                <BreakdownChart data_pie={rowData.breakdown.grams} data_table={rowData.breakdown.calories} width={300} height={300} />
              </div>
            }
            position="right"
          >
            <Tooltip content="Click to see total breakdown" position="right">
              <Icon icon="doughnut-chart" style={{color: "#a6d940"}}/>
            </Tooltip>
          </Popover>
        </div>
        <div>
          <Tooltip content="Click to remove meal from table" position="right">
            <Icon icon="trash" intent="danger"/>
          </Tooltip>
        </div>

      </div>
      
    );
  }

  DateTimeTemplate(rowData) {
    return (
      <div className="flex justify-around">
        <div>{new Date(rowData.datetime).toLocaleDateString()}</div>
        <div>{new Date(rowData.datetime).toLocaleTimeString()}</div>
      </div>
      
    );
  }

  NameTemplate(rowData) {
    return (
      <div className="flex justify-around">
        <div>{rowData.meal_name}</div>
      </div>
      
    );
  }

  render() {
    const { data } = this.props;

    return (
      <DataTable value={data} 
        style={{ backgroundColor: '#467c99' }} 
        size="small" 
        showGridlines 
        stripedRows
        paginator
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks
        NextPageLink LastPageLink"
        rows={5}>
        <Column field="meal_name" header="Meal Name"  body={this.NameTemplate}/>
        <Column field="datetime" header="Date & Time" body={this.DateTimeTemplate} sortable/>
        <Column header="Food Items" body={this.foodItemsTemplate} />
        <Column header="Actions" body={this.actionsTemplate} />
      </DataTable>
    );
  }
}

export default MealTable;
