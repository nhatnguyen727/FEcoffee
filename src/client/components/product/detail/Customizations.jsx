import React from 'react';
import { Row, Col, Input, Select, Checkbox, Typography, message } from 'antd';
import { useDetail } from '../../app-context/DetailProvider';
import { IconButton } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import HeadShake from 'react-reveal/HeadShake';

const { Text, Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

function Customizations() {
	const {
		detail,
		priceBySize,
		calculatePriceBySize,
		toppingsTotal,
		calculateToppingsTotal,
		total,
		getQuantity,
		getToppings,
		getNote,
	} = useDetail();
	const [inputNumber, setInputNumber] = React.useState('1');

	const warningInputNumber = (warningMsg) => {
		message.warning({
			content: <HeadShake>{warningMsg}</HeadShake>,
			style: {
				marginTop: '20vh',
				fontSize: 16,
			},
			icon: <WarningRoundedIcon fontSize='large' style={{ color: '#ffc400' }} />,
		});
	};

	const handleInputNumber = (e) => {
		if (!isNaN(e.target.value)) {
			if (e.target.value === '') {
				return;
			}
			let value = parseInt(e.target.value);
			if (value > 99) {
				warningInputNumber('Maximum quantity is 99!');
				return;
			}
			setInputNumber(value);
			getQuantity(value);
		}
	};

	const handleButtonInput = (whichButton) => {
		if (whichButton === 'plus') {
			let value = parseInt(inputNumber) + 1;
			if (value > 99) {
				warningInputNumber('Maximum quantity is 99!');
				return;
			}
			setInputNumber(value);
			getQuantity(value);
		}
		if (whichButton === 'minus') {
			let value = parseInt(inputNumber) - 1;
			if (value < 1) {
				warningInputNumber('Minimum quantity is 1!');
				return;
			}
			setInputNumber(value);
			getQuantity(value);
		}
	};

	return (
		<Row style={{ marginTop: '24px' }} gutter={{ xs: 2, sm: 32, md: 40, lg: 4, xl: 24 }}>
			<Col span={24}>
				<Title level={4}>Topping:</Title>
				<Checkbox.Group onChange={getToppings} style={{ width: '100%' }}>
					{detail.toppings.map((topping, i) => (
						<div key={i} className='layout__customizations'>
							<Checkbox
								value={topping.id}
								onChange={(event) => calculateToppingsTotal(event, topping.price)}
								style={{ fontSize: 18, width: '100%' }}
							>
								{topping.name}
							</Checkbox>
							<Text type='warning' style={{ fontSize: 18 }}>
								{topping.price}$
							</Text>
							<br />
						</div>
					))}
				</Checkbox.Group>
				<div style={{ marginTop: '10px', display: 'flex' }}>
					<Text type='success' strong={true} style={{ fontSize: 18, width: '100%' }}>
						Toppings Total:
					</Text>
					<Text type='success' strong={true} style={{ fontSize: 18 }}>
						{toppingsTotal}$
					</Text>
				</div>
			</Col>
			<Col span={10} style={{ marginTop: '24px' }}>
				<Title level={4}>Size:</Title>
				<Select
					defaultValue='Medium'
					style={{ width: '100%', marginRight: '10px', marginTop: '6px', marginBottom: '6px', fontSize: 14, fontWeight: 500 }}
					onChange={calculatePriceBySize}
				>
					{detail.sizes.length > 0 ? (
						detail.sizes.map((size, i) => (
							<Option key={i} value={size.name} style={{ fontSize: 18 }}>
								{size.name}
							</Option>
						))
					) : (
						<Option key={0} value='Medium' style={{ fontSize: 18 }}>
							Medium
						</Option>
					)}
				</Select>
				<Text type='success' strong={true} style={{ fontSize: 18 }}>
					{priceBySize}$
				</Text>
			</Col>
			<Col span={14} style={{ marginTop: '24px' }}>
				<Title level={4}>Quantity:</Title>
				<div className='flex'>
					<Input className='flex-shrink w-full h-8 mt-1.5 font-medium' value={inputNumber} onChange={handleInputNumber} />
					<IconButton onClick={() => handleButtonInput('plus')}>
						<AddCircleOutlineIcon fontSize='small' />
					</IconButton>
					<IconButton onClick={() => handleButtonInput('minus')}>
						<RemoveCircleOutlineIcon fontSize='small' />
					</IconButton>
				</div>
				<div>
					<Text type='success' strong={true} style={{ fontSize: 18 }}>
						Total: {total}$
					</Text>
				</div>
			</Col>

			<Col span={24} style={{ marginTop: '24px' }}>
				<Title level={4}>Note:</Title>
				<TextArea rows={4} onChange={getNote} style={{ fontSize: 18 }} />
			</Col>
		</Row>
	);
}

export default Customizations;
