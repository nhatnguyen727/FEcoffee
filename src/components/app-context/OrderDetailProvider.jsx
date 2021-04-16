import { useContext, createContext, useState, useEffect } from 'react';
import { SERVER_URL } from '../../constants';

const DetailContext = createContext();

export const useOrderDetails = () => useContext(DetailContext);

function OrderDetailProvider({ children }) {
	const [orderDetails, setOrderDetails] = useState([]);
	const [errorMsg, setErrorMsg] = useState();
	const [dataChanged, setDataChanged] = useState(true); // 'true' for first loading in 'useEffect'
	const [detailLoading, setDetailLoading] = useState(true); // 'true' for first loading in 'useEffect'

	useEffect(() => {
		if (dataChanged) {
			let token = sessionStorage.getItem('starbucks-admin-jwt');
			fetch(SERVER_URL + `/detail/order=${children.props.id}`, {
				headers: { Authorization: token },
			})
				.then((response) => response.json())
				.then(setOrderDetails)
				.then(() => setDataChanged(false))
				.then(() => setDetailLoading(false));
		}
	}, [dataChanged, children.props.id]);

	const deleteDetails = async (details) => {
		const token = sessionStorage.getItem('starbucks-admin-jwt');
		let urls = details.map((d) => SERVER_URL + `/admin/detail/${d.id}`);
		setDetailLoading(true);
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
	const addDetail = () => {
		return null;
	};

	const updateDetail = (detail) => {
		const token = sessionStorage.getItem('starbucks-admin-jwt');
		setDetailLoading(true);
		fetch(SERVER_URL + `/admin/detail/${detail.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			body: JSON.stringify(detail),
		}).then(() => setDataChanged(true));
	};

	// declare for passing to table (required), but no use because there's no validation in the back-end
	const resetErrorMsg = () => {
		setErrorMsg(); // set back to undefined (no errors)
	};

	return (
		<DetailContext.Provider value={{ orderDetails, detailLoading, deleteDetails, addDetail, updateDetail, errorMsg, resetErrorMsg }}>
			{children}
		</DetailContext.Provider>
	);
}

export default OrderDetailProvider;
