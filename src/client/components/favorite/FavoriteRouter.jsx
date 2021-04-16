import React from 'react';
import Detail from '../product/detail/Detail';
import DetailProvider from '../app-context/DetailProvider';
import FavoriteList from './FavoriteList';
import FavoriteProvider from '../app-context/FavoriteProvider';
import { useCart } from '../app-context/CartProvider';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

function FavoriteRouter() {
	const { path } = useRouteMatch();
	const { selectedProduct } = useCart();

	return (
		<div style={{ padding: '76px 8vw 80px 8vw' }}>
			<Switch>
				<Route path={`${path}/product/name=${selectedProduct.name}`}>
					<DetailProvider>
						<Detail />
					</DetailProvider>
				</Route>
				<Route path={`${path}/`}>
					<FavoriteProvider>
						<FavoriteList />
					</FavoriteProvider>
				</Route>
			</Switch>
		</div>
	);
}

export default FavoriteRouter;
