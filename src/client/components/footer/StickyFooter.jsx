import React from 'react';
import { Row, Col } from 'antd';
import { Select, MenuItem } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import BagNotification from './BagNotification';

const muiTheme = createMuiTheme({
	palette: {
		primary: {
			main: '#00a862',
		},
	},
});

function StickyFooter() {
	const [location, setLocation] = React.useState('');

	const handleChange = (event) => {
		setLocation(event.target.value);
	};

	return (
		<Row type='flex' align='middle' style={{ backgroundColor: '#1a3d35', width: '100%', height: '80px', bottom: 0, position: 'fixed' }}>
			<Col xs={{ span: 18, order: 2 }} sm={{ span: 10, order: 1 }} md={{ span: 10, order: 1 }} lg={{ span: 10, order: 1 }}>
				<ThemeProvider theme={muiTheme}>
					<Select IconComponent={ExpandMoreIcon} value={location} onChange={handleChange} displayEmpty className='stickyFooter__select'>
						<MenuItem value='' disabled>
							<div style={{ textAlign: 'left' }}>
								<p className='main__font' style={{ color: 'white', opacity: 0.8, marginBottom: 4 }}>
									For item availablity
								</p>
								<p className='main__font' style={{ fontSize: 18, color: 'white' }}>
									Choose a store
								</p>
							</div>
						</MenuItem>
						<MenuItem value='Starbucks Da Nang'>
							<div style={{ textAlign: 'left' }}>
								<p className='main__font' style={{ fontSize: 18, color: '#00a862', marginBottom: 0 }}>
									Starbucks Da Nang
								</p>
							</div>
						</MenuItem>
						<MenuItem value='Starbucks Sai Gon'>
							<div style={{ textAlign: 'left' }}>
								<p className='main__font' style={{ fontSize: 18, color: '#00a862', marginBottom: 0 }}>
									Starbucks Sai Gon
								</p>
							</div>
						</MenuItem>
						<MenuItem value='Starbucks Ha Noi'>
							<div style={{ textAlign: 'left' }}>
								<p className='main__font' style={{ fontSize: 18, color: '#00a862', marginBottom: 0 }}>
									Starbucks Ha Noi
								</p>
							</div>
						</MenuItem>
					</Select>
				</ThemeProvider>
			</Col>
			<Col xs={{ span: 6, order: 1 }} sm={{ span: 14 }} md={{ span: 14 }} lg={{ span: 14 }} style={{ textAlign: 'center' }}>
				<BagNotification />
			</Col>
		</Row>
	);
}

export default StickyFooter;
