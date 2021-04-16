import React from 'react';
import { Spin, Row, Col, Typography } from 'antd';
import Product from './Product';
import { useProducts } from '../app-context/ProductProvider';
import { useCategories } from '../app-context/CategoryProvider';

const { Title } = Typography;

function ProductList() {
	const { selectedCategory } = useCategories();
	const { products, productLoading, favorites } = useProducts();

	const favoritesIdList = React.useMemo(() => {
		return favorites.map((fav) => fav.id);
	}, [favorites]);

	return (
		<Spin spinning={productLoading}>
			<div style={{ minHeight: '60vh' }} className='md:mx-20 sm:mx-0 mt-10'>
				<Title level={3} style={{ fontWeight: 'bold', marginBottom: 36 }}>
					{selectedCategory.name}
				</Title>

				<Row gutter={[24, 24]}>
					{products.map((product) => (
						<Col key={product.id} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }}>
							<Product
								id={product.id}
								name={product.name}
								image={product.image}
								price={product.price}
								favorited={favoritesIdList.includes(product.id)}
							/>
						</Col>
					))}
				</Row>
			</div>
		</Spin>
	);
}

export default ProductList;
