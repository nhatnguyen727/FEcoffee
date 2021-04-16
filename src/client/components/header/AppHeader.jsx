import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Button, withStyles } from '@material-ui/core';
import { LogoutOutlined } from '@ant-design/icons';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import { useUser } from '../app-context/UserProvider';
import starbugsLogo from '../../assets/starbugs-logo.png';
import { IconFont } from '../../IconFont';
import ToggleMenu from './motion-toggle-menu/ToggleMenu';
import CustomToggleMenu from './CustomToggleMenu';
import './AppHeader.css';

const SubMenu = Menu.SubMenu;
const { Header } = Layout;

const SignInButton = withStyles(() => ({
	root: {
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 'bold',
		borderColor: 'black',
		borderRadius: '1.2rem',
		'&:hover': {
			color: '#00704A',
		},
	},
}))(Button);

const JoinButton = withStyles(() => ({
	root: {
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 'bold',
		borderColor: 'black',
		borderRadius: '1.2rem',
		width: 90,
		backgroundColor: '#27251F',
		color: 'white',
		'&:hover': {
			backgroundColor: '#007235',
		},
	},
}))(Button);

function AppHeader({ handleBackTop = (f) => f }) {
	const { url } = useRouteMatch();
	const location = useLocation();
	const history = useHistory();
	const { logout } = useUser();
	const [currentLocation, setCurrentLocation] = React.useState('home');

	React.useMemo(() => {
		let currentURL = location.pathname;
		switch (true) {
			case currentURL.startsWith('/menu', 0):
				setCurrentLocation('menu');
				break;
			case currentURL.startsWith('/featured', 0):
				setCurrentLocation('featured');
				break;
			case currentURL.startsWith('/history', 0):
				setCurrentLocation('history');
				break;
			case currentURL.startsWith('/favorite', 0):
				setCurrentLocation('favorite');
				break;
			case currentURL.startsWith('/cart', 0):
				setCurrentLocation('');
				break;
			case currentURL.startsWith('/checkout', 0):
				setCurrentLocation('');
				break;
			case currentURL.startsWith('/success', 0):
				setCurrentLocation('');
				break;
			case currentURL.startsWith('', 0):
				setCurrentLocation('home');
				break;
			default:
				break;
		}
	}, [location.pathname]);

	const makeNavToggleMenu = (toggle = (f) => f, opened, variants, secondaryVariants, handleBackTop = (f) => f) => {
		return (
			<CustomToggleMenu
				toggle={toggle}
				opened={opened}
				variants={variants}
				secondaryVariants={secondaryVariants}
				handleBackTop={handleBackTop}
			/>
		);
	};

	return (
		<>
			<Header className='styled__header'>
				<div className='container__logo'>
					<Link to=''>
						<img src={starbugsLogo} alt='' className='pos__logo' />
					</Link>
				</div>
				{sessionStorage.getItem('starbucks-member') === null ? (
					<div style={{ float: 'right', textAlign: 'center', margin: '8px 8vw 0 0' }}>
						<SignInButton variant='outlined' size='small' onClick={() => history.push(`${url}login`)} className='pos__btn'>
							Sign in
						</SignInButton>
						<JoinButton variant='outlined' size='small' onClick={() => history.push(`${url}signUp`)} className='pos__btn'>
							Join now
						</JoinButton>
					</div>
				) : null}
				<ToggleMenu makeNavToggleMenu={makeNavToggleMenu} handleBackTop={handleBackTop} />
				<Menu mode='horizontal' selectedKeys={[currentLocation]} style={{ primaryColor: '#237804', marginTop: 10 }}>
					<Menu.Item key='home' style={{ primaryColor: '#237804', marginLeft: 0 }} className='font__menu'>
						<Link to={`${url}`}>HOME</Link>
					</Menu.Item>
					<Menu.Item key='menu' className='font__menu'>
						<Link to={`${url}menu`}>MENU</Link>
					</Menu.Item>
					<Menu.Item key='featured' className='font__menu'>
						<Link to={`${url}featured`}>FEATURED</Link>
					</Menu.Item>
					{sessionStorage.getItem('starbucks-member') !== null ? (
						<>
							<Menu.Item key='history' className='font__menu'>
								<Link to={`${url}history`}>ORDER HISTORY</Link>
							</Menu.Item>

							<Menu.Item key='favorite' className='font__menu'>
								<Link to={`${url}favorite`}>FAVORITES</Link>
							</Menu.Item>
						</>
					) : null}

					{sessionStorage.getItem('starbucks-member') !== null ? (
						<SubMenu
							className='pos__link'
							style={{ marginRight: '8vw' }}
							title={
								<>
									<AccountCircleIcon style={{ verticalAlign: 'middle', marginRight: 6 }} />
									Account
								</>
							}
						>
							<Menu.Item key='cart'>
								<Link to={`${url}cart`} className='flex items-center'>
									<IconFont type='icon-bag' />
									<span>View Bag</span>
								</Link>
							</Menu.Item>
							<Menu.Item key='profile'>
								<Link to={`${url}profile`} className='flex items-center'>
									<UserOutlined />
									<span>Profile</span>
								</Link>
							</Menu.Item>
							<Menu.Divider />
							<Menu.Item key='logout'>
								<Link to={`${url}`} onClick={logout} className='flex items-center'>
									<LogoutOutlined />
									<span>Logout</span>
								</Link>
							</Menu.Item>
						</SubMenu>
					) : null}
					<SubMenu
						className='pos__link'
						style={{ marginRight: '4px' }}
						title={
							<>
								<LocationOnIcon style={{ verticalAlign: 'middle', gap: 2 }} />
								Find a store
							</>
						}
					></SubMenu>
				</Menu>
			</Header>
		</>
	);
}

export default AppHeader;
