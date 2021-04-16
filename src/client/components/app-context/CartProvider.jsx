import React from 'react';

const CartContext = React.createContext();

export const useCart = () => React.useContext(CartContext);

function CartProvider({ children }) {
	const [cartItems, setCartItems] = React.useState(!localStorage.getItem('starbucks-bag') ? [] : JSON.parse(localStorage.getItem('starbucks-bag')));
	const [selectedProduct, setSelectedProduct] = React.useState({ id: 0, name: '' });
	const [productAdded, setProductAdded] = React.useState('');
	const [openTooltip, setOpenTooltip] = React.useState(false);

	const getSelectedProduct = (id, name) => {
		setSelectedProduct({ id: id, name: name });
	};

	const addCartItems = (item) => {
		// console.log(item);
		const itemCheck = cartItems.find((items) => JSON.stringify(items.product) === JSON.stringify(item.product) && JSON.stringify(items.size) === JSON.stringify(item.size) && JSON.stringify(items.note) === JSON.stringify(item.note))
		if(itemCheck){
			// itemCheck.quality
			itemCheck.quantity+=item.quantity;
			
		}else{
			setCartItems([...cartItems, { ...item, product: { ...item.product }, size: { ...item.size } }]);
		}
		
		setProductAdded(item.product.name);
		console.log(cartItems)
	};

	const removeCartItem = (id) => {
		setCartItems(cartItems.filter((item) => item.id !== id));
	};

	const removeAllCartItems = () => {
		setCartItems([]);
	};

	React.useEffect(() => {
		localStorage.setItem('starbucks-bag', JSON.stringify(cartItems));
	}, [cartItems]);

	React.useEffect(() => {
		if (productAdded === '') {
			return;
		}
		setOpenTooltip(true);
		setTimeout(() => {
			setOpenTooltip(false);
			setTimeout(() => {
				setProductAdded('');
			}, 200); // wait for Tooltip to disappear, if not waiting, it will render an empty message before setOpenTooltip(false) takes effect
		}, 2000);
	}, [productAdded]);

	return (
		<CartContext.Provider
			value={{
				cartItems,
				addCartItems,
				removeCartItem,
				removeAllCartItems,
				getSelectedProduct,
				selectedProduct,
				productAdded,
				openTooltip,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export default CartProvider;
