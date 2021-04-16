import { useContext, createContext, useState, useEffect, useCallback } from 'react';
import { SERVER_URL } from '../../constants';
import { useHistory } from 'react-router-dom';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

function UserProvider({ children }) {
	const history = useHistory();
	const [user, setUser] = useState({ username: '', password: '' });
	const [userLoading, setUserLoading] = useState(false);
	const [attempRegister, setAttempRegister] = useState(false);
	const [errorMsg, setErrorMsg] = useState();

	const signUp = (userInfo) => {
		setUserLoading(true);
		setUser({ username: userInfo.username, password: userInfo.password });
		fetch(SERVER_URL + '/user/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userInfo),
		})
			.then((response) => {
				if (response.status === 409) {
					return response.text();
				}
			})
			.then(setErrorMsg)
			.then(() => setAttempRegister(true))
			.then(() => setUserLoading(false));
	};

	const login = useCallback(
		(userInfo) => {
			setUserLoading(true);
			fetch(SERVER_URL + '/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(userInfo),
			})
				.then((response) => {
					if (response.status !== 200) {
						setErrorMsg('Username or password is incorrect!');
						return null;
					}
					sessionStorage.setItem('starbucks-jwt', response.headers.get('Authorization'));
					return response.json();
				})
				// 'user' is returned from the previous the promise 'response.json()'... we can name it whatever we want
				.then((user) => {
					if (user !== null) {
						sessionStorage.setItem('starbucks-member', JSON.stringify(user));
						history.push('');
					}
				})
				.then(() => setUserLoading(false));
		},
		[history]
	);

	useEffect(() => {
		if (attempRegister) {
			if (errorMsg === undefined) {
				login(user);
			}
			setAttempRegister(false);
		}
	}, [attempRegister, errorMsg, login, user]);

	const logout = () => {
		sessionStorage.removeItem('starbucks-jwt');
		sessionStorage.removeItem('starbucks-member');
		history.push('');
	};

	const resetErrorMsg = () => {
		setErrorMsg(); // set back to undefined (no errors)
	};

	return <UserContext.Provider value={{ signUp, login, logout, userLoading, errorMsg, resetErrorMsg }}>{children}</UserContext.Provider>;
}

export default UserProvider;
