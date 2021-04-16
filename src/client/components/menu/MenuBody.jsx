import React from 'react';
import { Divider, Row, Col } from 'antd';
import { IconButton } from '@material-ui/core';
import { useCategories } from '../app-context/CategoryProvider';

function MenuBody() {
	const { categories, categoryLoading, getSelectedCategory } = useCategories();

	const beverageImgs = React.useMemo(() => {
		return [
			'https://globalassets.starbucks.com/assets/f12bc8af498d45ed92c5d6f1dac64062.jpg?impolicy=1by1_tight_288',
			'https://globalassets.starbucks.com/assets/2d52f16a22fb40ff898be1815ecc952e.jpg?impolicy=1by1_tight_288',
			'https://globalassets.starbucks.com/assets/d39650cf28d44aa283a0f311581e3491.jpg?impolicy=1by1_tight_288',
			'https://globalassets.starbucks.com/assets/21f012c25a714d81b211a19094fb90cc.jpg?impolicy=1by1_tight_288',
			'https://globalassets.starbucks.com/assets/de6d02e888c74eac9f6ea19c5492b8e8.jpg?impolicy=1by1_tight_288',
			'https://globalassets.starbucks.com/assets/1fbfdef2d1814c86ae271460a5b85f93.jpg?impolicy=1by1_tight_288',
			'https://globalassets.starbucks.com/assets/568049dfeca2457fbe190c3a08704c94.jpg?impolicy=1by1_tight_288',
			'https://globalassets.starbucks.com/assets/738d89c837874a4ab31044808764b6fb.jpg?impolicy=1by1_tight_288',
			'https://globalassets.starbucks.com/assets/02ea801e3aca434fa2fcccfcd4adba8c.jpg?impolicy=1by1_tight_288',
			'https://globalassets.starbucks.com/assets/3e10e6d4c9cb412b9f37d421c0376465.jpg?impolicy=1by1_tight_288',
		];
	}, []);

	const foodImgs = React.useMemo(() => {
		return [
			'https://globalassets.starbucks.com/assets/568049dfeca2457fbe190c3a08704c94.jpg?impolicy=1by1_tight_288',
			'https://globalassets.starbucks.com/assets/738d89c837874a4ab31044808764b6fb.jpg?impolicy=1by1_tight_288',
			'https://globalassets.starbucks.com/assets/02ea801e3aca434fa2fcccfcd4adba8c.jpg?impolicy=1by1_tight_288',
			'https://globalassets.starbucks.com/assets/3e10e6d4c9cb412b9f37d421c0376465.jpg?impolicy=1by1_tight_288',
		];
	}, []);

	return (
		<div className='md:mx-20 sm:mx-0 mt-10'>
			{!categoryLoading ? (
				<>
					<p style={{ fontSize: 28 }} className='main__font'>
						Menu
					</p>
					<div className='mt-10'>
						<p style={{ fontSize: 24 }} className='main__font'>
							Beverage
						</p>
						<Divider />
						<Row gutter={24}>
							{categories
								.filter((category) => category.id < 7)
								.map((category, i) => (
									<Col key={category.id} style={{ marginBottom: 24 }} xs={{ span: 24 }} sm={{ span: 24 }} xl={{ span: 12 }}>
										<div style={{ display: 'flex', alignItems: 'center' }}>
											<IconButton onClick={() => getSelectedCategory(category.id, category.name)}>
												<img
													className='rounded-full w-16 xs:w-24 xs:h-24 md:w-24 md:h-24 lg:w-32 lg:h-32'
													src={beverageImgs[i]}
													alt=''
												/>
											</IconButton>
											<p className='font-medium text-lg'>{category.name}</p>
										</div>
									</Col>
								))}
						</Row>
					</div>
					<div className='mt-10'>
						<p style={{ fontSize: 24 }} className='main__font'>
							Food
						</p>
						<Divider />
						<Row gutter={24}>
							{categories
								.filter((category) => category.id >= 7)
								.map((category, i) => (
									<Col key={category.id} style={{ marginBottom: 24 }} xs={{ span: 24 }} sm={{ span: 24 }} xl={{ span: 12 }}>
										<div style={{ display: 'flex', alignItems: 'center' }}>
											<IconButton onClick={() => getSelectedCategory(category.id, category.name)}>
												<img
													className='rounded-full w-16 xs:w-24 xs:h-24 md:w-24 md:h-24 lg:w-32 lg:h-32'
													src={foodImgs[i]}
													alt=''
												/>
											</IconButton>
											<p className='font-medium text-lg'>{category.name}</p>
										</div>
									</Col>
								))}
						</Row>
					</div>
				</>
			) : null}
		</div>
	);
}

export default MenuBody;
