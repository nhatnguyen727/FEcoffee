import React from 'react';
import { Layout, Menu } from 'antd';
import { DashboardOutlined } from '@ant-design/icons';
import { Backdrop, makeStyles } from '@material-ui/core';
import { IconFont } from './IconFont';
import { useUsers } from './app-context/UserProvider';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Header from './Header';
import SubRouter from './SubRouter';
import reactLogo from '../assets/react-logo.png';
import springLogo from '../assets/spring-logo.png';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

const useStyles = makeStyles(() => ({
	backdrop: {
		color: '#fff',
		zIndex: 2, // radio buttons in products is 1, this must be 2 to cover them buttons
	},
}));

function Container() {
	const classes = useStyles();
	const { url } = useRouteMatch();
	const history = useHistory();
	const { getSelectedMenuClick } = useUsers();
	const [collapsed, setCollapsed] = React.useState(true);
	const [collapsedWidth, setCollapsedWidth] = React.useState(0);
	const [logoDisplay, setLogoDisplay] = React.useState('none');

	const handleMenuClick = (key) => {
		getSelectedMenuClick(key);
		switch (key) {
			case 'dashboard':
				history.push(`${url}/dashboard`);
				break;
			case 'beverages':
				history.push(`${url}/products`);
				break;
			case 'foods':
				history.push(`${url}/products`);
				break;
			case 'orders':
				history.push(`${url}/orders`);
				break;
			case 'coupons':
				history.push(`${url}/coupons`);
				break;
			case 'users':
				history.push(`${url}/users`);
				break;
			case 'profile':
				history.push(`${url}/profile`);
				break;
			default:
				break;
		}
		if (!collapsed) {
			handleSiderCollapse(true, 'clickTrigger');
		}
	};

	const handleSiderCollapse = (collapsed, type) => {
		// there're two type: 'clickTrigger' and 'responsive', no need to set logo disappear on 'responsive' type
		if (collapsed && type === 'clickTrigger') {
			setCollapsed(true); // the sider still collapsible without this state. But we want it collapsed at the initial time, so we need a state for it
			setLogoDisplay('none');
		}
		if (!collapsed && type === 'clickTrigger') {
			setCollapsed(false);
			setLogoDisplay('unset');
		}
	};

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider
				theme='light'
				breakpoint='xs'
				onBreakpoint={(broken) => {
					broken ? setCollapsedWidth(0) : setCollapsedWidth(80);
				}}
				collapsedWidth={collapsedWidth}
				collapsible
				onCollapse={(collapsed, type) => {
					handleSiderCollapse(collapsed, type);
				}}
				collapsed={collapsed}
				zeroWidthTriggerStyle={{
					backgroundColor: 'green',
					boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19), 0 0 2px rgba(0, 0, 0, 0.07)',
				}}
				style={{
					boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19), 0 0 2px rgba(0, 0, 0, 0.07)',
					position: 'fixed',
					zIndex: 3, // backdrop is 2, so this must be 3
				}}
			>
				<div style={{ display: logoDisplay }}>
					<div className='flex items-center my-2 ml-1.5'>
						<img src={reactLogo} className='App-logo' alt='' />
						<img src={springLogo} className='App-logo-second' alt='' />
					</div>
				</div>
				<Menu defaultSelectedKeys={['0']} mode='inline' className='text-base h-screen'>
					<Menu.Item className='flex items-center' key='dashboard' onClick={() => handleMenuClick('dashboard')}>
						<DashboardOutlined />
						<span>Dashboard</span>
					</Menu.Item>
					<SubMenu
						key='products'
						title={
							<div className='flex items-center'>
								<IconFont type='icon-coffee' />
								<span>Products</span>
							</div>
						}
					>
						<Menu.Item className='text-base' key='beverages' onClick={() => handleMenuClick('beverages')}>
							Beverages
						</Menu.Item>
						<Menu.Item className='text-base' key='foods' onClick={() => handleMenuClick('foods')}>
							Foods
						</Menu.Item>
					</SubMenu>
					<Menu.Item className='flex items-center' key='orders' onClick={() => handleMenuClick('orders')}>
						<IconFont type='icon-order' />
						<span>Orders</span>
					</Menu.Item>
					<Menu.Item className='flex items-center' key='coupons' onClick={() => handleMenuClick('coupons')}>
						<IconFont type='icon-coupon-solid' />
						<span>Coupons</span>
					</Menu.Item>
					<Menu.Item className='flex items-center' key='users' onClick={() => handleMenuClick('users')}>
						<IconFont type='icon-users' />
						<span>Users</span>
					</Menu.Item>
					<Menu.Item className='flex items-center' key='profile' onClick={() => handleMenuClick('profile')}>
						<IconFont type='icon-setting' />
						<span>Profile</span>
					</Menu.Item>
				</Menu>
			</Sider>
			<Backdrop className={classes.backdrop} open={!collapsed} onClick={() => handleSiderCollapse(true, 'clickTrigger')} />
			<Layout>
				<Header />
				<Layout className='ml-0 xs:ml-20'>
					<SubRouter />
				</Layout>
			</Layout>
		</Layout>
	);
}

export default Container;
