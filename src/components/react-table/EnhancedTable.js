import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import MaUTable from '@material-ui/core/Table';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from './TablePaginationActions';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableToolbar from './TableToolbar';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable, useExpanded } from 'react-table';

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
	const defaultRef = React.useRef();
	const resolvedRef = ref || defaultRef;

	React.useEffect(() => {
		resolvedRef.current.indeterminate = indeterminate;
	}, [resolvedRef, indeterminate]);

	return <Checkbox ref={resolvedRef} {...rest} />;
});

const inputStyle = {
	padding: 0,
	margin: 0,
	border: 0,
	background: 'transparent',
};

// Create an editable cell renderer
const EditableCell = ({
	data,
	value: initialValue,
	row: { index },
	column: { id },
	fieldsTableCell,
	updateRecordInDB,
	errorMsg,
	resetErrorMsg,
	setOpenErrorMsg,
}) => {
	// We need to keep and update the state of the cell normally
	const [value, setValue] = React.useState(initialValue);
	const [dlgOpen, setDlgOpen] = React.useState(false);

	const onChange = (e) => {
		if (e != null) {
			// check whether if it's an object/array or an event (text fields)
			if (!e.target) {
				setValue(e);
			} else {
				setValue(e.target.value);
			}
		}
	};

	const updateCellData = (rowIndex, columnId, value) => {
		const record = data
			.map((row, i) => {
				if (i === rowIndex) {
					return {
						...data[rowIndex],
						[columnId]: value,
					};
				}
				return row;
			})
			.filter((row, i) => i === rowIndex)
			.reduce((row) => row);
		updateRecordInDB(record);
	};

	// We'll only update the external data when the input is blurred
	const onBlur = () => {
		setOpenErrorMsg(false);
		resetErrorMsg();
		setDlgOpen(false);
		updateCellData(index, id, value);
	};

	React.useEffect(() => {
		if (errorMsg !== undefined) {
			setOpenErrorMsg(true);
			setValue(initialValue);
		}
	}, [errorMsg, setOpenErrorMsg, initialValue]);

	// If the initialValue is changed external, sync it up with our state
	React.useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	const handleDlgOpen = () => {
		setDlgOpen(true);
	};

	const handleDlgClose = () => {
		setDlgOpen(false);
		setValue(initialValue);
	};

	return <>{fieldsTableCell(id, inputStyle, value, onChange, onBlur, dlgOpen, handleDlgOpen, handleDlgClose)}</>;
};

EditableCell.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.any.isRequired,
	}),
	row: PropTypes.shape({
		index: PropTypes.number.isRequired,
	}),
	column: PropTypes.shape({
		id: PropTypes.string.isRequired,
	}),
	updateRecordInDB: PropTypes.func.isRequired,
};

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
	Cell: EditableCell,
};

const EnhancedTable = ({
	columns,
	data,
	initialRecord,
	fieldsForm,
	fieldsTableCell,
	deleteRecordInDB,
	addRecordInDB,
	updateRecordInDB,
	errorMsg,
	resetErrorMsg,
	makeSubRow,
	tableName,
}) => {
	const [openErrorMsg, setOpenErrorMsg] = React.useState(false);
	const {
		getTableProps,
		prepareRow,
		visibleColumns,
		headerGroups,
		page,
		gotoPage,
		setPageSize,
		preGlobalFilteredRows,
		setGlobalFilter,
		state: { pageIndex, pageSize, selectedRowIds, globalFilter = '' },
	} = useTable(
		{
			columns,
			data,
			defaultColumn,
			initialState: { pageSize: 5 },
			fieldsTableCell, // pass to EditableCell
			updateRecordInDB, // pass to EditableCell
			errorMsg, // pass to EditableCell
			resetErrorMsg, // pass to EditableCell
			setOpenErrorMsg, // pass to EditableCell
		},
		useGlobalFilter,
		useSortBy,
		useExpanded,
		usePagination,
		useRowSelect,
		(hooks) => {
			hooks.allColumns.push((columns) => [
				...columns,
				// Let's make a column for selection
				{
					id: 'selection',
					// The header can use the table's getToggleAllRowsSelectedProps method to render a checkbox.
					// Pagination is a problem since this will select all rows even though not all rows are on the current page.
					// The solution should be server side pagination.
					// For one, the clients should not download all rows in most cases.
					// The client should only download data for the current page.
					// In that case, getToggleAllRowsSelectedProps works fine.
					Header: ({ getToggleAllRowsSelectedProps }) => (
						<div>
							<IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
						</div>
					),
					// The cell can use the individual row's getToggleRowSelectedProps method to the render a checkbox
					Cell: ({ row }) => (
						<div>
							<IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
						</div>
					),
				},
			]);
		}
	);

	const handleChangePage = (event, newPage) => {
		gotoPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setPageSize(Number(event.target.value));
	};

	const getRemovedIndexes = (array, indexes) => array.filter((_, i) => indexes.includes(i));

	const deleteRecordHandler = (event) => {
		const removedIndexes = getRemovedIndexes(
			data,
			Object.keys(selectedRowIds).map((x) => parseInt(x, 10))
		);
		deleteRecordInDB(removedIndexes);
	};

	const addRecordHandler = (record) => {
		addRecordInDB(record);
	};

	// In reality, you could pass whatever you want as props to a component like this,
	// including the entire table instance. But for this example, we'll just pass the row
	const renderRowSubComponent = React.useCallback((props) => makeSubRow(props), [makeSubRow]);

	const handleErrorClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenErrorMsg(false);
		resetErrorMsg();
	};

	// error message for adding new record (validation from back-end)
	React.useEffect(() => {
		if (errorMsg !== undefined) {
			setOpenErrorMsg(true);
		}
	}, [errorMsg]);

	// Render the UI for your table
	return (
		<TableContainer>
			<TableToolbar
				numSelected={Object.keys(selectedRowIds).length}
				initialRecord={initialRecord}
				fieldsForm={fieldsForm}
				deleteRecordHandler={deleteRecordHandler}
				addRecordHandler={addRecordHandler}
				preGlobalFilteredRows={preGlobalFilteredRows}
				setGlobalFilter={setGlobalFilter}
				globalFilter={globalFilter}
				tableName={tableName}
			/>
			<MaUTable {...getTableProps()}>
				<TableHead>
					{headerGroups.map((headerGroup) => (
						<TableRow {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<TableCell
									{...(column.id === 'selection' ? column.getHeaderProps() : column.getHeaderProps(column.getSortByToggleProps()))}
								>
									{column.render('Header')}
									{column.id !== 'selection' ? (
										<TableSortLabel
											active={column.isSorted}
											// react-table has a unsorted state which is not treated here
											direction={column.isSortedDesc ? 'desc' : 'asc'}
										/>
									) : null}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableHead>
				<TableBody>
					{page.map((row, i) => {
						prepareRow(row);
						return (
							<React.Fragment key={i}>
								<TableRow {...row.getRowProps()}>
									{row.cells.map((cell) => {
										return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>;
									})}
								</TableRow>
								{row.isExpanded ? (
									<tr>
										<TableCell colSpan={visibleColumns.length}>{renderRowSubComponent(row.original)}</TableCell>
									</tr>
								) : null}
							</React.Fragment>
						);
					})}
				</TableBody>

				{Object.keys(initialRecord).length !== 0 ? (
					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[5, 10, 20]}
								colSpan={columns.length + 1} // +1 selection column
								count={data.length}
								rowsPerPage={pageSize}
								page={pageIndex}
								SelectProps={{
									inputProps: { 'aria-label': 'rows per page' },
									native: true,
								}}
								onChangePage={handleChangePage}
								onChangeRowsPerPage={handleChangeRowsPerPage}
								ActionsComponent={TablePaginationActions}
							/>
						</TableRow>
					</TableFooter>
				) : null}
			</MaUTable>
			{errorMsg !== undefined ? (
				<Snackbar open={openErrorMsg} autoHideDuration={5000} onClose={handleErrorClose}>
					<MuiAlert elevation={6} variant='filled' severity='error' onClose={handleErrorClose}>
						{errorMsg}
					</MuiAlert>
				</Snackbar>
			) : null}
		</TableContainer>
	);
};

EnhancedTable.propTypes = {
	columns: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired,
	initialRecord: PropTypes.object.isRequired,
	fieldsForm: PropTypes.func.isRequired,
	fieldsTableCell: PropTypes.func.isRequired,
	deleteRecordInDB: PropTypes.func.isRequired,
	addRecordInDB: PropTypes.func.isRequired,
	updateRecordInDB: PropTypes.func.isRequired,
	resetErrorMsg: PropTypes.func.isRequired,
	tableName: PropTypes.string.isRequired,
};

export default EnhancedTable;
