import React, { useState, useEffect } from "react";
import { useTable } from 'react-table';
import { Button, Container, Row, Col } from 'react-bootstrap';


function Leaderboard(props){
    console.log(props.tableData);

    const data = React.useMemo(
        () => [
          {
            col1: "hello",
            col2: 'World',
          },
        ],
        []
    )
    
    const columns = React.useMemo(
        () => [
          {
            Header: 'Service Type',
            accessor: 'col1',
          },
          {
            Header: 'Date',
            accessor: 'col2',
          },
        ],
        []
    )
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })
    
    return (
        <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      borderBottom: 'solid 3px red',
                      background: 'aliceblue',
                      color: 'black',
                      fontWeight: 'bold',
                    }}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: '10px',
                          border: 'solid 1px gray',
                          background: 'papayawhip',
                        }}
                      >
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
    )
}

export default Leaderboard;