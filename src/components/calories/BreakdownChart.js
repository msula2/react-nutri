import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, Text } from 'recharts';

const BreakdownChart = ({ data_pie, data_table, width, height }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const legendHeight = 50;
  const textSpacing = 15; 

  return (
    <div className="flex flex-column items-center">
      <PieChart width={width} height={height}>
        <text
          x={width / 2}
          y={30}
          textAnchor="middle"
          fontSize="20"
          fontWeight="bold"
          fill="#666"
        >
          Caloric Breakdown
        </text>
        <Pie
          data={data_pie}
          cx={width / 2 - 10}
          cy={height / 2 - legendHeight / 2 - textSpacing + 15}
          innerRadius={30}
          outerRadius={60}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data_pie.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={legendHeight} />
        <text
          x={width / 2}
          y={height - textSpacing}
          textAnchor="middle"
          fontSize="14"
          fill="#666"
        >
          All values are in grams
        </text>
      </PieChart>

      <table className="mt2 bp5-html-table bp5-html-table-bordered bp5-html-table-striped bp5-compact">
        <tbody>
          <tr>
            <td>Carbohydrate</td>
            <td>{data_pie.find((item) => item.name === "Carbohydrates").value} grams x 4 calories per gram = {data_table.carbohydrates} kcal</td>
          </tr>
          <tr>
            <td>Protein</td>
            <td>{data_pie.find((item) => item.name === "Proteins").value} grams x 4 calories per gram = {data_table.proteins} kcal</td>
          </tr>
          <tr>
            <td>Fat</td>
            <td>{data_pie.find((item) => item.name === "Fats").value} grams x 9 calories per gram = {data_table.fats} kcal</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>= {data_table.total} kcal</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BreakdownChart;
