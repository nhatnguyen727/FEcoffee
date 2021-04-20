import React from 'react';
import { Layout } from 'antd';
import '../../App.css';
import logo from '../../client/assets/starbugs-logo.png';
import reactLogo from '../../assets/react-logo.png';
import springLogo from '../../assets/spring-logo.png';
import { Fade } from 'react-reveal';

function Dashboard() {
	return (
		<Layout>
			<Fade>
				<div className='flex justify-center items-center flex-col xs:flex-row text-center xs:text-left' style={{ marginTop: '24vh' }}>
					<img className='w-12 xs:w-12 md:w-16 lg:w-24 mr-2 xs:mr-2 md:mr-4 lg:mr-8' src={logo} alt='' />
					<div>
						<h1
							className='font-bold xs:font-bold sm:font-black text-lg xs:text-xl sm:text-2xl md:text-4xl lg:text-6xl mb-0 md:mb-0 lg:mb-2 tracking-tighter xs:tracking-normal'
							style={{ color: '#1e3932' }}
						>
							Sunn Coffee Admin
						</h1>
						<h1
							className='font-normal xs:font-normal sm:font-bold tracking-tight sm:tracking-normal md:tracking-wide text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl'
							style={{ color: '#1e3932' }}
						>
							Spring Boot & ReactJS Project
						</h1>
					</div>
				</div>
				<div className='flex items-center justify-center'>
					<img src={reactLogo} className='App-logo' alt='' />
					<img src={springLogo} className='App-logo-second' alt='' />
				</div>
			</Fade>

			<div style={{ textAlign: 'center', marginTop: 'auto', height: '60px' }}>
				<a href='/' className='text-green-700 text-base'>
					Starbugs Coffee Client
				</a>
				<p className='text-base text-gray-500'>Sunn Coffee Admin ©2021</p>
			</div>
		</Layout>
	);
}

export default Dashboard;
