import React from 'react';
import { Tag, message } from 'antd';
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography, Zoom } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import AddShoppingCartRoundedIcon from '@material-ui/icons/AddShoppingCartRounded';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import HeadShake from 'react-reveal/HeadShake';
import { useCart } from '../app-context/CartProvider';
import { useProducts } from '../app-context/ProductProvider';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Fade } from 'react-reveal';

function Product({ id, name, image, price, favorited }) {
	const { url } = useRouteMatch();
	const history = useHistory();
	const { getSelectedProduct } = useCart();
	const { updateFavorite } = useProducts();
	const [favoriteTicked, setFavoriteTicked] = React.useState(favorited);
	const [userClicked, setUserClicked] = React.useState(false);

	const handleSelect = (id, name) => {
		getSelectedProduct(id, name);
		history.push(`${url}/product/name=${name}`);
	};

	const handleFavoriteTick = () => {
		if (sessionStorage.getItem('starbucks-member') !== null) {
			setFavoriteTicked((favoriteTicked) => !favoriteTicked);
			setUserClicked(true);
		} else {
			message.warning({
				content: <HeadShake>You need to sign in!</HeadShake>,
				style: {
					marginTop: '20vh',
					fontSize: 16,
					fontWeight: 500,
				},
				icon: <WarningRoundedIcon fontSize='large' style={{ color: '#ffc400' }} />,
			});
		}
	};

	React.useEffect(() => {
		// prevent update when rendering without user's click
		if (userClicked) {
			updateFavorite(id, favoriteTicked);
			setUserClicked(false);
		}
	}, [favoriteTicked, userClicked, updateFavorite, id]);

	return (
		<Fade>
			<Card style={{ borderRadius: '1.2rem' }}>
				<CardMedia style={{ height: 180 }} image={image} />
				<CardContent style={{ paddingBottom: 0 }}>
					<Typography variant='body2' style={{ fontWeight: 'bold', minHeight: 18 }}>
						{name}
					</Typography>
					<Tag color='#007235' style={{ fontWeight: 'bold', marginTop: 8 }}>
						{price} $
					</Tag>
				</CardContent>
				<CardActions disableSpacing>
					<IconButton onClick={handleFavoriteTick}>
						<>
							<Zoom in={favoriteTicked}>
								<FavoriteIcon color='secondary' />
							</Zoom>
							{!favoriteTicked ? <FavoriteBorderOutlinedIcon style={{ position: 'absolute' }} /> : null}
						</>
					</IconButton>
					<IconButton onClick={() => handleSelect(id, name)}>
						<AddShoppingCartRoundedIcon />
					</IconButton>
				</CardActions>
			</Card>
		</Fade>
	);
}

export default Product;
