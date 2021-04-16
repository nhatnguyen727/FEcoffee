import { useContext, createContext, useState, useEffect, useMemo } from 'react';
import { useCategories } from './CategoryProvider';
import { SERVER_URL } from '../../../constants';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

function ProductProvider({ children }) {
	const { selectedCategory } = useCategories();
	const [products, setProducts] = useState([]);
	const [productLoading, setProductLoading] = useState(false);
	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		setProductLoading(true);
		fetch(SERVER_URL + `/product/category=${selectedCategory.id}`)
			.then((response) => response.json())
			.then(setProducts)
			.then(() => setProductLoading(false));
	}, [selectedCategory.id]);

	useMemo(() => {
		if (localStorage.getItem('starbucks-favorite') === null) {
			localStorage.setItem('starbucks-favorite', JSON.stringify([])); // initial favorites in localStorage
		}
		if (sessionStorage.getItem('starbucks-member') !== null) {
			let userId = JSON.parse(sessionStorage.getItem('starbucks-member')).id;
			const token = sessionStorage.getItem('starbucks-jwt');
			fetch(SERVER_URL + `/favorite/user=${userId}`, {
				headers: { Authorization: token },
			})
				.then((response) => response.json())
				.then((result) => {
					setFavorites(result.products);
					localStorage.setItem('starbucks-favorite', JSON.stringify(result.products));
				});
		}
	}, []);

	const updateFavorite = (id, favoriteTicked) => {
		// for animation of favorite button works smooth, we don't use state here because it causes rendering the product list,
		// therefore, it makes the animation delayed
		let favoritesLocal = localStorage.getItem('starbucks-favorite') !== [] ? JSON.parse(localStorage.getItem('starbucks-favorite')) : [];
		// update in localStorage
		favoriteTicked
			? localStorage.setItem('starbucks-favorite', JSON.stringify([...favoritesLocal, { id: id }]))
			: localStorage.setItem('starbucks-favorite', JSON.stringify(favoritesLocal.filter((fav) => fav.id !== id)));
		// update in database
		if (sessionStorage.getItem('starbucks-member') !== null) {
			let userId = JSON.parse(sessionStorage.getItem('starbucks-member')).id;
			let favProducts = favoriteTicked
				? { id: userId, products: [...favoritesLocal, { id: id }] }
				: { id: userId, products: favoritesLocal.filter((fav) => fav.id !== id) };
			const token = sessionStorage.getItem('starbucks-jwt');
			fetch(SERVER_URL + `/favorite/user=${userId}`, {
				method: 'PUT',
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(favProducts),
			});
		}
	};

	return <ProductContext.Provider value={{ products, productLoading, favorites, updateFavorite }}>{children}</ProductContext.Provider>;
}

export default ProductProvider;
