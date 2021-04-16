import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

function Redirector({ subTitle }) {
	return (
		<Result
			status='403'
			title='You need to sign in!'
			subTitle={subTitle}
			extra={[
				<Button type='primary' key='login'>
					<Link to='/login'>Sign in</Link>
				</Button>,
				<Button key='join'>
					<Link to='/signUp'>Join now</Link>
				</Button>,
			]}
		/>
	);
}

export default Redirector;
