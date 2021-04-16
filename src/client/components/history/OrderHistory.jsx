import React from 'react';
import { Layout, Table, Tag, Descriptions, Spin } from 'antd';
import { useOrderHistory } from '../app-context/OrderHistoryProvider';
import Redirector from '../../Redirector';

const { Content } = Layout;

function OrderHistory() {
	const { orders, orderLoading } = useOrderHistory();
	const [tableItems, setTableItems] = React.useState([]);

	React.useMemo(() => {
		window.scrollTo(0, 0);
	}, []);

	const columns = React.useMemo(
		() => [
			{
				title: 'Recipient Name',
				dataIndex: 'recipientName',
				key: 'recipientName',
			},
			{
				title: 'Order Address',
				dataIndex: 'orderAddress',
				key: 'orderAddress',
			},

			{
				title: 'Phone Number',
				dataIndex: 'phone',
				key: 'phone',
			},
			{
				title: 'Order Date',
				dataIndex: 'orderDate',
				key: 'orderDate',
			},
			{
				title: 'Order Status',
				dataIndex: 'orderStatus',
				key: 'orderStatus',
			},
		],
		[]
	);

	const expandableColumns = React.useMemo(
		() => [
			{
				title: 'Product Name',
				dataIndex: 'productName',
				key: 'productName',
			},
			{
				title: 'Size',
				dataIndex: 'size',
				key: 'size',
			},
			{
				title: 'Toppings',
				dataIndex: 'toppings',
				key: 'toppings',
				render: (toppings) => (
					<span>
						{toppings.map((topping) => {
							let color = topping.name.length > 6 ? 'geekblue' : 'green';
							if (topping.name === 'Chocolate') {
								color = 'volcano';
							}
							return (
								<Tag color={color} key={topping.id}>
									{topping.name.toUpperCase()}
								</Tag>
							);
						})}
					</span>
				),
			},
			{
				title: 'Quantity',
				dataIndex: 'quantity',
				key: 'quantity',
			},
			{
				title: 'Note',
				dataIndex: 'note',
				key: 'note',
			},
		],
		[]
	);

	React.useEffect(() => {
		setTableItems(() => {
			return orders.map((order) => {
				return {
					key: order.id, // required by ant table
					recipientName: order.recipientName,
					orderAddress: order.orderAddress,
					phone: order.phone,
					orderDate: new Date(order.orderDate).toLocaleDateString('en-US') + ' ' + new Date(order.orderDate).toLocaleTimeString('en-US'),
					orderStatus: order.orderStatus,
					user: { id: order.user.id },
					details: order.details,
				};
			});
		});
	}, [orders]);

	const getSubItems = (record) => {
		return record.details.map((detail) => {
			return {
				key: detail.id, // required by ant table
				productName: detail.product.name,
				size: detail.size.name,
				toppings: [...detail.toppings],
				quantity: detail.quantity,
				note: detail.note,
			};
		});
	};

	if (sessionStorage.getItem('starbucks-member') === null) {
		return (
			<div style={{ padding: '88px 8vw' }}>
				<Redirector subTitle='If you signed in, your previous orders will appear here...' />
			</div>
		);
	}
	return (
		<Content style={{ padding: '120px 8vw', minHeight: '60vh' }}>
			<Descriptions title='Order History' />
			<div className='overflow-x-auto'>
				<Spin spinning={orderLoading}>
					<Table
						columns={columns}
						expandable={{
							expandedRowRender: (record) => {
								return <Table columns={expandableColumns} dataSource={getSubItems(record)} pagination={false} />;
								// if you want to return a value by calling a function in brackets: {function(params)}
								// if you want to call a function in brackets: {() => function(params)} (errors in this case)
							},
						}}
						dataSource={tableItems}
						pagination={false}
					/>
				</Spin>
			</div>
		</Content>
	);
}

export default OrderHistory;
