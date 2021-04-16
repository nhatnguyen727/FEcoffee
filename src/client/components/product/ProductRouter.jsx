import React from 'react';
import Detail from './detail/Detail';
import DetailProvider from '../app-context/DetailProvider';
import ProductList from './ProductList';
import ProductProvider from '../app-context/ProductProvider';
import { useCart } from '../app-context/CartProvider';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

function ProductRouter() {
	const { path } = useRouteMatch();
	const { selectedProduct } = useCart();

	return (
		<Switch>
			<Route path={`${path}/product/name=${selectedProduct.name}`}>
				<DetailProvider>
					<Detail />
				</DetailProvider>
			</Route>
			<Route path={`${path}/`}>
				<ProductProvider>
					<ProductList />
				</ProductProvider>
			</Route>
		</Switch>
	);
}

export default ProductRouter;
