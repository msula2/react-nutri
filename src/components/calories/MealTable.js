import React, { useState } from 'react';
import { useTable } from 'react-table';
import Modal from 'react-modal';
import BreakdownChart from './BreakdownChart';
import { Tooltip } from 'react-tooltip'; // Import Tooltip component

const MealTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  const [selectedRow, setSelectedRow] = useState(null);

  const handleButtonClick = (rowIndex) => {
    setSelectedRow(rowIndex);
  };

  return (
    <>
      <table {...getTableProps()} style={{ border: '1px solid black', borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} style={{ borderBottom: '1px solid black' }}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} style={{ padding: '8px', borderRight: '1px solid black' }}>
                  {column.render('Header')}
                </th>
              ))}
              {/* Add Actions column header */}
              <th style={{ padding: '8px', borderRight: '1px solid black' }}>Actions</th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} style={{ borderBottom: '1px solid black' }}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} style={{ padding: '8px', borderRight: '1px solid black' }}>
                    {cell.render('Cell')}
                  </td>
                ))}
                <td style={{ padding: '8px', borderRight: '1px solid black', textAlign: 'center', verticalAlign: 'middle' }}>
                  <Tooltip id={`chart-tooltip-${index}`} />
                  <a
                    data-tooltip-id={`chart-tooltip-${index}`}
                    data-tooltip-content="View calories breakdown"
                    onClick={() => handleButtonClick(index)}
                    style={{ display: 'inline-block' }}
                  >
                    <i className="fa-solid fa-chart-pie"></i>
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {selectedRow !== null && (
        <Modal isOpen={true} onRequestClose={() => setSelectedRow(null)}>
          <button onClick={() => setSelectedRow(null)}>Close</button>
          <h2>Caloric Breakdown for {data[selectedRow].mealName}</h2>
          <BreakdownChart data={data[selectedRow].breakdown} width={500} />
        </Modal>
      )}
    </>
  );
};

export default MealTable;
