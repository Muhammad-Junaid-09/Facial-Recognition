import React, { useState } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';

import BTable from "react-bootstrap/Table";
import ReactLoading from "react-loading";

import makeData from './make-data';




const TableAll = (props) => {
	
	// const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selected, setSelected] = useState(null);
	const columns = React.useMemo(
    () => [
      {
        Header: ' ',
        columns: [
			{
				Header: 'S.no',
				accessor: 'serial',
				sortable: true

			},
          {
            Header: 'Device Name',
            accessor: 'device_name',
            sortable: true
          },
          {
            Header: 'Device ID',
            accessor: 'device_id',
            sortable: true
          },
        ],
      },
      {
        Header: ' ',
        columns: [
          {
            Header: 'Issuance Date',
            accessor: 'date',
            sortable: true
          },
          {
            Header: 'Status',
            accessor: 'status',
            sortable: true
          }
        ],
      },
    ],
    []
  );

  const data = React.useMemo(() => makeData(200), []);
  data.forEach((photo, index) => { photo.serial = index + 1; });

  const selectedData = (row) => {
		setSelected(row.index);
		console.log(row);
		props.parentCallback(row);
  }

//   const fetchData = React.useCallback(() => {
//     axios({
//       method: "GET",
//       url: "http://34.125.195.139:8090/api/get/all",
//     })
//       .then((response) => {
//         console.log(response.data);
// 		let preData = response.data;
// 		preData.forEach((photo, index) => { photo.serial = index + 1; });
		
//         setData(preData);
// 		setLoading(false);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);
//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);
  
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
  } = useTable({ columns, data, initialState: {pageIndex: 0}}, useSortBy, usePagination)

	 
	return (
		<div>
			
			{loading ?
			<div style = {{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>  
			<ReactLoading width={100} type={"spinningBubbles"} color="#0083ca" />
			</div> :
			<div style = {{margin: '100px 50px 50px 50px', border: '2px solid rgba(180,180,180,0.25)', borderRadius: '10px'}}>
				<div className= "row" style = {{marginTop: '44px', marginLeft: '20px'}}>
					<div className="col-3">
					<h1 style = {{color: '#737475', fontSize: '24px', lineHeight: '28px'}}>Device Status</h1>
					</div>
					<div className="col-6">
					</div>
					<div className="col-3 text-center">
					<button type="button" className="btn btn-lg btn-white me-1 mb-1"><i className="fas fa-align-center pe-1"></i>   filters</button>
					</div>
				</div>
				<div className="table-responsive">
					<BTable {...getTableProps()} style = {{borderBottom: 'none' }}>
						<thead >
							{headerGroups.map(headerGroup => (
								<tr {...headerGroup.getHeaderGroupProps()} >
									{headerGroup.headers.map(column => (
										<th {...column.getHeaderProps(column.getSortByToggleProps())}>
											<div class="d-flex">
												<span>{column.render('Header')}</span>
												<span class="ml-auto">
													{column.sortable ?
														column.isSorted
															? column.isSortedAesc
																? <i className="fa fa-sort-down fa-fw f-s-14 text-blue"></i>
																: <i className="fa fa-sort-up fa-fw f-s-14 text-blue"></i>
															: <i className="fa fa-sort fa-fw f-s-14 opacity-3"></i>
														: ''}
												</span>
											</div>
										</th>
									))}
								</tr>
							))}
					 </thead>
					 
					 <tbody {...getTableBodyProps()}>
							{page.map(
								(row, i) => {
									prepareRow(row);
									return (
										<tr {...row.getRowProps()} onClick={() => selectedData(row)} style = {{  background: row.index === selected ? '#F5F8FF' : 'white'}}>
											{row.cells.map(cell => {
												return (
													<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
												)
											})}
										</tr>
									)}
							)}
					 </tbody>
					 
				 </BTable>
			 </div>
			 <hr class="m-0" />
			 
			 	<div class="d-flex align-items-center justify-content-center mt-2">
					<ul className="pagination mb-0">
						<li className="page-item"><button className="page-link" onClick={() => gotoPage(0)} disabled={!canPreviousPage}><i className="fa fa-angle-double-left"></i></button></li>
						<li className="page-item"><button className="page-link" onClick={() => previousPage()} disabled={!canPreviousPage}><i className="fa fa-angle-left"></i></button></li>
						<li className="page-item d-flex align-items-center px-2">
							<div>Page <strong>{pageIndex + 1} of {pageOptions.length}</strong></div>
						</li>
						<li className="page-item"><button className="page-link" onClick={() => nextPage()} disabled={!canNextPage}><i className="fa fa-angle-right"></i></button></li>
						<li className="page-item"><button className="page-link" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}><i className="fa fa-angle-double-right"></i></button></li>
					</ul>
					
					<div className = "float-right" style = {{marginLeft: '10px'}}>
						<select
							className="form-control"
							value={pageSize}
							onChange={e => {
								setPageSize(Number(e.target.value))
							}}
						>
							{[5, 10, 20, 30, 40, 50].map(pageSize => (
								<option key={pageSize} value={pageSize}>
									Show {pageSize}
								</option>
							))}
						</select>
					</div>
				</div>
			 
			</div>}
			
		</div>
	)
}

export default TableAll;