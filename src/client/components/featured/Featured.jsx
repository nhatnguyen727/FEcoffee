import React from 'react';
import { Row, Col } from 'antd';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Fade } from 'react-reveal';
import { useHistory } from 'react-router-dom';
import './Featured.css';

const ColorButton = withStyles(() => ({
	root: {
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 'bold',
		borderColor: 'black',
		borderRadius: '1.2rem',
		color: 'white',
		backgroundColor: '#007235',
		'&:hover': {
			backgroundColor: 'gray',
		},
	},
}))(Button);

const cards = [
	{
		imgURL: 'https://content-prod-live.cert.starbucks.com/binary/v2/asset/137-69093.png',
		title: 'NEW Brown Sugar Oatmilk Shaken Espresso',
		content: 'With Sunn Blonde Espresso, brown sugar and cinnamon shaken and topped with oatmilk to energize your day.',
		btnTitle: 'Order iced shaken espresso',
	},
	{
		imgURL: 'https://content-prod-live.cert.starbucks.com/binary/v2/asset/137-69094.png',
		title: 'NEW Chocolate Almondmilk Shaken Espresso',
		content: 'Cocoa, notes of malt and Sunn Blonde Espresso shaken together and topped with almondmilk to power you through.',
		btnTitle: 'Order iced shaken espresso',
	},
	{
		imgURL: 'https://content-prod-live.cert.starbucks.com/binary/v2/asset/137-69095.png',
		title: 'Pineapple Matcha Drink',
		content: 'Creamy coconutmilk with premium matcha tea and a fruity twist.',
		btnTitle: 'Order now',
	},
	{
		imgURL: 'https://content-prod-live.cert.starbucks.com/binary/v2/asset/137-69096.png',
		title: 'Pink Drink',
		content: 'Our crisp Strawberry Acaí Refreshers® beverage with accents of passionfruit, combined with creamy coconutmilk.',
		btnTitle: 'Order now',
	},
	{
		imgURL: 'https://content-prod-live.cert.starbucks.com/binary/v2/asset/137-69097.png',
		title: 'Vanilla Sweet Cream Cold Brew',
		content: 'Smooth and balanced with a splash of house-made vanilla sweet cream.',
		btnTitle: 'Order cold brew',
	},
	{
		imgURL: 'https://content-prod-live.cert.starbucks.com/binary/v2/asset/137-69098.png',
		title: 'Salted Caramel Cream Cold Brew',
		content: 'Slow-steeped coffee topped with a touch of caramel and salted cold foam.',
		btnTitle: 'Order cold brew',
	},
	{
		imgURL: 'https://content-prod-live.cert.starbucks.com/binary/v2/asset/137-69491.png',
		title: 'NEW Kale & Portabella Mushroom Sous Vide Egg Bites',
		content: 'Velvety, protein-packed delights with cage-free eggs—under 250 calories.',
		btnTitle: 'Order egg bites',
	},
	{
		imgURL: 'https://content-prod-live.cert.starbucks.com/binary/v2/asset/137-69492.png',
		title: 'Impossible™ Breakfast Sandwich',
		content: 'Savory layers of aged Cheddar cheese, a cage-free fried egg and Impossible™ Sausage Made from Plants.',
		btnTitle: 'Order sandwich',
	},
];

function Featured() {
	const history = useHistory();

	React.useMemo(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleBtnClick = () => {
		history.push('/menu');
	};

	const makeCard = (index, imgURL, title, content, btnTitle) => {
		return (
			<Col key={index} md={{ span: 24 }} lg={{ span: 12 }} style={{ marginBottom: 24 }}>
				<div style={{ backgroundColor: '#f2f0eb' }}>
					<img style={{ maxWidth: '100%', maxHeight: '100%' }} src={imgURL} alt='' />
					<div style={{ textAlign: 'center', minHeight: 280, padding: '0 12px' }}>
						<p className='featured__ad__titles'>{title}</p>
						<p className='featured__ad__contents'>{content}</p>
						<ColorButton variant='outlined' onClick={handleBtnClick}>
							{btnTitle}
						</ColorButton>
					</div>
				</div>
			</Col>
		);
	};

	return (
		<div style={{ padding: '78px 8vw' }}>
			<Fade>
				<Row type='flex' align='middle' style={{ marginBottom: 36, marginTop: 24 }}>
					<div style={{ textAlign: 'center', width: '100%' }}>
						<p className='font__heading__title'>YOU DESERVE SOME SPRING</p>
						<p className='font__heading__content'>Treat yourself to the season’s most inspiring tastes.</p>
					</div>
				</Row>
				<div>
					<Row type='flex' align='middle' gutter={24}>
						{cards.map((cart, i) => {
							return makeCard(i, cart.imgURL, cart.title, cart.content, cart.btnTitle, cart.paddingSide);
						})}
					</Row>
				</div>
			</Fade>
		</div>
	);
}

export default Featured;
