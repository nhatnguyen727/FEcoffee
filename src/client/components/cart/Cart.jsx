import React from 'react';
import { Table, Button, Tag, Popconfirm, Typography, Descriptions } from 'antd';
import { useCart } from '../app-context/CartProvider';

const { Text } = Typography;

function Cart() {
	const { cartItems, removeCartItem } = useCart();
	const [tableItems, setTableItems] = React.useState([]);

	const columns = React.useMemo(
		() => [
			{
				title: 'Item',
				dataIndex: 'item',
				key: 'item',
			},
			{
				title: 'Price$',
				dataIndex: 'price',
				key: 'price',
			},

			{
				title: 'Toppings total',
				dataIndex: 'toppingsTotal',
				key: 'toppingsTotal',
			},
			{
				title: 'Quantity',
				dataIndex: 'quantity',
				key: 'quantity',
			},
			{
				title: 'Total',
				dataIndex: 'total',
				key: 'total',
			},
			{
				title: 'Action',
				dataIndex: 'action',
				key: 'action',
				render: (_, record) => (
					<Popconfirm title='Sure to delete?' onConfirm={() => removeCartItem(record.key)}>
						<Button danger style={{ width: 80 }}>
							Delete
						</Button>
					</Popconfirm>
				),
			},
		],
		[removeCartItem]
	);

	const expandableColumns = React.useMemo(
		() => [
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
				title: 'Note',
				dataIndex: 'note',
				key: 'note',
			},
		],
		[]
	);

	React.useEffect(() => {
		setTableItems(() => {
			return cartItems.map((cartItem) => {
				return {
					key: cartItem.id, // required by ant table
					item: cartItem.product.name,
					price: cartItem.price,
					quantity: cartItem.quantity,
					total: cartItem.total,
					note: cartItem.note,
					toppings: [...cartItem.toppings],
					toppingsTotal: cartItem.toppingsTotal,
				};
			});
		});
	}, [cartItems]);

	const getSubItems = (record) => {
		return [
			{
				key: record.key, // required by ant table
				note: record.note,
				toppings: [...record.toppings],
			},
		];
	};

	return (
		<>
			<Descriptions title='Cart Items' />
			<div className='overflow-x-auto'>
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
					summary={(pageData) => {
						let totalItemPrice = 0.0;
						let totalToppingsPrice = 0.0;
						let totalQty = 0;
						let totals = 0.0;

						pageData.forEach(({ price, toppingsTotal, quantity, total }) => {
							totalItemPrice += price;
							totalToppingsPrice += toppingsTotal;
							totalQty += quantity;
							totals += total;
						});
						return (
							<>
								<Table.Summary.Row>
									<Table.Summary.Cell colSpan={2} />
									<Table.Summary.Cell>
										<Text strong={true}>${totalItemPrice.toFixed(2)}</Text>
									</Table.Summary.Cell>
									<Table.Summary.Cell>
										<Text strong={true}>${totalToppingsPrice.toFixed(2)}</Text>
									</Table.Summary.Cell>
									<Table.Summary.Cell>
										<Text strong={true}>{totalQty}</Text>
									</Table.Summary.Cell>
									<Table.Summary.Cell colSpan={2}>
										<Text mark strong={true}>
											${totals.toFixed(2)}
										</Text>
									</Table.Summary.Cell>
								</Table.Summary.Row>
							</>
						);
					}}
				/>
			</div>
		</>
	);
}

export default Cart;
