import { useContext, createContext, useState, useMemo, useEffect } from 'react';
import { SERVER_URL } from '../../constants';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

function OrderProvider({ children }) {
	const [orders, setOrders] = useState([]);
	const [errorMsg, setErrorMsg] = useState();
	const [dataChanged, setDataChanged] = useState(true); // 'true' for first loading in 'useEffect'
	const [orderLoading, setOrderLoading] = useState(true); // 'true' for first loading in 'useEffect'
	const [sizes, setSizes] = useState([]);
	const [toppings, setToppings] = useState([]);

	// first loading
	useMemo(() => {
		fetch(SERVER_URL + '/size')
			.then((response) => response.json())
			.then(setSizes)
			.then(() => {
				fetch(SERVER_URL + '/topping')
					.then((response) => response.json())
					.then(setToppings);
			});
	}, []);

	useEffect(() => {
		if (dataChanged) {
			let token = sessionStorage.getItem('starbucks-admin-jwt');
			fetch(SERVER_URL + `/admin/order`, {
				headers: { Authorization: token },
			})
				.then((response) => response.json())
				.then(setOrders)
				.then(() => setDataChanged(false))
				.then(() => setOrderLoading(false));
		}
	}, [dataChanged]);

	const deleteOrders = async (orders) => {
		const token = sessionStorage.getItem('starbucks-admin-jwt');
		let urls = orders.map((o) => SERVER_URL + `/admin/order/${o.id}`);
		setOrderLoading(true);
		await Promise.all(
			urls.map((url) =>
				fetch(url, {
					method: 'DELETE',
					headers: { Authorization: token },
				})
			)
		);
		setDataChanged(true);
	};

	// no need adding order
	const addOrder = () => {
		return null;
	};

	const updateOrder = (order) => {
		const token = sessionStorage.getItem('starbucks-admin-jwt');
		setOrderLoading(true);
		fetch(SERVER_URL + `/admin/order/${order.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			body: JSON.stringify(order),
		})
			.then((response) => {
				// 403 forbidden (validation)
				if (response.status === 403) {
					return response.text();
				}
			})
			.then(setErrorMsg)
			.then(() => setDataChanged(true));
	};

	const resetErrorMsg = () => {
		setErrorMsg(); // set back to undefined (no errors)
	};

	return (
		<OrderContext.Provider value={{ orders, orderLoading, deleteOrders, addOrder, updateOrder, errorMsg, resetErrorMsg, sizes, toppings }}>
			{children}
		</OrderContext.Provider>
	);
}

export default OrderProvider;
