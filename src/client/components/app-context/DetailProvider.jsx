import { useContext, createContext, useState, useMemo, useEffect } from 'react';
import { v4 } from 'uuid';
import { useCart } from './CartProvider';
import { SERVER_URL } from '../../../constants';

const DetailContext = createContext();
export const useDetail = () => useContext(DetailContext);

function DetaiProvider({ children }) {
	const { selectedProduct } = useCart();
	const [detail, setDetail] = useState();
	const [detailLoading, setDetailLoading] = useState(false);
	const [priceBySize, setPriceBySize] = useState(0);
	const [toppingsTotal, setToppingsTotal] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [total, setTotal] = useState(0);
	const { addCartItems } = useCart();

	const item = useMemo(() => {
		if (selectedProduct.id > 0) {
			return {
				id: 0,
				product: { id: selectedProduct.id, name: selectedProduct.name },
				size: { id: 2, name: 'Medium' },
				quantity: 1,
				note: '',
				toppings: [],
				price: 0,
				toppingsTotal: 0,
				total: 0,
			};
		}
	}, [selectedProduct]);

	useMemo(() => {
		setDetailLoading(true);
		fetch(SERVER_URL + `/product/${selectedProduct.id}`)
			.then((response) => response.json())
			.then(setDetail)
			.then(() => setDetailLoading(false));
	}, [selectedProduct.id]);

	useEffect(() => {
		if (detail !== undefined) {
			setPriceBySize(detail.price); // set original price for calculating
		}
	}, [detail]);

	const getQuantity = (qty) => {
		setQuantity(qty);
	};

	const getToppings = (checkedValues) => {
		item.toppings = detail.toppings.filter((topping) => checkedValues.indexOf(topping.id) !== -1);
	};

	const getNote = (event) => {
		item.note = event.target.value;
	};

	const prepareToAddItem = () => {
		item.id = v4(); // for display items in cart, it needs unique value for deleting exactly item in cart (localStorage)
		item.product.id = detail.id;
		item.product.name = detail.name;
		item.quantity = quantity;
		item.price = priceBySize;
		item.toppingsTotal = toppingsTotal;
		item.total = total;
		addCartItems(item);
	};

	const calculatePriceBySize = (value) => {
		if (value === 'Large') {
			// ***Note: toFixed converts float to string, you have to convert it back to float to use it later (calculate total)
			setPriceBySize(parseFloat((detail.price + (detail.price * 30) / 100).toFixed(2)));
			item.size.id = 1;
			item.size.name = 'Large';
		}
		if (value === 'Small') {
			setPriceBySize(parseFloat((detail.price - (detail.price * 30) / 100).toFixed(2)));
			item.size.id = 3;
			item.size.name = 'Small';
		}
		if (value === 'Medium') {
			setPriceBySize(detail.price);
			item.size.id = 2;
			item.size.name = 'Medium';
		}
	};

	const calculateToppingsTotal = (event, price) => {
		if (event.target.checked) {
			setToppingsTotal(parseFloat((toppingsTotal + price).toFixed(2)));
		} else {
			setToppingsTotal(parseFloat((toppingsTotal - price).toFixed(2)));
		}
	};

	useEffect(() => {
		if (selectedProduct.id > 0) {
			setTotal(parseFloat(((priceBySize + toppingsTotal) * quantity).toFixed(2)));
		}
	}, [selectedProduct.id, priceBySize, toppingsTotal, quantity]);

	return (
		<DetailContext.Provider
			value={{
				detail,
				detailLoading,
				priceBySize,
				toppingsTotal,
				total,
				prepareToAddItem,
				calculatePriceBySize,
				calculateToppingsTotal,
				getQuantity,
				getToppings,
				getNote,
			}}
		>
			{children}
		</DetailContext.Provider>
	);
}

export default DetaiProvider;
