import { useContext, createContext, useState, useMemo, useEffect } from 'react';
import { SERVER_URL } from '../../constants';

const CouponContext = createContext();

export const useCoupons = () => useContext(CouponContext);

function CouponProvider({ children }) {
	const [coupons, setCoupons] = useState([]);
	const [products, setProducts] = useState();
	const [errorMsg, setErrorMsg] = useState();
	const [dataChanged, setDataChanged] = useState(false); // 'true' for first loading in 'useEffect'
	const [couponLoading, setCouponLoading] = useState(false); // 'true' for first loading in 'useEffect'

	// this promise loads all products for selecting, it will take longer waiting than others
	useMemo(() => {
		setCouponLoading(true);
		fetch(SERVER_URL + `/product`)
			.then((response) => response.json())
			.then(setProducts)
			.then(() =>
				fetch(SERVER_URL + `/coupon`)
					.then((response) => response.json())
					.then(setCoupons)
					.then(() => setCouponLoading(false))
			);
	}, []);

	useEffect(() => {
		if (dataChanged) {
			fetch(SERVER_URL + `/coupon`)
				.then((response) => response.json())
				.then(setCoupons)
				.then(() => setDataChanged(false))
				.then(() => setCouponLoading(false));
		}
	}, [dataChanged]);

	const deleteCoupons = async (coupons) => {
		const token = sessionStorage.getItem('starbucks-admin-jwt');
		let urls = coupons.map((o) => SERVER_URL + `/admin/coupon/${o.id}`);
		setCouponLoading(true);
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

	// no need adding coupon
	const addCoupon = (coupon) => {
		let token = sessionStorage.getItem('starbucks-admin-jwt');
		setCouponLoading(true);
		fetch(SERVER_URL + '/admin/coupon', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			body: JSON.stringify(coupon),
		})
			.then((response) => {
				if (response.status === 409) {
					return response.text();
				}
			})
			.then(setErrorMsg)
			.then(() => setDataChanged(true));
	};

	const updateCoupon = (coupon) => {
		const token = sessionStorage.getItem('starbucks-admin-jwt');
		setCouponLoading(true);
		fetch(SERVER_URL + `/admin/coupon/${coupon.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			body: JSON.stringify(coupon),
		})
			.then((response) => {
				// 403 forbidden (validation)
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
		<CouponContext.Provider value={{ coupons, products, couponLoading, deleteCoupons, addCoupon, updateCoupon, errorMsg, resetErrorMsg }}>
			{children}
		</CouponContext.Provider>
	);
}

export default CouponProvider;
