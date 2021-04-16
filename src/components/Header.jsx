import React from 'react';
import { Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useUsers } from './app-context/UserProvider';

const { SubMenu } = Menu;

function Header() {
	const { logout, profileChanged, notifyProfileChanges } = useUsers();
	const [currentUser, setCurrentUser] = React.useState(JSON.parse(sessionStorage.getItem('starbucks-admin')));

	React.useEffect(() => {
		if (profileChanged) {
			setCurrentUser(JSON.parse(sessionStorage.getItem('starbucks-admin')));
			notifyProfileChanges(false);
		}
	}, [profileChanged, notifyProfileChanges]);

	return (
		<Menu mode='horizontal' className='flex flex-row-reverse'>
			<SubMenu
				key='account'
				title={
					<>
						{currentUser !== undefined ? (
							<div className='flex items-center'>
								<img src={currentUser.photo} className='object-cover h-8 w-8 rounded-full mr-2' alt='' />
								{currentUser.username}
							</div>
						) : null}
					</>
				}
			>
				<Menu.Item key='login'>
					<Link to='/loginAdmin' onClick={logout} className='flex items-center'>
						<LogoutOutlined />
						<span>Logout</span>
					</Link>
				</Menu.Item>
			</SubMenu>
		</Menu>
	);
}

export default Header;
