import { useContext, createContext, useState, useEffect } from 'react';
import { message } from 'antd';
import { useHistory } from 'react-router-dom';
import Tada from 'react-reveal/Tada';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useCart } from './CartProvider';
import { SERVER_URL } from '../../../constants';

const CheckoutContext = createContext();

export const useCheckout = () => useContext(CheckoutContext);

function CheckoutProvider({ children }) {
	const { cartItems, removeAllCartItems } = useCart();
	const [info, setInfo] = useState({});
	const [order, setOrder] = useState();
	const [coupon, setCoupon] = useState(0);
	const [loadingSuccess, setLoadingSuccess] = useState(false);
	const history = useHistory();

	useEffect(() => {
		let user = !sessionStorage.getItem('starbucks-member') ? {} : JSON.parse(sessionStorage.getItem('starbucks-member'));
		setInfo({ recipientName: user.fullname, orderAddress: user.address, phone: user.phone, user: { id: user.id } });
	}, []);

	const saveInfo = (values) => {
		setInfo({ ...values, user: info.user });
		message.success({
			content: <Tada left>Delivery information changed!</Tada>,
			style: {
				marginTop: '20vh',
				fontSize: 16,
			},
			icon: <CheckCircleIcon style={{ color: '#73d13d' }} />,
		});
	};

	const saveCoupon = () => {
		setCoupon(0);
	};

	const calculateSubtotal = () => {
		let subtotal = 0;
		cartItems.forEach((item) => {
			subtotal += item.total;
		});
		return parseFloat(subtotal.toFixed(2));
	};

	const convertCartToOrderDetails = () => {
		return cartItems.map((item) => {
			return {
				quantity: item.quantity,
				note: item.note,
				size: { id: item.size.id },
				product: { id: item.product.id },
				toppings: item.toppings.map((topping) => {
					return { id: topping.id };
				}),
			};
		});
	};

	const saveOrder = () => {
		setLoadingSuccess(true);
		setTimeout(() => {
			setLoadingSuccess(false);
			setOrder({ ...info, details: convertCartToOrderDetails() });
			removeAllCartItems();
			history.push('/success');
		}, 1600);
	};

	useEffect(() => {
		if (order !== undefined) {
			const token = sessionStorage.getItem('starbucks-jwt');
			fetch(SERVER_URL + '/order', {
				method: 'POST',
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(order),
			});
		}
	}, [order]);

	useEffect(() => {
		if (cartItems.length === 0 && order === undefined) {
			history.push('/home');
		}
	}, [cartItems, order, history]);

	return (
		<CheckoutContext.Provider value={{ info, coupon, cartItems, loadingSuccess, saveInfo, calculateSubtotal, saveCoupon, saveOrder }}>
			{children}
		</CheckoutContext.Provider>
	);
}

export default CheckoutProvider;
