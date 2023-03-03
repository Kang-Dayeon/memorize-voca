import React from 'react'
import {useTable, usePagination} from 'react-table'
// ** icon
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faAnglesRight,
  faAnglesLeft,
  faAngleRight,
  faAngleLeft
} from '@fortawesome/free-solid-svg-icons'

// useTable에다가 작성한 columns와 data를 전달한 후 아래 4개의 props를 받아온다
const Table = ({columns, data}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {pageIndex: 0},
    },
    usePagination
  )

  return (
    <div className="table">
      <select
        value={pageSize}
        onChange={e => {
          setPageSize(Number(e.target.value))
        }}
      >{
        [5,10,20,30].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))
      }</select>
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
        {page.map((row) => {
          prepareRow(row)
          return (
            // getRowProps는 각 row data를 호출해낸다
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                // getCellProps는 각 cell data를 호출해낸다
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          )
        })}
        </tbody>
      </table>
      <div className="pagination">
        <button
          className="btn"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          <FontAwesomeIcon icon={faAnglesLeft} />
        </button>
        <button
          className="btn"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <span>
          <strong>{pageIndex + 1}</strong>
          /{pageOptions.length}
        </span>
        <button
          className="btn"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
        <button
          className="btn"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          <FontAwesomeIcon icon={faAnglesRight} />
        </button>
      </div>
    </div>
  )
}

export default Table