import React from 'react';
import { Layout, Spin } from 'antd';
import CssBaseline from '@material-ui/core/CssBaseline';
import EnhancedTable from '../react-table/EnhancedTable';
import OrderFieldsTableCell from './OrderFieldsTableCell';
import OrderDetails from './OrderDetails';
import OrderDetailProvider from '../app-context/OrderDetailProvider';
import { useOrders } from '../app-context/OrderProvider';

const { Content } = Layout;

function Orders() {
	const { orders, deleteOrders, addOrder, updateOrder, orderLoading, errorMsg, resetErrorMsg } = useOrders();

	// no need adding order
	const initOrder = React.useMemo(() => {
		return {};
	}, []);

	const columns = React.useMemo(
		() => [
			{
				Header: () => null,
				id: 'expander',
				// Use Cell to render an expander for each row.
				// We can use the getToggleRowExpandedProps prop-getter to build the expander.
				Cell: ({ row }) => <span {...row.getToggleRowExpandedProps()}>{row.isExpanded ? '👇' : '👉'}</span>,
				SubCell: () => null,
			},
			{
				Header: 'Recipient Name',
				accessor: 'recipientName',
			},
			{
				Header: 'Order Address',
				accessor: 'orderAddress',
			},
			{
				Header: 'Phone',
				accessor: 'phone',
			},
			{
				Header: 'Order Date',
				accessor: 'orderDate',
			},
			{
				Header: 'Order Status',
				accessor: 'orderStatus',
			},
			{
				Header: 'Username',
				accessor: 'username',
			},
		],
		[]
	);

	const data = React.useMemo(() => {
		return orders.map((order) => ({
			id: order.id,
			recipientName: order.recipientName,
			orderAddress: order.orderAddress,
			phone: order.phone,
			orderDate: order.orderDate,
			orderStatus: order.orderStatus,
			user: { id: order.user.id },
			username: order.user.username,
			details: order.details,
		}));
	}, [orders]);

	// no need adding order
	const orderFieldsForm = () => {
		return null;
	};

	const orderFieldsTableCell = (columnId, inputStyle, value, onChange = (f) => f, onBlur = (f) => f) => {
		return <OrderFieldsTableCell columnId={columnId} inputStyle={inputStyle} value={value} onChange={onChange} onBlur={onBlur} />;
	};

	const OrderSubRow = (props) => {
		return (
			<OrderDetailProvider>
				<OrderDetails {...props} />
			</OrderDetailProvider>
		);
	};

	return (
		<Content style={{ margin: '16px' }}>
			<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
				<Spin spinning={orderLoading}>
					<CssBaseline />
					<EnhancedTable
						columns={columns}
						data={data}
						initialRecord={initOrder}
						fieldsForm={orderFieldsForm}
						fieldsTableCell={orderFieldsTableCell}
						deleteRecordInDB={deleteOrders}
						addRecordInDB={addOrder}
						updateRecordInDB={updateOrder}
						errorMsg={errorMsg}
						resetErrorMsg={resetErrorMsg}
						makeSubRow={OrderSubRow}
						tableName='Orders'
					/>
				</Spin>
			</div>
		</Content>
	);
}

export default Orders;
