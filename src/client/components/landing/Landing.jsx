import React from 'react';
import { Layout, Row, Col } from 'antd';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Fade } from 'react-reveal';
import ParallaxCarousel from './ParallaxCarousel';
import img1 from '../../assets/starbucks-wallpaper1.jpg';
import img2 from '../../assets/starbucks-wallpaper2.jpg';
import img3 from '../../assets/starbucks-wallpaper3.jpg';
import './Landing.css';

const dataCarousel = [
	{
		id: 1,
		image: img1,
	},
	{
		id: 2,
		image: img2,
	},
	{
		id: 3,
		image: img3,
	},
];

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

function Landing() {
	const history = useHistory();

	React.useMemo(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleBtnClick = () => {
		history.push('/menu');
	};

	return (
		<div className='home__container'>
			<Fade>
				<Row type='flex' align='middle' className='heading__container'>
					<div className='font__heading'>
						<p>We’re working hard to put the health and well-being of our partners and customers first in all that we do.</p>
					</div>
				</Row>
				<ParallaxCarousel data={dataCarousel} />
				<Layout className='image__ad__container'>
					<Row type='flex' align='middle'>
						<Col xs={{ order: 2 }} md={{ span: 24, order: 2 }} lg={{ span: 12, order: 1 }}>
							<div className='size__ad'>
								<p className='home__ad__titles'>IT'S OATMILK TIME</p>
								<p className='home__ad__contents'>
									Enjoy creamy OATLY Oatmilk in the new Honey Oatmilk Latte or your favorite drink.
								</p>
								<ColorButton variant='outlined' onClick={handleBtnClick}>
									Order the latte
								</ColorButton>
							</div>
						</Col>
						<Col xs={{ order: 1 }} md={{ span: 24, order: 1 }} lg={{ span: 12, order: 2 }}>
							<img className='size__image' src='https://content-prod-live.cert.starbucks.com/binary/v2/asset/137-69187.png' alt='' />
						</Col>
					</Row>
				</Layout>

				<Layout className='image__ad__container'>
					<Row type='flex' align='middle'>
						<Col md={{ span: 24 }} lg={{ span: 12 }}>
							<img className='size__image' src='https://content-prod-live.cert.starbucks.com/binary/v2/asset/137-69194.png' alt='' />
						</Col>
						<Col md={{ span: 24 }} lg={{ span: 12 }}>
							<div className='size__ad'>
								<p className='home__ad__titles'>INTRODUCING ICED SHAKEN ESPRESSO</p>
								<p className='home__ad__contents'>Layers of rich flavor and nondairy milk—under 200 calories in a grande.</p>
								<ColorButton variant='outlined' onClick={handleBtnClick}>
									See the flavors
								</ColorButton>
							</div>
						</Col>
					</Row>
				</Layout>

				<Layout className='image__ad__container'>
					<Row type='flex' align='middle'>
						<Col xs={{ order: 2 }} md={{ span: 24, order: 2 }} lg={{ span: 12, order: 1 }}>
							<div className='size__ad'>
								<p className='home__ad__titles'>FEEL-GOOD FLAVORS</p>
								<p className='home__ad__contents'>
									Say hello to our latest meatless choices, Chickpea Bites & Avocado Protein Box and Kale & Portabella Mushroom Sous
									Vide Egg Bites.
								</p>
								<ColorButton variant='outlined' onClick={handleBtnClick}>
									Explore new finds
								</ColorButton>
							</div>
						</Col>
						<Col xs={{ order: 1 }} md={{ span: 24, order: 1 }} lg={{ span: 12, order: 2 }}>
							<img className='size__image' src='https://content-prod-live.cert.starbucks.com/binary/v2/asset/137-69196.png' alt='' />
						</Col>
					</Row>
				</Layout>
				<div style={{ textAlign: 'center' }}>
					<p className='home__ad__titles'>MORE WAYS TO DISCOVER</p>
				</div>

				<Layout className='image__ad__container' style={{ backgroundColor: '#d4e9e2' }}>
					<Row type='flex' align='middle'>
						<Col md={{ span: 24 }} lg={{ span: 12 }}>
							<img className='size__image' src='https://content-prod-live.cert.starbucks.com/binary/v2/asset/137-69236.jpg' alt='' />
						</Col>
						<Col md={{ span: 24 }} lg={{ span: 12 }}>
							<div className='size__ad'>
								<p className='main__font' style={{ fontSize: 22 }}>
									Order and pick up. Easy as that.
								</p>
								<p className='main__font' style={{ fontSize: 18, marginBottom: 18 }}>
									Just open the app, order your favorites, and enjoy contactless pay. From there, choose whichever pickup method is
									best for you.
								</p>
								<ColorButton variant='outlined' onClick={handleBtnClick}>
									See pickup options
								</ColorButton>
							</div>
						</Col>
					</Row>
				</Layout>
			</Fade>
		</div>
	);
}

export default Landing;
