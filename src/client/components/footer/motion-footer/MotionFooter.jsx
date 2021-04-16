import React from 'react';
import Accordion from './Accordion';
import './MotionFooter.css';

function MotionFooter({ footerSubjects }) {
	return (
		<>
			<Accordion linkHeading='About Us' sublinks={footerSubjects[0]} />
			<Accordion linkHeading='Careers' sublinks={footerSubjects[1]} />
			<Accordion linkHeading='Social Impact' sublinks={footerSubjects[2]} />
			<Accordion linkHeading='For Business Partners' sublinks={footerSubjects[3]} />
			<Accordion linkHeading='Order and Pickup' sublinks={footerSubjects[4]} />
		</>
	);
}

export default MotionFooter;
