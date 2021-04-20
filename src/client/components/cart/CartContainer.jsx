import React from 'react';
import { Layout, Button, message } from 'antd';
import { useHistory } from 'react-router-dom';
import HeadShake from 'react-reveal/HeadShake';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import { useCart } from '../app-context/CartProvider';
import Cart from './Cart';

const { Content } = Layout;

function CartContainer() {
	const history = useHistory();
	const { cartItems } = useCart();

	React.useMemo(() => {
		window.scrollTo(0, 0);
	}, []);

	const warning = (warningMsg) => {
		message.destroy();
		message.warning({
			content: <HeadShake>{warningMsg}</HeadShake>,
			style: {
				marginTop: '20vh',
				fontSize: 16,
				fontWeight: 500,
			},
			icon: <WarningRoundedIcon fontSize='large' style={{ color: '#ffc400' }} />,
		});
	};

	const checkUserLoggedIn = () => {
		if (sessionStorage.getItem('starbucks-member') === null) {
			warning('You need to sign in!');
		} else {
			if (cartItems.length === 0) {
				warning("There's no item in your bag, please go to menu and pick up some!");
			} else {
				history.push('/checkout');
			}
		}
	};

	return (
		<Content style={{ padding: '96px 8vw' }}>
			<Cart />
			<div style={{ float: 'right', marginTop: '20px' }}>
				<Button type='primary' onClick={checkUserLoggedIn}>
					Checkout
				</Button>
			</div>
		</Content>
	);
}

export default CartContainer;
