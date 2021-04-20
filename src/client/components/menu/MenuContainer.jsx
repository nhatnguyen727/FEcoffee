import React from 'react';
import { Layout, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import MenuSide from './MenuSide';
import MenuBody from './MenuBody';
import ProductRouter from '../product/ProductRouter';
import { useCategories } from '../app-context/CategoryProvider';
import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';

const { Sider, Content } = Layout;

function MenuContainer() {
	const { selectedCategory, categoryLoading } = useCategories();
	const { path } = useRouteMatch();
	const location = useLocation();
	const [spinTimer, setSpinTimer] = React.useState(20);
	const [spinMsg, setSpinMsg] = React.useState('');

	// using recursion
	const countdown = React.useCallback((value, fn, delay = 1000) => {
		fn(value); // callback function sets the current value. When countdown is invoked, the callback is invoked, which sets the current value
		// from here, countdown calls coundown inside (child countdown), every child countdown has its own callback function which sets the current value
		return value > 0 ? setTimeout(() => countdown(value - 1, fn), delay) : value;
	}, []);

	React.useMemo(() => {
		if (spinTimer === 20) {
			window.scrollTo(0, 0);
			countdown(spinTimer, setSpinTimer); // setSpinTimer is 'fn' in countdown function above
		}
	}, [countdown, spinTimer]);

	React.useEffect(() => {
		if (spinTimer === 0 && categoryLoading) {
			setSpinMsg(
				<>
					{}
				</>
			);
		}
	}, [spinTimer, categoryLoading]);

	const antIcon = React.useMemo(() => {
		return <LoadingOutlined style={{ fontSize: 24 }} spin />;
	}, []);

	return (
		<div style={{ padding: '76px 8vw 80px 8vw' }}>
			<Spin spinning={categoryLoading} tip={spinMsg} indicator={antIcon}>
				<Layout style={{ minHeight: '60vh' }} className='sm:flex-auto'>
					{location.pathname.includes('/product/name=') ? null : (
						<Sider style={{ backgroundColor: 'white' }} className='hidden sm:hidden md:inline'>
							<MenuSide />
						</Sider>
					)}
					<Content style={{ backgroundColor: 'white' }}>
						<Switch>
							<Route path={`${path}/category=${selectedCategory.name}`}>
								<ProductRouter />
							</Route>
							<Route path={`${path}/`}>
								<MenuBody />
							</Route>
						</Switch>
					</Content>
				</Layout>
			</Spin>
		</div>
	);
}

export default MenuContainer;
