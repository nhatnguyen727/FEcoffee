import { useContext, createContext, useState, useMemo, useEffect } from 'react';
import { SERVER_URL } from '../../constants';
import { useUsers } from './UserProvider';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

function ProductProvider({ children }) {
	const { selectedMenuClick } = useUsers();
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState();
	const [groupCategories, setGroupCategories] = useState([]);
	const [products, setProducts] = useState([]);
	const [errorMsg, setErrorMsg] = useState();
	const [dataChanged, setDataChanged] = useState(false);
	const [productLoading, setProductLoading] = useState(false);
	const [categoryLoading, setCategoryLoading] = useState(false);
	const [sizes, setSizes] = useState([]);
	const [toppings, setToppings] = useState([]);

	const getSelectedCategory = (id) => {
		setSelectedCategory(id);
		setProductLoading(true);
		setDataChanged(true);
	};

	// first loading
	useMemo(() => {
		setCategoryLoading(true);
		fetch(SERVER_URL + '/category')
			.then((response) => response.json())
			.then(async (result) => {
				let categories = await result.map((category) => {
					return {
						group: category.id < 7 ? 'Beverages' : 'Foods',
						...category,
					};
				});
				setCategories(categories);
				if (selectedMenuClick === 'beverages') {
					let group = result.filter((category) => category.id < 7);
					setGroupCategories(group);
					setSelectedCategory(group[0].id);
				}
				if (selectedMenuClick === 'foods') {
					let group = result.filter((category) => category.id >= 7);
					setGroupCategories(group);
					setSelectedCategory(group[0].id);
				}
			})
			.then(() => {
				fetch(SERVER_URL + '/size')
					.then((response) => response.json())
					.then(setSizes);
			})
			.then(() => {
				fetch(SERVER_URL + '/topping')
					.then((response) => response.json())
					.then(setToppings);
			})
			.then(() => setCategoryLoading(false))
			.then(() => setDataChanged(true))
			.then(() => setProductLoading(true));
	}, [selectedMenuClick]);

	useEffect(() => {
		if (dataChanged) {
			fetch(SERVER_URL + `/product/category=${selectedCategory}`)
				.then((response) => response.json())
				.then(setProducts)
				.then(() => setDataChanged(false))
				.then(() => setProductLoading(false));
		}
	}, [selectedCategory, dataChanged]);

	const deleteProducts = async (products) => {
		let token = sessionStorage.getItem('starbucks-admin-jwt');
		let urls = products.map((p) => SERVER_URL + `/admin/product/${p.id}`);
		setProductLoading(true);
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

	const addProduct = (product) => {
		let token = sessionStorage.getItem('starbucks-admin-jwt');
		setProductLoading(true);
		fetch(SERVER_URL + '/admin/product', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			body: JSON.stringify(product),
		})
			.then((response) => {
				if (response.status === 409) {
					return response.text();
				}
			})
			.then(setErrorMsg)
			.then(() => setDataChanged(true));
	};

	const updateProduct = (product) => {
		let token = sessionStorage.getItem('starbucks-admin-jwt');
		setProductLoading(true);
		fetch(SERVER_URL + `/admin/product/${product.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			body: JSON.stringify(product),
		})
			.then((response) => {
				// 403 forbidden (validation); 409 conflict (unique)
				if (response.status === 403 || response.status === 409) {
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
		<ProductContext.Provider
			value={{
				products,
				productLoading,
				categoryLoading,
				deleteProducts,
				addProduct,
				updateProduct,
				errorMsg,
				resetErrorMsg,
				categories,
				groupCategories,
				selectedCategory,
				getSelectedCategory,
				sizes,
				toppings,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
}

export default ProductProvider;
