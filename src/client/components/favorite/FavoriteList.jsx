import React from 'react';
import Favorite from './Favorite';
import { Spin, Row, Result, Button, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { useFavorites } from '../app-context/FavoriteProvider';
import Redirector from '../../Redirector';

function FavoriteList() {
	const { favorites, favLoading } = useFavorites();

	React.useMemo(() => {
		window.scrollTo(0, 0);
	}, []);

	if (sessionStorage.getItem('starbucks-member') === null) {
		return <Redirector subTitle='If you signed in, your favorite products will appear here...' />;
	}
	if (favorites.length === 0 && !favLoading) {
		return (
			<Result
				status='404'
				title="There's no item in your favorite list!"
				subTitle='Use the heart to save to your favorite ones.'
				extra={[
					<Button type='primary' key='home' className='mb-2'>
						<Link to=''>Back To Homepage</Link>
					</Button>,
					<Button key='buy' className='mb-2'>
						<Link to='/menu'>Get some orders</Link>
					</Button>,
				]}
			/>
		);
	}
	return (
		<Spin spinning={favLoading}>
			<div className='mt-10 pl-0 sm:pl-0 md:pl-8' style={{ minHeight: '60vh' }}>
				<div className='ml-0 sm:ml-0 md:-ml-8 mb-16 sm:mb-16 md:mb-12'>
					<p className='text-xl font-bold'>Favorites</p>
					<Divider />
				</div>
				<Row gutter={[48, 48]}>
					{favorites.map((product) => (
						<Favorite
							key={product.id}
							id={product.id}
							name={product.name}
							image={product.image}
							description={product.description}
							category={product.category.name}
							style={{ flex: 1 }}
						/>
					))}
				</Row>
			</div>
		</Spin>
	);
}

export default FavoriteList;
