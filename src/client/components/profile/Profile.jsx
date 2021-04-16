import React from 'react';
import cx from 'clsx';
import { Container, Grid, Avatar, Box, Button, TextField, Snackbar, withStyles, makeStyles } from '@material-ui/core';
import { Card, CardActions, CardContent, Divider, CardHeader } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import MuiAlert from '@material-ui/lab/Alert';
import { Spin } from 'antd';
import { useProfile } from '../app-context/ProfileProvider';
import ProfileSkeleton from './ProfileSkeleton';
import './Profile.css';

const useOverShadowStyles = makeStyles(() => ({
	root: ({ inactive }) => ({
		boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
		transition: '0.3s',
		...(!inactive && {
			'&:hover': {
				transform: 'translateY(2px)',
				boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
			},
		}),
	}),
}));

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
	style: { marginBottom: '10px', width: '90%' },
};

const useStyles = makeStyles(({ breakpoints }) => ({
	inputProps: {
		fontSize: 16,
		[breakpoints.down('xs')]: {
			fontSize: 12,
		},
	},
	InputLabelProps: {
		fontSize: 16,
		[breakpoints.down('xs')]: {
			fontSize: 12,
			letterSpacing: '-1px',
		},
	},
	autocompleteFont: {
		fontSize: 14,
	},
}));

function Profile() {
	const classes = useStyles();
	const shadowStyles = useOverShadowStyles();
	const { profile, handleChange, updateUser, profileLoading, errorMsg, setErrorMsgContent } = useProfile();
	const [emailError, setEmailError] = React.useState(false);
	const [phoneError, setPhoneError] = React.useState(false);
	const [pwdError, setPwdError] = React.useState(false);
	const [pwdConfirmError, setPwdConfirmError] = React.useState(false);
	const [pwdValues, setPwdValues] = React.useState({ password: '', showPassword: false });
	const [confirmPwdValues, setConfirmPwdValues] = React.useState({ confirmPwd: '', showConfirmPassword: false });
	const [openErrorMsg, setOpenErrorMsg] = React.useState(false);
	const [imgURL, setImgURL] = React.useState('');
	const [dlgOpen, setDlgOpen] = React.useState(false);

	const handleSaveRecord = () => {
		if (profile.fullname === '' || profile.address === '' || emailError || phoneError || pwdError || pwdConfirmError) {
			setErrorMsgContent('Please input all required fields!');
			setOpenErrorMsg(true);
		} else {
			updateUser(profile);
		}
	};

	const handleFieldsChange = (fieldName) => ({ target: { value } }) => {
		handleChange(fieldName, value);
	};

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

	const handleErrorClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenErrorMsg(false);
		setErrorMsgContent(); // set back to initial state
	};

	React.useEffect(() => {
		if (errorMsg !== undefined) {
			setOpenErrorMsg(true);
		}
	}, [errorMsg]);

	const handleImgChange = (e) => {
		setImgURL(e.target.value);
	};

	// this does not update in database, just set and show,
	// the real update happens when user hit the save button
	const handleImgUpdate = () => {
		handleChange('photo', imgURL);
		setDlgOpen(false);
		setImgURL('');
	};

	if (profile === undefined) {
		return <ProfileSkeleton />;
	}
	return (
		<Container style={{ padding: '120px 8vw 80px 8vw' }}>
			<Spin spinning={profileLoading}>
				<Grid container spacing={2}>
					<Grid item md={4} xs={12}>
						<Card className={cx(shadowStyles.root)}>
							<CardContent>
								<Box alignItems='center' display='flex' flexDirection='column'>
									<Avatar style={{ height: 100, width: 100 }} src={profile.photo} />
									<p className='text-lg xs:text-2xl font-bold'>{profile.fullname}</p>
									<p className='text-normal xs:text-lg font-base text-gray-500'>{profile.address}</p>
								</Box>
							</CardContent>
							<Divider />
							<CardActions>
								<Button color='primary' fullWidth variant='text' onClick={() => setDlgOpen(true)}>
									Upload picture
								</Button>
							</CardActions>
						</Card>
						<Dialog fullWidth open={dlgOpen} onClose={() => setDlgOpen(false)} aria-labelledby='form-dialog-title'>
							<DialogTitle>Update User's Profile Photo</DialogTitle>
							<DialogContent>
								<DialogContentText>Please enter a new image URL! (upload then hit the save button)</DialogContentText>
								<TextField autoFocus value={imgURL} label='Image URL' fullWidth onChange={handleImgChange} />
							</DialogContent>
							<DialogActions className='mx-2'>
								<Button onClick={() => setDlgOpen(false)} color='primary'>
									Cancel
								</Button>
								<Button onClick={handleImgUpdate} color='primary'>
									Upload
								</Button>
							</DialogActions>
						</Dialog>
					</Grid>
					<Grid item md={8} xs={12}>
						<Card className={cx(shadowStyles.root)}>
							<CardHeader title={<p className='text-lg xs:text-xl font-bold'>Profile</p>} />
							<p className='text-normal xs:text-base text-gray-400 px-4'>The information can be edited</p>
							<Divider />
							<CardContent>
								<Grid container spacing={2}>
									<Grid item md={6} xs={12}>
										<ValidationTextField
											{...generalInputStyle}
											label='Full Name'
											value={profile.fullname}
											onChange={handleFieldsChange('fullname')}
											autoFocus
											inputProps={{ className: classes.inputProps }}
											InputLabelProps={{ className: classes.InputLabelProps }}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<ValidationTextField
											{...generalInputStyle}
											inputProps={{
												pattern: '^\\w+([-.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$',
												className: classes.inputProps,
											}}
											label='Email'
											value={profile.email}
											onChange={handleEmailChange('email')}
											error={emailError}
											helperText={emailError ? 'E-mail must be in following format: email@example.com' : ''}
											InputLabelProps={{ className: classes.InputLabelProps }}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<ValidationTextField
											{...generalInputStyle}
											inputProps={{ pattern: '^[0-9]{10,11}$', className: classes.inputProps }}
											label='Phone Number'
											value={profile.phone}
											onChange={handlePhoneChange('phone')}
											error={phoneError}
											helperText={phoneError ? 'Phone number must be 10 to 11 digits.' : ''}
											InputLabelProps={{ className: classes.InputLabelProps }}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<ValidationTextField
											{...generalInputStyle}
											label='Address'
											value={profile.address}
											onChange={handleFieldsChange('address')}
											inputProps={{ className: classes.inputProps }}
											InputLabelProps={{ className: classes.InputLabelProps }}
										/>
									</Grid>
									<Grid item md={12} xs={12}>
										<p className='text-normal xs:text-base text-gray-400'>
											***You will be logged out if you change these fields below
										</p>
										<Divider />
									</Grid>
									<Grid item md={6} xs={12} style={{ position: 'relative' }}>
										<ValidationTextField
											{...generalInputStyle}
											required={false}
											inputProps={{ pattern: '^(?=\\S+$).{4,}$', className: classes.inputProps }}
											label='Password'
											type={pwdValues.showPassword ? 'text' : 'password'}
											value={pwdValues.password}
											onChange={handlePasswordChange('password')}
											error={pwdError}
											helperText={pwdError ? 'Password must be at least 4 chars, and not contains whitespace.' : ''}
											InputLabelProps={{ className: classes.InputLabelProps }}
										/>
										<div className='profile__visibilityIcon' onClick={handleClickShowPassword}>
											{pwdValues.showPassword ? <Visibility /> : <VisibilityOff />}
										</div>
									</Grid>
									<Grid item md={6} xs={12} style={{ position: 'relative' }}>
										<ValidationTextField
											{...generalInputStyle}
											required={false}
											inputProps={{ pattern: '^(?=\\S+$).{4,}$', className: classes.inputProps }}
											label='Retype Password'
											type={confirmPwdValues.showConfirmPassword ? 'text' : 'password'}
											value={confirmPwdValues.confirmPwd}
											onChange={handleConfirmPasswordChange('confirmPwd')}
											error={pwdConfirmError}
											helperText={pwdConfirmError ? 'Password and confirmation password do not match!' : ''}
											InputLabelProps={{ className: classes.InputLabelProps }}
										/>
										<div className='profile__visibilityIcon' onClick={handleClickShowConfirmPassword}>
											{confirmPwdValues.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
										</div>
									</Grid>
								</Grid>
							</CardContent>
							<Divider />
							<Box p={2}>
								<Button color='primary' variant='contained' onClick={handleSaveRecord}>
									Save
								</Button>
							</Box>
						</Card>
					</Grid>
				</Grid>
			</Spin>
			<Snackbar open={openErrorMsg} autoHideDuration={5000} onClose={handleErrorClose}>
				<MuiAlert elevation={6} variant='filled' severity='error' onClose={handleErrorClose}>
					{errorMsg !== undefined ? errorMsg : ''}
				</MuiAlert>
			</Snackbar>
		</Container>
	);
}

export default Profile;
