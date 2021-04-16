import React from 'react';
import { Layout, Button, Descriptions, Collapse, Radio, Row, Col, Typography, Divider, Input } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import Cart from '../cart/Cart';
import { IconFont } from '../../IconFont';
import { useCheckout } from '../app-context/CheckoutProvider';
import InfoForm from './InfoForm';

const { Content } = Layout;
const { Panel } = Collapse;
const { Title } = Typography;

function Checkout() {
	const { info, calculateSubtotal, coupon, saveOrder, loadingSuccess } = useCheckout();
	const [openCouponInputOpened, setCouponInputOpened] = React.useState(false);
	const [anotherCoupon, setAnotherCoupon] = React.useState(false);

	React.useMemo(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleCouponClick = (e) => {
		e.preventDefault();
		setCouponInputOpened(true);
	};

	const handleApplyCoupon = () => {
		setCouponInputOpened(false);
		setAnotherCoupon(true);
	};
	return (
		<div style={{ padding: '120px 8vw' }}>
			<Content>
				<Descriptions title='Delivery Information' layout='vertical'>
					<Descriptions.Item label='Recipient Name' labelStyle={{ fontWeight: 'bold' }}>
						{info !== undefined ? info.recipientName : 'Loading...'}
					</Descriptions.Item>
					<Descriptions.Item label='Phone Number' labelStyle={{ fontWeight: 'bold' }}>
						{info !== undefined ? info.phone : 'Loading...'}
					</Descriptions.Item>
					<Descriptions.Item label='Delivery Address' labelStyle={{ fontWeight: 'bold' }}>
						{info !== undefined ? info.orderAddress : 'Loading...'}
					</Descriptions.Item>
					<Descriptions.Item label='Order Date' labelStyle={{ fontWeight: 'bold' }}>
						{new Date().toLocaleString()}
					</Descriptions.Item>
				</Descriptions>
				<Collapse bordered={false} expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}>
					<Panel header='Do you want to change delivery information?'>
						<InfoForm />
					</Panel>
				</Collapse>
			</Content>
			<Content style={{ marginTop: '24px' }}>
				<Cart />
				<Row style={{ marginTop: 24 }}>
					<Col span={24} className='flex justify-end'>
						{!openCouponInputOpened ? (
							<>
								<label style={{ color: 'grey', marginRight: 8 }}>
									{!anotherCoupon ? 'Have a promo coupon?' : 'Have more promo coupons?'}
								</label>
								<a href='/' onClick={handleCouponClick} className='text-green-500'>
									Redeem coupon
								</a>
							</>
						) : (
							<>
								<Input placeholder='Coupon code' style={{ marginRight: 8, width: 200 }} />
								<Button type='primary' onClick={handleApplyCoupon}>
									Apply
								</Button>
							</>
						)}
					</Col>
				</Row>
			</Content>
			<Descriptions title='Payment Methods' style={{ marginTop: '24px' }}>
				<div style={{ backgroundColor: 'whitesmoke' }}>
					<Radio.Group defaultValue='c' buttonStyle='solid' style={{ paddingTop: '18px', paddingLeft: '18px' }}>
						<Radio.Button type='dashed' value='a' style={{ marginRight: '10px', marginBottom: '8px', width: 200 }}>
							<IconFont type='icon-credit-card' style={{ verticalAlign: 'middle' }} />
							<span style={{ verticalAlign: 'middle' }}> Credit/Debit Card</span>
						</Radio.Button>
						<Radio.Button type='dashed' value='b' style={{ marginRight: '10px', marginBottom: '8px', width: 200 }}>
							<IconFont type='icon-bank' style={{ verticalAlign: 'middle' }} />
							<span style={{ verticalAlign: 'middle' }}> ATM Internet Banking</span>
						</Radio.Button>
						<Radio.Button type='dashed' value='c' style={{ marginRight: '10px', marginBottom: '8px', width: 200 }}>
							<IconFont type='icon-cash' style={{ verticalAlign: 'middle' }} />
							<span style={{ verticalAlign: 'middle' }}> Cash on Delivery</span>
						</Radio.Button>
					</Radio.Group>
				</div>
			</Descriptions>
			<Row style={{ marginTop: '24px' }}>
				<Col span={24} className='flex justify-end'>
					<div className='w-56'>
						<Row>
							<Col span={12}>
								<Title level={5}>Subtotal:</Title>
							</Col>
							<Col>
								<Title level={5}>${calculateSubtotal()}</Title>
							</Col>
						</Row>
						<Row>
							<Col span={12}>
								<Title level={5}>Coupons:</Title>
							</Col>
							<Col>
								<Title level={5}>-${0}</Title>
							</Col>
						</Row>
						<Row>
							<Col span={12}>
								<Title level={5}>Shipping Fee:</Title>
							</Col>
							<Col>
								<Title level={5}>$0.00</Title>
							</Col>
						</Row>
						<Divider />
						<Row>
							<Col span={12}>
								<Title level={4}>Total:</Title>
							</Col>
							<Col>
								<Title level={4}>${calculateSubtotal() - coupon}</Title>
							</Col>
						</Row>
						<Divider />
						<Row>
							<Col span={24} className='flex justify-end'>
								<Button type='primary' onClick={saveOrder} loading={loadingSuccess}>
									Submit Order
								</Button>
							</Col>
						</Row>
					</div>
				</Col>
			</Row>
		</div>
	);
}

export default Checkout;
