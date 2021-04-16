import { useContext, createContext, useState, useCallback, useMemo, useEffect } from 'react';
import { SERVER_URL } from '../../../constants';

const FavoriteContext = createContext();

export const useFavorites = () => useContext(FavoriteContext);

function FavoriteProvider({ children }) {
	const [favLoading, setFavLoading] = useState(false);
	const [favorites, setFavorites] = useState([]);
	const [dataChanged, setDataChanged] = useState(false);

	const refreshPage = useCallback(() => {
		if (sessionStorage.getItem('starbucks-member') !== null) {
			setFavLoading(true);
			let userId = JSON.parse(sessionStorage.getItem('starbucks-member')).id;
			const token = sessionStorage.getItem('starbucks-jwt');
			fetch(SERVER_URL + `/favorite/user=${userId}`, {
				headers: { Authorization: token },
			})
				.then((response) => response.json())
				.then((result) => {
					setFavorites(result.products);
					localStorage.setItem('starbucks-favorite', JSON.stringify(result.products));
				})
				.then(() => setFavLoading(false));
		}
	}, []);

	useMemo(() => {
		refreshPage();
	}, [refreshPage]);

	const updateFavorite = (id) => {
		// for animation of favorite button works smooth, we don't use state here because it causes rendering the product list,
		// therefore, it makes the animation delayed
		let favoritesLocal = localStorage.getItem('starbucks-favorite') !== [] ? JSON.parse(localStorage.getItem('starbucks-favorite')) : [];
		// update in localStorage
		localStorage.setItem('starbucks-favorite', JSON.stringify(favoritesLocal.filter((fav) => fav.id !== id)));
		// update in database
		if (sessionStorage.getItem('starbucks-member') !== null) {
			let userId = JSON.parse(sessionStorage.getItem('starbucks-member')).id;
			let favProducts = { id: userId, products: favoritesLocal.filter((fav) => fav.id !== id) };
			const token = sessionStorage.getItem('starbucks-jwt');
			fetch(SERVER_URL + `/favorite/user=${userId}`, {
				method: 'PUT',
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(favProducts),
			}).then(() => setDataChanged(true));
		}
	};

	useEffect(() => {
		if (dataChanged) {
			refreshPage();
			setDataChanged(false); // reset back to initial value
		}
	}, [dataChanged, refreshPage]);

	return <FavoriteContext.Provider value={{ favorites, favLoading, updateFavorite }}>{children}</FavoriteContext.Provider>;
}

export default FavoriteProvider;
