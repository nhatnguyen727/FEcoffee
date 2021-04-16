import React from 'react';
import { Col, Typography } from 'antd';

const { Title } = Typography;

function FooterSubject({ header, sublinks }) {
	return (
		<Col span={4} style={{ marginRight: 24 }}>
			<Title level={4} style={{ marginTop: 4 }}>
				{header}
			</Title>
			{sublinks.map((linkTitle, i) => (
				<Title key={i} level={4} style={{ fontSize: '114%', color: 'gray', fontWeight: 'normal', marginBottom: 8 }}>
					{linkTitle}
				</Title>
			))}
		</Col>
	);
}

export default FooterSubject;
