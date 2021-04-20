import React from 'react';
import { Avatar, Spin } from 'antd';
import { TextField, Checkbox, FormControlLabel, Button, Snackbar, withStyles } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useUser } from '../app-context/UserProvider';
import FooterSecondary from './FooterSecondary';
import './Login.css';
import starbugsLogo from '../../assets/starbugs-logo.png';

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

const SignInButton = withStyles(() => ({
	root: {
		textTransform: 'none',
		borderRadius: '1.8rem',
		backgroundColor: '#00a862',
		boxShadow: '0 0 6px rgba(0,0,0,.24), 0 8px 12px rgba(0,0,0,.14)',
		fontSize: 18,
		fontFamily: 'SoDo Sans SemiBold',
		width: 120,
		height: 60,
		color: 'white',
		'&:hover': {
			backgroundColor: '#007235',
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
		width: 100,
		height: 40,
		'&:hover': {
			color: '#00704A',
		},
	},
}))(Button);

function Login() {
	const history = useHistory();
	const { login, userLoading, errorMsg, resetErrorMsg } = useUser();
	const [passwordShown, setPasswordShown] = React.useState(false);
	const [openErrorMsg, setOpenErrorMsg] = React.useState();


	React.useMemo(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		login({ username: e.target.username.value, password: e.target.password.value });
	};

	const handleErrorClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenErrorMsg(false);
		resetErrorMsg();
	};

	React.useEffect(() => {
		if (errorMsg !== undefined) {
			setOpenErrorMsg(true);
		}
	}, [errorMsg, setOpenErrorMsg]);
	if(sessionStorage["starbucks-member"]){
		return <Redirect to='/'  />
	}


	return (
		<div className='login'>
			<div className='login__left'>
				<Link to=''>
					<Avatar src={starbugsLogo} size={48} style={{ margin: '16px' }} />
				</Link>
				<div className='login__info'>
					<h1>Sign in or create an account 🌟</h1>
				</div>
			</div>
			<div className='login__right'>
				<form onSubmit={handleSubmit}>
					<Spin spinning={userLoading}>
						<p className='w-64 text-gray-500'></p>
						<div className='login__inputContainer' style={{ marginBottom: 8 }}>
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
							/>
						</div>
						<div className='login__inputContainer'>
							<CustomTextField
								name='password'
								label='Password'
								type={passwordShown ? 'text' : 'password'}
								InputLabelProps={{
									style: { fontFamily: 'SoDo Sans SemiBold' },
								}}
								InputProps={{ style: { fontWeight: '900' } }}
								fullWidth
								required
							/>
							{passwordShown ? (
								<VisibilityOutlinedIcon className='login__visibilityIcon' onClick={() => setPasswordShown(!passwordShown)} />
							) : (
								<VisibilityOffOutlinedIcon className='login__visibilityIcon' onClick={() => setPasswordShown(!passwordShown)} />
							)}
						</div>
						<FormControlLabel
							style={{ marginTop: 18, paddingLeft: 4 }}
							control={<GreenCheckbox />}
							label={<div style={{ fontFamily: 'SoDo Sans SemiBold', fontSize: '90%' }}>Keep me signed in</div>}
						/>
						<div className='login__resetLinks'>
							<Link to='/'>Forgot your username?</Link>
							<Link to='/'>Forgot your password?</Link>
						</div>
						<div style={{ marginTop: 18 }}>
							<SignInButton style={{ float: 'right' }} type='submit'>
								Sign in
							</SignInButton>
						</div>
					</Spin>
				</form>
				<div className='login__rewards'>
					<h4 style={{ color: 'white' }}>JOIN SUNN REWARDS</h4>
				</div>
				<div className='login__joinNow'>
					<div className='login__joinNowContainer'>
						<JoinButton variant='outlined' size='small' style={{ marginBottom: 18 }} onClick={() => history.push('/signUp')}>
							Join now
						</JoinButton>
						<h4>Create an account and bring on the Rewards!</h4>
						<p>Join Sunn Rewards to earn free food and drinks, get free refills, pay and order with your phone, and more.</p>
					</div>
				</div>
				<FooterSecondary paddingLeft={30} flexDirection='column' />
			</div>
			<Snackbar open={openErrorMsg} autoHideDuration={5000} onClose={handleErrorClose}>
				<MuiAlert elevation={6} variant='filled' severity='error' onClose={handleErrorClose}>
					{errorMsg !== undefined ? errorMsg : ''}
				</MuiAlert>
			</Snackbar>
		</div>
	);
}

export default Login;
