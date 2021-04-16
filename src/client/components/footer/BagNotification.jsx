import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useCart } from '../app-context/CartProvider';
import { useHistory, useRouteMatch } from 'react-router-dom';

const useStylesTooltip = makeStyles((theme) => ({
	arrow: {
		color: '#00a862',
	},
	tooltip: {
		backgroundColor: '#00a862',
		color: 'white',
		boxShadow: theme.shadows[1],
		fontSize: 14,
		maxWidth: '100vw',
	},
}));

const bagStatus = [
	'https://www.starbucks.com/weblx/static/d21adfaa60a934de88eb1cc00c315e52.svg',
	'https://www.starbucks.com/weblx/static/9c51700b42896823747e5d9f27519d03.svg',
];

function BagNotification() {
	const classes = useStylesTooltip();
	const { cartItems, productAdded, openTooltip } = useCart();
	const { url } = useRouteMatch();
	const history = useHistory();

	return (
		<Tooltip
			arrow
			classes={classes}
			title={`${productAdded} added`}
			disableFocusListener
			disableHoverListener
			disableTouchListener
			open={openTooltip}
		>
			<IconButton
				onClick={() => history.push(`${url}cart`)}
				style={{
					width: 48,
					height: 48,
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					backgroundImage: `url(${cartItems.length === 0 ? bagStatus[0] : bagStatus[1]})`,
				}}
			>
				<span className='stickyFooter__bag'>{cartItems.length > 0 ? cartItems.length : null}</span>
			</IconButton>
		</Tooltip>
	);
}

export default BagNotification;
