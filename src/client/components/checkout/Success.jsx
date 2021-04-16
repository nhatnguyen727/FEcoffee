import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

function Success() {
	React.useMemo(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Result
			style={{ padding: '120px 8vw' }}
			status='success'
			title='Successfully Ordered!'
			subTitle='Your order is on the way...'
			extra={[
				<Button type='primary' key='home'>
					<Link to=''>Back To Homepage</Link>
				</Button>,
				<Button key='buy'>
					<Link to='/menu'>Order Again</Link>
				</Button>,
			]}
		/>
	);
}

export default Success;
