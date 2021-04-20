import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Products from './products/Products';
import ProductProvider from './app-context/ProductProvider';
import Orders from './orders/Orders';
import OrderProvider from './app-context/OrderProvider';
import Coupons from './coupons/Coupons';
import CouponProvider from './app-context/CouponProvider';
import Users from './users/Users';
import Profile from './profile/Profile';
import ProfileProvider from './app-context/ProfileProvider';

function SubRouter() {
	const { path } = useRouteMatch();

	return (
		<Switch>
			<Route path={`${path}/dashboard`} component={Dashboard} />
			<Route path={`${path}/products`}>
				<ProductProvider>
					<Products />
				</ProductProvider>
			</Route>
			<Route path={`${path}/orders`}>
				<OrderProvider>
					<Orders />
				</OrderProvider>
			</Route>
			<Route path={`${path}/coupons`}>
				<CouponProvider>
					<Coupons />
				</CouponProvider>
			</Route>
			<Route path={`${path}/users`} component={Users} />
			<Route path={`${path}/profile`}>
				<ProfileProvider>
					<Profile />
				</ProfileProvider>
			</Route>
		</Switch>
	);
}

export default SubRouter;
