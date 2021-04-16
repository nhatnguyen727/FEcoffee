import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { useUsers } from '../app-context/UserProvider';
import './Users.css';

const ValidationTextField = withStyles({
	root: {
		'& input:valid + fieldset': {
			borderColor: 'green',
		},
		'& input:invalid + fieldset': {
			borderColor: 'red',
		},
		'& input:valid:focus + fieldset': {
			borderLeftWidth: 6,
		},
	},
})(TextField);

const generalInputStyle = {
	variant: 'outlined',
	size: 'small',
	type: 'text',
	required: true,
	style: { marginBottom: '10px', marginLeft: '8%', width: '84%' },
};

const useStyles = makeStyles(() => ({
	inputProps: {
		fontSize: 14,
	},
	InputLabelProps: {
		fontSize: 14,
	},
	autocompleteFont: {
		fontSize: 14,
	},
}));

function AddUserDialog({ record, handleChange = (f) => f, setErrors = (f) => f }) {
	const classes = useStyles();
	const { roles } = useUsers();
	const [emailError, setEmailError] = React.useState(false);
	const [phoneError, setPhoneError] = React.useState(false);
	const [usernameError, setUsernameError] = React.useState(false);
	const [pwdError, setPwdError] = React.useState(false);
	const [pwdConfirmError, setPwdConfirmError] = React.useState(false);
	const [pwdValues, setPwdValues] = React.useState({ password: '', showPassword: false });
	const [confirmPwdValues, setConfirmPwdValues] = React.useState({ confirmPwd: '', showConfirmPassword: false });

	React.useEffect(() => {
		if (record.role === '') {
			handleChange('role', roles[roles.map((role) => role.id).indexOf(1)]);
		}
		if (
			record.fullname === '' ||
			record.address === '' ||
			record.email === '' ||
			record.phone === '' ||
			record.username === '' ||
			record.password === '' ||
			emailError ||
			phoneError ||
			usernameError ||
			pwdError ||
			pwdConfirmError
		) {
			setErrors(true);
		} else {
			setErrors(false);
		}
	}, [record, emailError, phoneError, usernameError, pwdError, pwdConfirmError, setErrors, handleChange, roles]);

	const handleEmailChange = (fieldName) => ({ target: { value } }) => {
		handleChange(fieldName, value);
		if (/^\w+([-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
			setEmailError(false);
		} else {
			setEmailError(true);
		}
	};

	const handlePhoneChange = (fieldName) => ({ target: { value } }) => {
		handleChange(fieldName, value);
		if (/^[0-9]{10,11}$/.test(value)) {
			setPhoneError(false);
		} else {
			setPhoneError(true);
		}
	};

	const handleUsernameChange = (fieldName) => ({ target: { value } }) => {
		handleChange(fieldName, value);
		if (/^(?=.{4,20}$)[a-zA-Z0-9._]+$/.test(value)) {
			setUsernameError(false);
		} else {
			setUsernameError(true);
		}
	};

	const handlePasswordChange = (fieldName) => ({ target: { value } }) => {
		handleChange(fieldName, value);
		setPwdValues({ ...pwdValues, [fieldName]: value });
		if (/^(?=\S+$).{4,}$/.test(value)) {
			setPwdError(false);
		} else {
			setPwdError(true);
		}
		if (value === confirmPwdValues.confirmPwd) {
			setPwdConfirmError(false);
		} else {
			setPwdConfirmError(true);
		}
	};

	const handleConfirmPasswordChange = (fieldName) => ({ target: { value } }) => {
		setConfirmPwdValues({ ...confirmPwdValues, [fieldName]: value });
		if (value !== pwdValues.password) {
			setPwdConfirmError(true);
		} else {
			setPwdConfirmError(false);
		}
	};

	const handleClickShowPassword = (e) => {
		e.preventDefault();
		setPwdValues({ ...pwdValues, showPassword: !pwdValues.showPassword });
	};

	const handleClickShowConfirmPassword = (e) => {
		e.preventDefault();
		setConfirmPwdValues({ ...confirmPwdValues, showConfirmPassword: !confirmPwdValues.showConfirmPassword });
	};

	return (
		<>
			<ValidationTextField
				{...generalInputStyle}
				label='Full Name'
				value={record.fullname}
				onChange={(e) => handleChange('fullname', e.target.value)}
				autoFocus
				inputProps={{ className: classes.inputProps }}
				InputLabelProps={{ className: classes.InputLabelProps }}
			/>
			<ValidationTextField
				{...generalInputStyle}
				required={false}
				label='Photo URL'
				value={record.photo}
				onChange={(e) => handleChange('photo', e.target.value)}
				inputProps={{ className: classes.inputProps }}
				InputLabelProps={{ className: classes.InputLabelProps }}
			/>
			<ValidationTextField
				{...generalInputStyle}
				inputProps={{ pattern: '^\\w+([-.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$', className: classes.inputProps }}
				label='Email'
				value={record.email}
				onChange={handleEmailChange('email')}
				error={emailError}
				helperText={emailError ? 'E-mail must be in following format: email@example.com' : ''}
				InputLabelProps={{ className: classes.InputLabelProps }}
			/>
			<ValidationTextField
				{...generalInputStyle}
				inputProps={{ pattern: '^[0-9]{10,11}$', className: classes.inputProps }}
				label='Phone Number'
				value={record.phone}
				onChange={handlePhoneChange('phone')}
				error={phoneError}
				helperText={phoneError ? 'Phone number must be 10 to 11 digits.' : ''}
				InputLabelProps={{ className: classes.InputLabelProps }}
			/>
			<ValidationTextField
				{...generalInputStyle}
				label='Address'
				value={record.address}
				onChange={(e) => handleChange('address', e.target.value)}
				inputProps={{ className: classes.inputProps }}
				InputLabelProps={{ className: classes.InputLabelProps }}
			/>
			<ValidationTextField
				{...generalInputStyle}
				inputProps={{ pattern: '^(?=.{4,20}$)[a-zA-Z0-9._]+$', className: classes.inputProps }}
				label='Username'
				value={record.username}
				onChange={handleUsernameChange('username')}
				error={usernameError}
				helperText={usernameError ? 'Username must be 4 to 20 chars, only alphanumeric chars, underscores and dots are allowed.' : ''}
				InputLabelProps={{ className: classes.InputLabelProps }}
			/>
			<div style={{ position: 'relative' }}>
				<ValidationTextField
					{...generalInputStyle}
					inputProps={{ pattern: '^(?=\\S+$).{4,}$', className: classes.inputProps }}
					label='Password'
					type={pwdValues.showPassword ? 'text' : 'password'}
					value={pwdValues.password}
					onChange={handlePasswordChange('password')}
					error={pwdError}
					helperText={pwdError ? 'Password must be at least 4 chars, and not contains whitespace.' : ''}
					InputLabelProps={{ className: classes.InputLabelProps }}
				/>
				<div className='users__visibilityIcon' onClick={handleClickShowPassword}>
					{pwdValues.showPassword ? <Visibility /> : <VisibilityOff />}
				</div>
			</div>
			<div style={{ position: 'relative' }}>
				<ValidationTextField
					style={{ position: 'relative' }}
					{...generalInputStyle}
					inputProps={{ pattern: '^(?=\\S+$).{4,}$', className: classes.inputProps }}
					label='Retype Password'
					type={confirmPwdValues.showConfirmPassword ? 'text' : 'password'}
					value={confirmPwdValues.confirmPwd}
					onChange={handleConfirmPasswordChange('confirmPwd')}
					error={pwdConfirmError}
					helperText={pwdConfirmError ? 'Password and confirmation password do not match!' : ''}
					InputLabelProps={{ className: classes.InputLabelProps }}
				/>
				<div className='users__visibilityIcon' onClick={handleClickShowConfirmPassword}>
					{confirmPwdValues.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
				</div>
			</div>
			<Autocomplete
				style={{ marginLeft: '8%', width: '84%' }}
				options={roles}
				renderInput={(params) => <TextField {...params} label='Role' />}
				defaultValue={roles[roles.map((role) => role.id).indexOf(1)]}
				getOptionLabel={(value) => value.name}
				onChange={(event, newValue) => handleChange('role', newValue)}
				disableClearable
				classes={{ input: classes.autocompleteFont }}
			/>
		</>
	);
}

export default AddUserDialog;
