import { useContext, createContext, useState, useMemo } from 'react';
import { SERVER_URL } from '../../constants';

const OrderHistoryContext = createContext();

export const useOrderHistory = () => useContext(OrderHistoryContext);

function OrderHistoryProvider({ children }) {
	const [orders, setOrders] = useState([]);
	const [orderLoading, setOrderLoading] = useState(true); // 'true' for first loading in 'useEffect'

	useMemo(() => {
		if (sessionStorage.getItem('starbucks-member') === null) {
			return;
		}
		let token = sessionStorage.getItem('starbucks-jwt');
		let userId = JSON.parse(sessionStorage.getItem('starbucks-member')).id;
		setOrderLoading(true);
		fetch(SERVER_URL + `/order/user=${userId}`, {
			headers: { Authorization: token },
		})
			.then((response) => response.json())
			.then(setOrders)
			.then(() => setOrderLoading(false));
	}, []);

	return <OrderHistoryContext.Provider value={{ orders, orderLoading }}>{children}</OrderHistoryContext.Provider>;
}

export default OrderHistoryProvider;
