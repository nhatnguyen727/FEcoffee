import { useContext, createContext, useState, useMemo, useEffect } from 'react';
import { SERVER_URL } from '../../constants';
import { useHistory } from 'react-router-dom';

const UserContext = createContext();

export const useUsers = () => useContext(UserContext);

function UserProvider({ children }) {
	const history = useHistory();
	const [selectedMenuClick, setSelectedMenuClick] = useState('beverages'); // if you set empty string here, it will failed when you try to refresh the page
	const [roles, setRoles] = useState([]);
	const [users, setUsers] = useState([]);
	const [dataChanged, setDataChanged] = useState(false);
	const [errorMsg, setErrorMsg] = useState();
	const [userLoading, setUserLoading] = useState(false);
	const [doorOpened, setDoorOpened] = useState(false); // for checking role admin or member
	const [profileChanged, setProfileChanged] = useState(false);

	const getSelectedMenuClick = (key) => {
		setSelectedMenuClick(key);
	};

	const notifyProfileChanges = (bool) => {
		setProfileChanged(bool);
	};

	useMemo(() => {
		// prevent loading if 'users' in the side menu not be clicked
		if (selectedMenuClick !== 'users') {
			return;
		}
		let token = sessionStorage.getItem('starbucks-admin-jwt');
		setUserLoading(true);
		fetch(SERVER_URL + '/admin/role', {
			headers: { Authorization: token },
		})
			.then((response) => response.json())
			.then(setRoles)
			.then(() =>
				fetch(SERVER_URL + '/admin/user', {
					headers: { Authorization: token },
				})
					.then((response) => response.json())
					.then((result) => result.filter((user) => user.id !== JSON.parse(sessionStorage.getItem('starbucks-admin')).id))
					.then(setUsers)
					.then(() => setUserLoading(false))
			);
	}, [selectedMenuClick]);

	const login = (values) => {
		setUserLoading(true);
		fetch(SERVER_URL + '/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(values),
		})
			.then((response) => {
				if (response.status !== 200) {
					setErrorMsg('Username or password is incorrect!');
					return null;
				}
				sessionStorage.setItem('starbucks-admin-jwt', response.headers.get('Authorization'));
				return response.json();
			})
			// 'user' is returned from the previous the promise 'response.json()'... we can name it whatever we want
			.then((user) => {
				if (user !== null) {
					if (user.role.id === 1) {
						sessionStorage.setItem('starbucks-admin', JSON.stringify(user));
						setDoorOpened(true);
					} else {
						setErrorMsg('Username or password is incorrect!');
					}
				}
			})
			.then(() => setUserLoading(false));
	};

	useEffect(() => {
		if (!doorOpened) {
			return;
		}
		if (sessionStorage.getItem('starbucks-admin') !== null) {
			history.push('/admin/dashboard');
			setDoorOpened(false);
			if (errorMsg !== undefined) {
				setErrorMsg(); // set back to undefined for using in the 'Users' table
			}
		}
	}, [doorOpened, history, errorMsg]);

	const logout = () => {
		sessionStorage.removeItem('starbucks-admin-jwt');
		sessionStorage.removeItem('starbucks-admin');
		history.push('/loginAdmin');
	};

	const deleteUsers = async (users) => {
		let token = sessionStorage.getItem('starbucks-admin-jwt');
		let urls = users.map((user) => SERVER_URL + `/admin/user/${user.id}`);
		setUserLoading(true);
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

	const addUser = (user) => {
		let token = sessionStorage.getItem('starbucks-admin-jwt');
		setUserLoading(true);
		fetch(SERVER_URL + '/admin/user/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			body: JSON.stringify(user),
		})
			.then((response) => {
				if (response.status === 409) {
					return response.text();
				}
			})
			.then(setErrorMsg)
			.then(() => setDataChanged(true));
	};

	const updateUser = (user) => {
		let token = sessionStorage.getItem('starbucks-admin-jwt');
		setUserLoading(true);
		fetch(SERVER_URL + `/admin/user/${user.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			body: JSON.stringify(user),
		})
			.then((response) => {
				// 403 forbidden (validation); 409 conflict (unique)
				if (response.status === 403 || response.status === 409) {
					return response.text();
				}
			})
			.then(setErrorMsg)
			.then(() => setDataChanged(true));
	};

	useEffect(() => {
		// prevent loading when user is outside of 'users' scope components (because UserProvider wraps the container)
		if (dataChanged) {
			let token = sessionStorage.getItem('starbucks-admin-jwt');
			fetch(SERVER_URL + '/admin/user', {
				headers: { Authorization: token },
			})
				.then((response) => response.json())
				.then((result) => result.filter((user) => user.id !== JSON.parse(sessionStorage.getItem('starbucks-admin')).id))
				.then(setUsers)
				.then(() => setDataChanged(false))
				.then(() => setUserLoading(false));
		}
	}, [dataChanged]);

	const resetErrorMsg = () => {
		setErrorMsg(); // set back to undefined (no errors)
	};

	return (
		<UserContext.Provider
			value={{
				roles,
				users,
				userLoading,
				login,
				logout,
				deleteUsers,
				addUser,
				updateUser,
				errorMsg,
				resetErrorMsg,
				selectedMenuClick,
				getSelectedMenuClick,
				profileChanged,
				notifyProfileChanges,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}

export default UserProvider;
