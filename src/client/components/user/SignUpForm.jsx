import React from 'react';
import { Spin } from 'antd';
import { TextField, Checkbox, FormControlLabel, Button, Snackbar, withStyles } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { useUser } from '../app-context/UserProvider';
import './SignUpForm.css';
import { Redirect } from 'react-router';

const CustomTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: '#00a862',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#00a862',
		},
	},
})(TextField);

const GreenCheckbox = withStyles({
	root: {
		color: '#007235',
		transform: 'scale(1.4)',
	},
})((props) => <Checkbox color='default' {...props} />);

const StyledButton = withStyles(() => ({
	root: {
		textTransform: 'none',
		borderRadius: '1.8rem',
		backgroundColor: '#00a862',
		boxShadow: '0 0 6px rgba(0,0,0,.24), 0 8px 12px rgba(0,0,0,.14)',
		fontSize: 18,
		fontFamily: 'SoDo Sans SemiBold',
		width: 180,
		height: 60,
		color: 'white',
		'&:hover': {
			backgroundColor: '#007235',
		},
	},
}))(Button);

const initUser = {
	fullname: '',
	phone: '',
	address: '',
	email: '',
	username: '',
};

function SignUpForm() {
	const { signUp, userLoading, errorMsg, resetErrorMsg } = useUser();
	const [record, setRecord] = React.useState(initUser);
	const [emailError, setEmailError] = React.useState(false);
	const [phoneError, setPhoneError] = React.useState(false);
	const [usernameError, setUsernameError] = React.useState(false);
	const [pwdError, setPwdError] = React.useState(false);
	const [pwdConfirmError, setPwdConfirmError] = React.useState(false);
	const [pwdValues, setPwdValues] = React.useState({ password: '', showPassword: false });
	const [confirmPwdValues, setConfirmPwdValues] = React.useState({ confirmPwd: '', showConfirmPassword: false });
	const [errors, setErrors] = React.useState(true);
	const [openErrorMsg, setOpenErrorMsg] = React.useState(false);

	const handleSubmit = () => {
		if (errors === false) {
			signUp(record);
		} else {
			setOpenErrorMsg(true);
		}
	};

	// error message from back-end validation
	React.useEffect(() => {
		if (errorMsg !== undefined) {
			setOpenErrorMsg(true);
		}
	}, [errorMsg]);

	const handleChange = (fieldName, value) => {
		setRecord({ ...record, [fieldName]: value });
	};

	const handleErrorClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenErrorMsg(false);
		resetErrorMsg();
	};

	React.useEffect(() => {
		if (record.fullname === '' || record.address === '' || emailError || phoneError || usernameError || pwdError || pwdConfirmError) {
			setErrors(true);
		} else {
			setErrors(false);
		}
	}, [record, emailError, phoneError, usernameError, pwdError, pwdConfirmError, setErrors]);

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
	if(sessionStorage["starbucks-member"]){
		return <Redirect to='/'  />
	}

	return (
		<div className='signUpForm'>
			<div className='signUpForm__container'>
				<Spin spinning={userLoading} style={{ marginTop: '20vh' }}>
					<form className='signUpForm__form'>
						<h4 className='signUpForm__section'>Personal Information</h4>
						<div className='signUpForm__inputContainer'>
							<CustomTextField
								name='fullname'
								label='Full Name'
								type='text'
								InputLabelProps={{
									style: { fontFamily: 'SoDo Sans SemiBold' },
								}}
								InputProps={{ style: { fontWeight: '900' } }}
								fullWidth
								required
								value={record.fullname}
								onChange={(e) => handleChange('fullname', e.target.value)}
								autoFocus
							/>
						</div>
						<div className='signUpForm__inputContainer'>
							<CustomTextField
								name='username'
								label='Username'
								type='text'
								InputLabelProps={{
									style: { fontFamily: 'SoDo Sans SemiBold' },
								}}
								InputProps={{ style: { fontWeight: '900' } }}
								fullWidth
								required
								value={record.username}
								onChange={handleUsernameChange('username')}
								error={usernameError}
								helperText={
									usernameError ? 'Username must be 4 to 20 chars, only alphanumeric chars, underscores and dots are allowed.' : ''
								}
							/>
						</div>
						<div className='signUpForm__inputContainer'>
							<CustomTextField
								name='phone'
								label='Phone Number'
								type='text'
								InputLabelProps={{
									style: { fontFamily: 'SoDo Sans SemiBold' },
								}}
								InputProps={{ style: { fontWeight: '900' } }}
								fullWidth
								required
								value={record.phone}
								onChange={handlePhoneChange('phone')}
								error={phoneError}
								helperText={phoneError ? 'Phone number must be 10 to 11 digits.' : ''}
							/>
						</div>
						<div className='signUpForm__inputContainer'>
							<CustomTextField
								name='address'
								label='Address'
								type='text'
								InputLabelProps={{
									style: { fontFamily: 'SoDo Sans SemiBold' },
								}}
								InputProps={{ style: { fontWeight: '900' } }}
								fullWidth
								required
								value={record.address}
								onChange={(e) => handleChange('address', e.target.value)}
							/>
						</div>
						<h4 className='signUpForm__section' style={{ marginTop: 36 }}>
							Account Security
						</h4>
						<div className='signUpForm__inputContainer'>
							<CustomTextField
								name='email'
								label='Email Address'
								type='email'
								InputLabelProps={{
									style: { fontFamily: 'SoDo Sans SemiBold' },
								}}
								InputProps={{ style: { fontWeight: '900' } }}
								fullWidth
								required
								value={record.email}
								onChange={handleEmailChange('email')}
								error={emailError}
								helperText={emailError ? 'E-mail must be in following format: email@example.com' : ''}
							/>
						</div>

						<div className='signUpForm__inputContainer'>
							<CustomTextField
								name='password'
								label='Password'
								InputLabelProps={{
									style: { fontFamily: 'SoDo Sans SemiBold' },
								}}
								InputProps={{ style: { fontWeight: '900' } }}
								fullWidth
								required
								type={pwdValues.showPassword ? 'text' : 'password'}
								value={pwdValues.password}
								onChange={handlePasswordChange('password')}
								error={pwdError}
								helperText={pwdError ? 'Password must be at least 4 chars, and not contains whitespace.' : ''}
							/>
							{pwdValues.showPassword ? (
								<VisibilityOutlinedIcon className='signUpForm__visibilityIcon' onClick={handleClickShowPassword} />
							) : (
								<VisibilityOffOutlinedIcon className='signUpForm__visibilityIcon' onClick={handleClickShowPassword} />
							)}
						</div>
						<div className='signUpForm__inputContainer'>
							<CustomTextField
								name='confirmPwd'
								label='Confirm Password'
								InputLabelProps={{
									style: { fontFamily: 'SoDo Sans SemiBold' },
								}}
								InputProps={{ style: { fontWeight: '900' } }}
								fullWidth
								required
								type={confirmPwdValues.showConfirmPassword ? 'text' : 'password'}
								value={confirmPwdValues.confirmPwd}
								onChange={handleConfirmPasswordChange('confirmPwd')}
								error={pwdConfirmError}
								helperText={pwdConfirmError ? 'Password and confirmation password do not match!' : ''}
							/>
							{confirmPwdValues.showConfirmPassword ? (
								<VisibilityOutlinedIcon className='signUpForm__visibilityIcon' onClick={handleClickShowConfirmPassword} />
							) : (
								<VisibilityOffOutlinedIcon className='signUpForm__visibilityIcon' onClick={handleClickShowConfirmPassword} />
							)}
						</div>
						<h4 className='signUpForm__rewards'>COLLECT MORE STARS & EARN REWARDS</h4>
						<span className='signUpForm__span'>Email is a great way to know about offers and what’s new from Starbucks.</span>
						<div style={{ marginTop: 12 }}>
							<FormControlLabel
								control={<GreenCheckbox />}
								label={<div style={{ fontFamily: 'SoDo Sans SemiBold', fontSize: '90%' }}>Yes, I’d like email from Sunn</div>}
							/>
						</div>
						<div style={{ marginTop: 12, marginLeft: 30, fontWeight: 500, color: 'gray' }}>
							Know about initiatives, announcements and product offers.
						</div>
						<StyledButton style={{ float: 'right', margin: '24px 0' }} onClick={handleSubmit}>
							Create account
						</StyledButton>
					</form>
				</Spin>
				<Snackbar open={openErrorMsg} autoHideDuration={5000} onClose={handleErrorClose}>
					<MuiAlert elevation={6} variant='filled' severity='error' onClose={handleErrorClose}>
						{errorMsg !== undefined ? errorMsg : 'Please input all required fields!'}
					</MuiAlert>
				</Snackbar>
			</div>
		</div>
	);
}

export default SignUpForm;
