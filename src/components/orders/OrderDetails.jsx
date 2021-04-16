import React from 'react';
import { Layout, Spin } from 'antd';
import CssBaseline from '@material-ui/core/CssBaseline';
import EnhancedTable from '../react-table/EnhancedTable';
import { useOrderDetails } from '../app-context/OrderDetailProvider';
import DetailFieldsTableCell from './DetailFieldsTableCell';

const { Content } = Layout;

function OrderDetails(props) {
	const { orderDetails, deleteDetails, addDetail, updateDetail, detailLoading, errorMsg, resetErrorMsg } = useOrderDetails();

	// no need adding order detail
	const initOrderDetail = React.useMemo(() => {
		return {};
	}, []);

	const columns = React.useMemo(
		() => [
			{
				Header: 'Product Name',
				accessor: 'productName',
			},
			{
				Header: 'Size',
				accessor: 'size',
			},
			{
				Header: 'Toppings',
				accessor: 'toppings',
			},
			{
				Header: 'Quantity',
				accessor: 'quantity',
			},
			{
				Header: 'Note',
				accessor: 'note',
			},
		],
		[]
	);

	const data = React.useMemo(() => {
		return orderDetails.map((detail) => ({
			id: detail.id,
			// get order details by order id. Therefore, Spring Boot does not include order id in order detail
			// we have to get it from 'props' passed from table row expander
			order: { id: props.id },
			product: { id: detail.product.id },
			productName: detail.product.name,
			size: { id: detail.size.id },
			toppings: detail.toppings,
			quantity: detail.quantity,
			note: detail.note !== null ? detail.note : '', // prevent passing null value to the table cell (value is required)
		}));
	}, [orderDetails, props.id]);

	// no need adding order
	const detailFieldsForm = () => {
		return null;
	};

	const detailFieldsTableCell = (columnId, inputStyle, value, onChange = (f) => f, onBlur = (f) => f) => {
		return <DetailFieldsTableCell columnId={columnId} inputStyle={inputStyle} value={value} onChange={onChange} onBlur={onBlur} />;
	};

	return (
		<Content style={{ margin: '0 16px' }}>
			<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
				<Spin spinning={detailLoading}>
					<CssBaseline />
					<EnhancedTable
						columns={columns}
						data={data}
						initialRecord={initOrderDetail}
						fieldsForm={detailFieldsForm}
						fieldsTableCell={detailFieldsTableCell}
						deleteRecordInDB={deleteDetails}
						addRecordInDB={addDetail}
						updateRecordInDB={updateDetail}
						errorMsg={errorMsg}
						resetErrorMsg={resetErrorMsg}
						tableName='Order Details'
					/>
				</Spin>
			</div>
		</Content>
	);
}

export default OrderDetails;
