import { useContext, createContext, useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { SERVER_URL } from '../../../constants';

const CategoryContext = createContext();

export const useCategories = () => useContext(CategoryContext);

function CategoryProvider({ children }) {
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState({ id: 0, name: '' });
	const [categoryLoading, setCategoryLoading] = useState(false);
	const { url } = useRouteMatch();
	const history = useHistory();

	const getSelectedCategory = (id, name) => {
		setSelectedCategory({ id: id, name: name });
		history.push(`${url}/category=${name}`);
		window.scrollTo(0, 0);
	};

	useEffect(() => {
		setCategoryLoading(true);
		fetch(SERVER_URL + '/category')
			.then((response) => response.json())
			.then(setCategories)
			.then(() => setCategoryLoading(false));
	}, []);

	return (
		<CategoryContext.Provider value={{ categories, selectedCategory, categoryLoading, getSelectedCategory }}>{children}</CategoryContext.Provider>
	);
}

export default CategoryProvider;
