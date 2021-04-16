import React from 'react';
import { Link } from 'react-router-dom';
import FooterSecondary from './FooterSecondary';
import SignUpForm from './SignUpForm';
import './SignUp.css';
import starbugsLogo from '../../assets/starbugs-logo.png';

function SignUp() {
	React.useMemo(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<div className='signUp__header'>
				<Link to=''>
					<img src={starbugsLogo} alt='' />
				</Link>
			</div>
			<div className='signUp__body'>
				<h1 className='signUp__heading'>Create an account</h1>
				<div className='signUp__rewards'>
					<h4>SUNN COFFEE</h4>
					<p>
						Join Sunn Rewards to earn Stars for free food and drinks, any way you pay. Get access to mobile ordering, a birthday
						Reward, and <Link to='/'>more</Link>.
					</p>
				</div>
				<SignUpForm />
				<FooterSecondary alignItems='center' flexDirection='column' />
			</div>
		</>
	);
}

export default SignUp;
