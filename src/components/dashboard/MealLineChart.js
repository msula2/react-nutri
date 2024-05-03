import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const MealLineChart = ({ mealData }) => {
  const [selectedData, setSelectedData] = useState(null);

  const handleDataClick = (data, index) => {
    setSelectedData(data);
  };

  return (
    <div>
      <LineChart
        width={800}
        height={400}
        data={mealData}
        onClick={handleDataClick}
      >
        <CartesianGrid stroke="#ffe39f" strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ stroke: '#ffe39f', fill: '#ffe39f' }} />
        <YAxis tick={{ stroke: '#ffe39f', fill: '#ffe39f' }} />
        <Legend formatter={(value) => (value === 'goalTdee' ? 'Goal' : 'Calories')} />
        <Line type="monotone" dataKey="calories" stroke="#a6d940" strokeWidth={2} activeDot={{ r: 8 }} />
      </LineChart>
      {selectedData && (
        <div style={{ color: '#ffe39f' }}>
          <p>{`Meal Name: ${selectedData.activeLabel}`}</p>
          <p>{`Calories: ${selectedData.chartY}`}</p>
        </div>
      )}
    </div>
  );
};

export default MealLineChart;
