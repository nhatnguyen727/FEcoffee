import React from 'react';
import { Layout, Spin } from 'antd';
import CssBaseline from '@material-ui/core/CssBaseline';
import EnhancedTable from '../react-table/EnhancedTable';
import AddUserDialog from './AddUserDialog';
import UserFieldsTableCell from './UserFieldsTableCell';
import { useUsers } from '../app-context/UserProvider';

const { Content } = Layout;

function Users() {
	const { users, deleteUsers, addUser, updateUser, userLoading, errorMsg, resetErrorMsg } = useUsers();

	// for adding new user
	const initUser = React.useMemo(() => {
		return {
			photo: '',
			fullname: '',
			phone: '',
			address: '',
			email: '',
			username: '',
			password: '',
			role: '',
		};
	}, []);

	const columns = React.useMemo(
		() => [
			{
				Header: 'Profile Photo',
				accessor: 'photo',
			},
			{
				Header: 'Full Name',
				accessor: 'fullname',
			},
			{
				Header: 'Phone',
				accessor: 'phone',
			},
			{
				Header: 'Address',
				accessor: 'address',
			},
			{
				Header: 'Email',
				accessor: 'email',
			},
			{
				Header: 'Username',
				accessor: 'username',
			},
			{
				Header: 'Role',
				accessor: 'role',
			},
		],
		[]
	);

	const data = React.useMemo(() => {
		return users.map((user) => ({
			id: user.id,
			photo: user.photo,
			fullname: user.fullname,
			phone: user.phone,
			address: user.address,
			email: user.email,
			username: user.username,
			role: user.role,
		}));
	}, [users]);

	const userFieldsForm = (record, handleChange = (f) => f, setErrors = (f) => f) => {
		return <AddUserDialog record={record} handleChange={handleChange} setErrors={setErrors} />;
	};

	const userFieldsTableCell = (
		columnId,
		inputStyle,
		value,
		onChange = (f) => f,
		onBlur = (f) => f,
		imgDlgOpen,
		handleImgDlgOpen = (f) => f,
		handleImgDlgClose = (f) => f
	) => {
		return (
			<UserFieldsTableCell
				columnId={columnId}
				inputStyle={inputStyle}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				dlgOpen={imgDlgOpen}
				handleDlgOpen={handleImgDlgOpen}
				handleDlgClose={handleImgDlgClose}
			/>
		);
	};

	return (
		<Content style={{ margin: '16px' }}>
			<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
				<Spin spinning={userLoading}>
					<CssBaseline />
					<EnhancedTable
						columns={columns}
						data={data}
						initialRecord={initUser}
						fieldsForm={userFieldsForm}
						fieldsTableCell={userFieldsTableCell}
						deleteRecordInDB={deleteUsers}
						addRecordInDB={addUser}
						updateRecordInDB={updateUser}
						errorMsg={errorMsg}
						resetErrorMsg={resetErrorMsg}
						tableName='Users'
					/>
				</Spin>
			</div>
		</Content>
	);
}

export default Users;
