import React from 'react';
import { Form, Input, Button, Spin } from 'antd';
import { UserOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useUsers } from '../app-context/UserProvider';
import { Link } from 'react-router-dom';
import logo from '../../client/assets/starbugs-logo.png';


function LoginAdmin() {
	const { login, userLoading, errorMsg, resetErrorMsg } = useUsers();


	const [openErrorMsg, setOpenErrorMsg] = React.useState();
	const [spinTimer, setSpinTimer] = React.useState(20);
	const [spinMsg, setSpinMsg] = React.useState('');

	

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

	// using recursion
	const countdown = React.useCallback((value, fn, delay = 1000) => {
		fn(value); // callback function sets the current value. When countdown is invoked, the callback is invoked, which sets the current value
		// from here, countdown calls coundown inside (child countdown), every child countdown has its own callback function which sets the current value
		return value > 0 ? setTimeout(() => countdown(value - 1, fn), delay) : value;
	}, []);

	React.useMemo(() => {
		if (spinTimer === 20) {
			countdown(spinTimer, setSpinTimer); // setSpinTimer is 'fn' in countdown function above
		}
	}, [countdown, spinTimer]);

	React.useEffect(() => {
		if (spinTimer === 0 && userLoading) {
			setSpinMsg(
				<div className='mx-4'>
					
				</div>
			);
		}
	}, [spinTimer, userLoading]);

	const antIcon = React.useMemo(() => {
		return <LoadingOutlined style={{ fontSize: 24 }} spin />;
	}, []);



	return (
		<Spin spinning={userLoading} tip={spinMsg} indicator={antIcon}>
			<div
				style={{
					minHeight: '100vh',
					backgroundColor: '#f0f2f5',
					backgroundImage: "url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg')",
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<div style={{ paddingTop: '20vh', display: 'flex' }}>
					<div className='flex-shrink w-32 xs:w-96 sm:w-screen' />
					<div className='flex-grow' style={{ width: '640px' }}>
						<Form onFinish={login}>
							<div className='flex items-center justify-center mb-2'>
								<img alt='' src={logo} className='w-10 h-10 mb-3' />
								<p className='font-bold mb-4 ml-4 text-xl xs:text-xl sm:text-2xl md:text-2xl lg:text-3xl'>Login Admin</p>
							</div>

							<Form.Item
								name='username'
								rules={[
									{
										required: true,
										message: 'Please input your username!',
									},
								]}
							>
								<Input size='large' prefix={<UserOutlined className='site-form-item-icon text-green-500' />} placeholder='Username' />
							</Form.Item>
							<Form.Item
								name='password'
								rules={[
									{
										required: true,
										message: 'Please input your password!',
									},
								]}
							>
								<Input
									size='large'
									prefix={<LockOutlined className='site-form-item-icon text-green-500' />}
									type='password'
									placeholder='Password'
								/>
							</Form.Item>
							<Form.Item>
								<Link to='/#' className='text-green-500 text-base'>
									Forgot password?
								</Link>
								<Button size='large' type='primary' htmlType='submit' style={{ width: '100%', marginTop: '10px' }}>
									Log in
								</Button>
							</Form.Item>
						</Form>
					</div>
					<div className='flex-shrink w-32 xs:w-96 sm:w-screen' />
				</div>
				<p className='text-gray-500 w-screen text-center'></p>
				{errorMsg !== undefined ? (
					<Snackbar open={openErrorMsg} autoHideDuration={5000} onClose={handleErrorClose}>
						<MuiAlert elevation={6} variant='filled' severity='error' onClose={handleErrorClose}>
							{errorMsg}
						</MuiAlert>
					</Snackbar>
				) : null}
				<div style={{ textAlign: 'center', marginTop: 'auto', height: '60px' }}>
					<a href='/' className='text-green-700 text-base'>
						Sunn Coffee Client
					</a>
					<p className='text-base text-gray-500'>Sunn Coffee Admin ©2021</p>
				</div>
			</div>
		</Spin>
	);
}

export default LoginAdmin;
