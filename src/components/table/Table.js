import React from 'react'
import {useTable} from 'react-table'

// useTable에다가 작성한 columns와 data를 전달한 후 아래 4개의 props를 받아온다
const Table = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(header => (
          // getHeaderGroupProps를 통해 header 배열을 호출한다
          <tr {...header.getHeaderGroupProps()}>
            {header.headers.map(col => (
              // getHeaderProps는 각 셀 순서에 맞게 header를 호출한다
              <th {...col.getHeaderProps()}>{col.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
      {rows.map((row )=> {
        prepareRow(row);
        return (
          // getRowProps는 각 row data를 호출해낸다
          <tr {...row.getRowProps()}>
            {row.cells.map(cell => (
              // getCellProps는 각 cell data를 호출해낸다
              <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
            ))}
          </tr>
        );
      })}
      </tbody>
    </table>
  );
};

export default Table