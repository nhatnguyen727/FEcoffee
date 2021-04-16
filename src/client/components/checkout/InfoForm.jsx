import React from 'react';
import { Form, Input, Button } from 'antd';
import { useCheckout } from '../app-context/CheckoutProvider';

const formItemLayout = {
	labelCol: {
		xs: { span: 8 },
		sm: { span: 8 },
	},
	wrapperCol: {
		xs: { span: 8 },
		sm: { span: 8 },
	},
};

const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0,
		},
		sm: {
			span: 16,
			offset: 8,
		},
	},
};

function InfoForm() {
	const { saveInfo } = useCheckout();

	return (
		<Form
			{...formItemLayout}
			onFinish={saveInfo}
			initialValues={{
				prefix: '84',
			}}
		>
			<Form.Item
				name='recipientName'
				label='Recipient Name'
				rules={[{ required: true, message: 'Please enter the recipent name!', whitespace: true }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				name='orderAddress'
				label='Delivery Address'
				rules={[{ required: true, message: 'Please enter the delivery address!', whitespace: true }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				name='phone'
				label='Phone Number'
				rules={[
					{ required: true, message: 'Please enter the recipent phone number!' },
					{
						pattern: '^[0-9]{10,11}$',
						message: 'Please enter a valid phone number!',
					},
				]}
			>
				<Input style={{ width: '100%' }} />
			</Form.Item>
			<Form.Item {...tailFormItemLayout}>
				<Button type='primary' htmlType='submit'>
					Save
				</Button>
			</Form.Item>
		</Form>
	);
}

export default InfoForm;
