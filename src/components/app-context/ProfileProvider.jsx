import { useContext, createContext, useState, useMemo, useEffect } from 'react';
import { SERVER_URL } from '../../constants';
import { useUsers } from './UserProvider';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

function ProfileProvider({ children }) {
	const { logout, notifyProfileChanges } = useUsers();
	const [roles, setRoles] = useState([]);
	const [profile, setProfile] = useState();
	const [credentialDataChanged, setCredentialDataChanged] = useState(false);
	const [dataSaved, setDataSaved] = useState(false);
	const [profileLoading, setProfileLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState();

	// first loading
	useMemo(() => {
		setProfileLoading(true);
		let token = sessionStorage.getItem('starbucks-admin-jwt');
		fetch(SERVER_URL + '/admin/role', {
			headers: { Authorization: token },
		})
			.then((response) => response.json())
			.then(setRoles)
			.then(() => {
				let username = JSON.parse(sessionStorage.getItem('starbucks-admin')).username;
				fetch(SERVER_URL + `/user/username=${username}`, {
					headers: { Authorization: token },
				})
					.then((response) => response.json())
					.then(setProfile)
					.then(() => setProfileLoading(false));
			});
	}, []);

	const isCredentialDataChanged = (fieldName, value) => {
		let user = JSON.parse(sessionStorage.getItem('starbucks-admin'));
		if (value !== user[fieldName]) {
			return true;
		} else {
			return false;
		}
	};

	const handleChange = (fieldName, value) => {
		setProfile({ ...profile, [fieldName]: value });
		if (fieldName === 'username' || fieldName === 'password' || fieldName === 'role') {
			setCredentialDataChanged(isCredentialDataChanged(fieldName, value));
		}
	};

	const updateUser = (user) => {
		setProfileLoading(true);
		let token = sessionStorage.getItem('starbucks-admin-jwt');
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
				} else {
					// for updating new current user to the outside (photo and fullname displayed in the side menu)
					sessionStorage.setItem('starbucks-admin', JSON.stringify(user));
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
			if (credentialDataChanged) {
				logout();
			} else {
				notifyProfileChanges(true); // notify the outside (current user on the header) to get new current user from session storage
			}
		}
	}, [credentialDataChanged, dataSaved, errorMsg, logout, notifyProfileChanges]);

	useEffect(() => {
		if (dataSaved) {
			setDataSaved(false); // set back to 'false'
		}
	}, [dataSaved]);

	return (
		<ProfileContext.Provider value={{ roles, profile, handleChange, updateUser, profileLoading, errorMsg, setErrorMsgContent }}>
			{children}
		</ProfileContext.Provider>
	);
}

export default ProfileProvider;
