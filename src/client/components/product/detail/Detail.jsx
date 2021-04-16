import { Avatar, Row, Col, Typography, Spin, message } from 'antd';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import HeadShake from 'react-reveal/HeadShake';
import { useDetail } from '../../app-context/DetailProvider';
import { useCart } from '../../app-context/CartProvider';
import Customizations from './Customizations';
import NutritionInfo from './NutritionInfo';
import './Detail.css';

const { Title } = Typography;

const StyledButton = withStyles(() => ({
	root: {
		textTransform: 'none',
		borderRadius: '1.8rem',
		backgroundColor: '#00a862',
		boxShadow: '0 0 6px rgba(0,0,0,.24), 0 8px 12px rgba(0,0,0,.14)',
		fontSize: '140%',
		width: 170,
		height: 60,
		color: 'white',
		'&:hover': {
			backgroundColor: '#007235',
		},
	},
}))(Button);

function Detail() {
	const { detail, detailLoading, prepareToAddItem } = useDetail();
	const { cartItems } = useCart();

	const handleAddToCart = () => {
		if (cartItems.length === 20) {
			message.warning({
				content: <HeadShake>Maximum order is 20 items. Please adjust your order!</HeadShake>,
				style: {
					marginTop: '20vh',
					fontSize: 16,
					fontWeight: 500,
				},
				icon: <WarningRoundedIcon fontSize='large' style={{ color: '#ffc400' }} />,
			});
			return;
		}
		prepareToAddItem();
	};

	return (
		<Spin spinning={detailLoading}>
			<div className='parent__override'>
				{detail !== undefined ? (
					<Row>
						<Col className='panel__left' xs={{ span: 24 }} sm={{ span: 10 }} md={{ span: 10 }} lg={{ span: 10 }}>
							<Row className='mt-0 xs:mt-0 lg:mt-32'>
								<Title level={2} style={{ fontWeight: 900 }}>
									{detail.name}
								</Title>
								<Title level={5}>{detail.description}</Title>
							</Row>
						</Col>
						<Col
							className='panel__right'
							xs={{ span: 24 }}
							sm={{ span: 14, offset: 10 }}
							md={{ span: 14, offset: 10 }}
							lg={{ span: 14, offset: 10 }}
						>
							<Row>
								<Col md={{ span: 24 }} lg={{ span: 12 }}>
									<div style={{ padding: '24px 18px', textAlign: 'center' }}>
										<Avatar src={detail.image} className='size__imageProduct' />
									</div>
									<div style={{ padding: '0 36px' }}>
										<Title level={3} style={{ fontWeight: 'normal' }}>
											Nutrition Information
										</Title>
										<NutritionInfo />
									</div>
								</Col>
								<Col md={{ span: 24 }} lg={{ span: 12 }}>
									<div style={{ padding: 24 }}>
										<Title level={2} style={{ fontWeight: 'normal' }}>
											Customizations
										</Title>
										<Customizations />
										<StyledButton style={{ bottom: '88px', right: '24px', position: 'fixed' }} onClick={handleAddToCart}>
											<p className='main__font' style={{ marginBottom: 0 }}>
												Add to Order
											</p>
										</StyledButton>
									</div>
								</Col>
							</Row>
						</Col>
					</Row>
				) : null}
			</div>
		</Spin>
	);
}

export default Detail;
