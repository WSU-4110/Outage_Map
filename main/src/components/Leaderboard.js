import React, {  } from "react";
import { useTable, useSortBy } from 'react-table';
import "../css/App.css"


function Leaderboard(props){
    const olddata = props.tableData;
    //console.log(data);

    let data = React.useMemo(() => {
      const counts = {
        Streaming: 0,
        Power: 0,
        Internet: 0,
        GamingPlatform: 0,
        Cable: 0,
        Website: 0
      };
    
      olddata.forEach(({ service_type }) => {
        if (Object.hasOwnProperty.call(counts, service_type)) {
          counts[service_type] += 1;
        }
      });
    
      return Object.entries(counts).map(([type, count]) => ({ type, count }));
    }, [olddata]);
    console.log(data);
    
    const columns = React.useMemo(
        () => [
          {
            Header: 'Service Type',
            accessor: 'type',
          },
          {
            Header: 'Outage Count',
            accessor: 'count',
          },
        ],
        []
    );
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({ columns, data}, useSortBy)
    
    return (
        <table {...getTableProps()} style={{border: 'solid 1px blue' }}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    style={{
                      borderBottom: 'solid 3px red',
                      background: 'aliceblue',
                      color: 'black',
                      fontWeight: 'bold',
                      paddingLeft: 10,
                      paddingRight: 10
                    }}
                  >
                    {column.render('Header')}
                    <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
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
    );
  }
export default Leaderboard;