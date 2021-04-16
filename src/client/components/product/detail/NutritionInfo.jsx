import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

function NutritionInfo() {
	return (
		<>
			<Title level={5} type='secondary'>
				Nutrition information is calculated based on our standard recipes. Only changing drink size will update this information. Other
				customizations will not.
			</Title>
			<Title level={5} style={{ fontSize: 18 }} className='border__bolder'>
				Serving Size fl oz
			</Title>
			<div className='border__bold'>
				<Title level={5} style={{ fontWeight: 700, fontSize: 18, margin: 0 }}>
					Calories
				</Title>
			</div>
			<div className='layout__nutritionInfo' style={{ justifyContent: 'flex-end' }}>
				<Title level={5} style={{ fontSize: 18, margin: 0 }}>
					% Daily Value *
				</Title>
			</div>
			<div className='layout__nutritionInfo'>
				<Title level={5} style={{ fontWeight: 700, fontSize: 18, margin: 0 }}>
					Total Fat g
				</Title>
			</div>
			<div className='layout__nutritionInfo'>
				<Title level={5} style={{ fontWeight: 700, fontSize: 18, margin: 0 }}>
					Cholesterol mg
				</Title>
			</div>
			<div className='layout__nutritionInfo'>
				<Title level={5} style={{ fontWeight: 700, fontSize: 18, margin: 0 }}>
					Sodium mg
				</Title>
				<Title level={5} style={{ fontSize: 18, margin: 0 }}>
					%
				</Title>
			</div>
			<div className='layout__nutritionInfo'>
				<Title level={5} style={{ fontWeight: 700, fontSize: 18, margin: 0 }}>
					Total Carbohydrates g
				</Title>
				<Title level={5} style={{ fontSize: 18, margin: 0 }}>
					%
				</Title>
			</div>
			<div className='layout__nutritionInfo'>
				<Title level={5} style={{ fontWeight: 700, fontSize: 18, margin: 0 }}>
					Protein g
				</Title>
				<Title level={5} style={{ fontSize: 18, margin: 0 }}>
					%
				</Title>
			</div>
			<div className='layout__nutritionInfo'>
				<Title level={5} style={{ fontWeight: 700, fontSize: 18, margin: 0 }}>
					Caffeine mg
				</Title>
			</div>
			<Title level={5} type='secondary' style={{ marginTop: 24 }}>
				* 2,000 calories a day is used for general nutrition advice, but calorie needs vary.
			</Title>
		</>
	);
}

export default NutritionInfo;
