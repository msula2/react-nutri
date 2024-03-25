import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const BreakdownChart = ({ data, width }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <PieChart width={width} height={500}> 
      <Pie
        data={data}
        cx={width / 2}
        cy={100} 
        innerRadius={30} 
        outerRadius={60} 
        fill="#8884d8"
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default BreakdownChart;
