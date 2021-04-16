import React from 'react';
import cx from 'clsx';
import { Col } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Button, CardMedia, CardContent, Zoom } from '@material-ui/core';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useCart } from '../app-context/CartProvider';
import { useFavorites } from '../app-context/FavoriteProvider';
import { useHistory, useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
	root: {
		margin: 'auto',
		borderRadius: spacing(2), // 16px
		transition: '0.3s',
		boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
		position: 'relative',
		maxWidth: 500,
		overflow: 'initial',
		background: '#ffffff',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		paddingBottom: spacing(2),
		[breakpoints.up('sm')]: {
			flexDirection: 'row',
			paddingTop: spacing(2),
		},
	},
	media: {
		cursor: 'pointer',
		width: '88%',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: spacing(-4),
		height: 0,
		paddingBottom: '48%',
		borderRadius: spacing(2),
		backgroundColor: '#fff',
		position: 'relative',
		[breakpoints.up('sm')]: {
			width: '160%',
			marginLeft: spacing(-4),
			marginTop: 0,
			transform: 'translateX(-8px)',
		},
		'&:after': {
			content: '" "',
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			backgroundImage: 'linear-gradient(150deg, #1a3d35 0%, #007235 70%)',
			borderRadius: spacing(2), // 16
			opacity: 0.2,
		},
		transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
		'&:hover': {
			transform: 'scale(1.1)',
		},
	},
	content: {
		padding: 24,
	},
	cta: {
		marginTop: 24,
		textTransform: 'initial',
	},
}));

const family = '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif';

const useBlogTextInfoContentStyles = makeStyles(({ spacing }) => ({
	overline: {
		textTransform: 'uppercase',
		letterSpacing: '1px',
		fontSize: 12,
		marginBottom: '0.875em',
		display: 'inline-block',
	},
	heading: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: '0.35em',
		fontFamily: family,
	},
	body: {
		marginBottom: spacing(2),
		fontSize: '0.8rem',
		letterSpacing: '0.00938em',
		fontFamily: family,
	},
	button: {
		backgroundImage: 'linear-gradient(150deg, green 0%, #007235 70%)',
		boxShadow: '0px 4px 32px rgba(40, 172, 0, 0.24)',
		borderRadius: 100,
		marginRight: 8,
		width: 112,
		marginBottom: spacing(2),
		color: '#ffffff',
		transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
		'&:hover': {
			transform: 'scale(1.1)',
		},
	},
}));

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

function Favorite({ id, name, image, description, category }) {
	const styles = useStyles();
	const { button: buttonStyles, ...contentStyles } = useBlogTextInfoContentStyles();
	const shadowStyles = useOverShadowStyles();
	const { getSelectedProduct } = useCart();
	const { updateFavorite } = useFavorites();
	const { url } = useRouteMatch();
	const history = useHistory();
	const [favoriteRemoved, setFavoriteRemoved] = React.useState(false);

	const handleSelect = (id, name) => {
		getSelectedProduct(id, name);
		history.push(`${url}/product/name=${name}`);
	};

	const handleRemove = () => {
		setFavoriteRemoved(true);
		updateFavorite(id);
	};

	return (
		<Zoom in={!favoriteRemoved}>
			{/* breakpoint sm in 'makeStyles' above */}
			<Col md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 8 }} style={{ width: '100%' }}>
				<Card className={cx(styles.root, shadowStyles.root)}>
					<CardMedia className={styles.media} image={image} onClick={() => handleSelect(id, name)} />
					<CardContent className='size__imageCard'>
						<TextInfoContent classes={contentStyles} overline={category} heading={name} body={description} />
						<Button className={buttonStyles} onClick={() => handleSelect(id, name)}>
							Add to Bag
						</Button>
						<Button
							className={buttonStyles}
							style={{
								backgroundImage: 'linear-gradient(150deg, #fe8a39 0%, #fd3838 70%)',
								boxShadow: '0px 4px 32px rgba(252, 56, 56, 0.4)',
							}}
							onClick={handleRemove}
						>
							Remove
						</Button>
					</CardContent>
				</Card>
			</Col>
		</Zoom>
	);
}

export default Favorite;
