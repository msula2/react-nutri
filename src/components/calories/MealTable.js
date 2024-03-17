import React from 'react';
import { useTable } from 'react-table';

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

  return (
    <table {...getTableProps()} style={{ border: '1px solid black', borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()} style={{ borderBottom: '1px solid black' }}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} style={{ padding: '8px', borderRight: '1px solid black' }}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} style={{ borderBottom: '1px solid black' }}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} style={{ padding: '8px', borderRight: '1px solid black' }}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MealTable;
