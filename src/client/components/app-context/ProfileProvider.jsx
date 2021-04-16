import { useContext, createContext, useState, useMemo, useEffect } from 'react';
import { SERVER_URL } from '../../constants';
import { useUser } from './UserProvider';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

function ProfileProvider({ children }) {
	const { logout } = useUser();
	const [profile, setProfile] = useState();
	const [passwordChanged, setPasswordChanged] = useState(false);
	const [dataSaved, setDataSaved] = useState(false);
	const [profileLoading, setProfileLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState();

	// first loading
	useMemo(() => {
		if (sessionStorage.getItem('starbucks-member') === null) {
			return;
		}
		setProfileLoading(true);
		let token = sessionStorage.getItem('starbucks-jwt');
		let username = JSON.parse(sessionStorage.getItem('starbucks-member')).username;
		fetch(SERVER_URL + `/user/username=${username}`, {
			headers: { Authorization: token },
		})
			.then((response) => response.json())
			.then(setProfile)
			.then(() => setProfileLoading(false));
	}, []);

	const handleChange = (fieldName, value) => {
		setProfile({ ...profile, [fieldName]: value });
		if (fieldName === 'password') {
			setPasswordChanged(true);
		}
	};

	const updateUser = (user) => {
		setProfileLoading(true);
		let token = sessionStorage.getItem('starbucks-jwt');
		fetch(SERVER_URL + `/user/${user.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			body: JSON.stringify(user),
		})
			.then((response) => {
				// 403 forbidden (validation)
				if (response.status === 403) {
					return response.text();
				} else {
					// for updating new current user to the outside (photo and fullname displayed in the the side menu or on the header)
					sessionStorage.setItem('starbucks-member', JSON.stringify(user));
				}
			})
			.then(setErrorMsg)
			.then(() => setDataSaved(true))
			.then(() => setProfileLoading(false));
	};

	const setErrorMsgContent = (value) => {
		setErrorMsg(value); // set message content or we can set back to undefined (no errors)
	};

	useEffect(() => {
		if (dataSaved && errorMsg === undefined) {
			if (passwordChanged) {
				logout();
			}
		}
	}, [passwordChanged, dataSaved, errorMsg, logout]);

	useEffect(() => {
		if (dataSaved) {
			setDataSaved(false); // set back to 'false'
		}
	}, [dataSaved]);

	return (
		<ProfileContext.Provider value={{ profile, handleChange, updateUser, profileLoading, errorMsg, setErrorMsgContent }}>
			{children}
		</ProfileContext.Provider>
	);
}

export default ProfileProvider;
