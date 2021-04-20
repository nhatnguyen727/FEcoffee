import { useLocation } from 'react-router-dom';
import { Row, Col, Typography, Divider } from 'antd';
import StickyFooter from './StickyFooter';
import { IconButton } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import PinterestIcon from '@material-ui/icons/Pinterest';
import YouTubeIcon from '@material-ui/icons/YouTube';
import FooterSubject from './FooterSubject';
import MotionFooter from './motion-footer/MotionFooter';
import './Footer.css';

const { Title } = Typography;

const aboutUs = ['Our Heritage', 'Our Coffee', 'Stories and News', 'Investor Relations', 'Policies and Standards', 'Customer Service'];
const carrers = ['Culture and Values', 'Inclusion, Diversity, and Equity', 'College Achievement Plan', 'U.S. Careers', 'International Careers'];
const socialImpact = ['Ethical Sourcing', 'Leading in Sustainability', 'Strengthening Communities', 'Creating Opportunities'];
const partners = ['Landlord Support Center', 'Suppliers', 'Corporate Gift Card Sales', 'Office and Foodservice Coffee'];
const orderAndPickup = ['Order on the App', 'Order on the Web', 'Delivery', 'Order and Pickup Options', 'Explore and Find Coffee for Home'];

function Footer() {
	const location = useLocation();

	return (
		<>
			{!location.pathname.includes('/product/name=') ? (
				<>
					<div className='shadow__div' style={{ marginTop: 'auto', padding: '64px 8vw 88px 8vw' }}>
						<MotionFooter className='motion__footer' footerSubjects={[aboutUs, carrers, socialImpact, partners, orderAndPickup]} />
						<div className='normal___footer'>
							<Row>
								<FooterSubject header='About Us' sublinks={aboutUs} />
								<FooterSubject header='Careers' sublinks={carrers} />
								<FooterSubject header='Social Impact' sublinks={socialImpact} />
								<FooterSubject header='For Business Partners' sublinks={partners} />
								<FooterSubject header='Order and Pickup' sublinks={orderAndPickup} />
							</Row>
						</div>
						<Row>
							<Divider className='shadow__line' style={{ color: 'black' }} />
							<Row>
								<Col span={24}>
									<IconButton>
										<FacebookIcon fontSize='large' style={{ color: '#27251F' }} />
									</IconButton>
									<IconButton>
										<InstagramIcon fontSize='large' style={{ color: '#27251F' }} />
									</IconButton>
									<IconButton>
										<PinterestIcon fontSize='large' style={{ color: '#27251F' }} />
									</IconButton>
									<IconButton>
										<YouTubeIcon fontSize='large' style={{ color: '#27251F' }} />
									</IconButton>
									<IconButton>
										<TwitterIcon fontSize='large' style={{ color: '#27251F' }} />
									</IconButton>
								</Col>
								<Col span={24}>
									<Title level={5} className='divided___title'>
										Privacy Policy
										<Divider type='vertical' className='shadow__line__vertical' style={{ margin: '0 18px' }} />
										Terms of Use
										<Divider type='vertical' className='shadow__line__vertical' style={{ margin: '0 18px' }} />
										CA Supply Chain Act
										<Divider type='vertical' className='shadow__line__vertical' style={{ margin: '0 18px' }} />
										Submit Your Idea
										<Divider type='vertical' className='shadow__line__vertical' style={{ margin: '0 18px' }} />
										Cookie Preferences
									</Title>
									<Title level={5} className='no__divided__title'>
										<div style={{ marginBottom: 24 }}>Privacy Policy</div>
										<div style={{ marginBottom: 24 }}>Terms of Use</div>
										<div style={{ marginBottom: 24 }}>CA Supply Chain Act</div>
										<div style={{ marginBottom: 24 }}>Submit Your Idea</div>
										<div style={{ marginBottom: 24 }}>Cookie Preferences</div>
									</Title>
									<a href='/loginAdmin'>
										<Title level={4} style={{ fontSize: '114%', marginTop: 18, color: 'green', fontWeight: 'normal' }}>
											© 2021 Sunn Coffee Admin
										</Title>
									</a>
								</Col>
							</Row>
						</Row>
					</div>
				</>
			) : null}
			{location.pathname.startsWith('/menu', 0) || location.pathname.startsWith('/favorite', 0) ? <StickyFooter /> : null}
		</>
	);
}

export default Footer;
