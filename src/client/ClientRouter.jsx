import React from 'react';
// import 'antd/dist/antd.less';// there's an import for this in App.js outside
import { BackTop } from 'antd';
import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';
import AppHeader from './components/header/AppHeader';
import Footer from './components/footer/Footer';
import Landing from './components/landing/Landing';
import Featured from './components/featured/Featured';
import CartContainer from './components/cart/CartContainer';
import Checkout from './components/checkout/Checkout';
import OrderHistory from './components/history/OrderHistory';
import FavoriteRouter from './components/favorite/FavoriteRouter';
import MenuContainer from './components/menu/MenuContainer';
import Success from './components/checkout/Success';
import Login from './components/user/Login';
import SignUp from './components/user/SignUp';
import Profile from './components/profile/Profile';
import CategoryProvider from './components/app-context/CategoryProvider';
import CheckoutProvider from './components/app-context/CheckoutProvider';
import OrderHistoryProvider from './components/app-context/OrderHistoryProvider';
import UserProvider from './components/app-context/UserProvider';
import CartProvider from './components/app-context/CartProvider';
import ProfileProvider from './components/app-context/ProfileProvider';
import './AppClient.css';

function ClientRoter() {
	const { path } = useRouteMatch();
	const location = useLocation();
	const [backTopDisplay, setBackTopDisplay] = React.useState('inline');

	const handleBackTop = () => {
		if (backTopDisplay === 'inline') {
			setBackTopDisplay('none');
			document.body.style.overflow = 'hidden'; // disable scrolling when toggle menu is open
		}
		if (backTopDisplay === 'none') {
			setBackTopDisplay('inline');
			document.body.style.overflow = 'unset'; // enable scrolling back
		}
	};

	return (
		<UserProvider>
			<CartProvider>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					{!location.pathname.includes('/login') && !location.pathname.includes('/signUp') ? (
						<AppHeader handleBackTop={handleBackTop} />
					) : null}
					<Switch>
						{/* when we use useRouteMatch url/path, it will search inside this Route for the matching url/path,
							url/path of the nested node will be '${path}menu/nestedNodeName' */}
						<Route path={`${path}menu`}>
							<CategoryProvider>
								<MenuContainer />
							</CategoryProvider>
						</Route>
						<Route exact path={`${path}featured`} component={Featured} />
						<Route exact path={`${path}cart`} component={CartContainer} />
						<Route exact path={`${path}checkout`}>
							<CheckoutProvider>
								<Checkout />
							</CheckoutProvider>
						</Route>
						<Route exact path={`${path}history`}>
							<OrderHistoryProvider>
								<OrderHistory />
							</OrderHistoryProvider>
						</Route>
						<Route path={`${path}favorite`}>
							<FavoriteRouter />
						</Route>
						<Route exact path={`${path}success`} component={Success} />
						<Route exact path={`${path}login`} component={Login} />
						<Route exact path={`${path}signUp`} component={SignUp} />
						<Route path={`${path}profile`}>
							<ProfileProvider>
								<Profile />
							</ProfileProvider>
						</Route>
						<Route exact path={path} component={Landing} />
					</Switch>
					{!location.pathname.includes('/login') && !location.pathname.includes('/signUp') ? <Footer /> : null}
					{!location.pathname.includes('/product/name') ? (
						<BackTop style={{ display: backTopDisplay, marginRight: '-10px', marginBottom: '40px' }} />
					) : null}
				</div>
			</CartProvider>
		</UserProvider>
	);
}

export default ClientRoter;
