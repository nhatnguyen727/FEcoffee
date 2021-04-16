import React from 'react';
import { IconButton } from '@material-ui/core';
import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import { motion, AnimatePresence } from 'framer-motion';
import ContentPlaceholder from './ContentPlaceholder';
import { Link } from 'react-router-dom';

function Accordion({ linkHeading, sublinks }) {
	const [expanded, setExpanded] = React.useState(false);

	const handleExpand = (e) => {
		e.preventDefault();
		setExpanded((expanded) => !expanded);
	};
	return (
		<div style={{ marginBottom: 18 }}>
			<div className='accordion__header'>
				<Link to='' onClick={handleExpand}>
					{linkHeading}
				</Link>
				<div>
					<IconButton onClick={handleExpand}>
						{expanded ? <KeyboardArrowUpRoundedIcon fontSize='large' /> : <KeyboardArrowDownRoundedIcon fontSize='large' />}
					</IconButton>
				</div>
			</div>
			<AnimatePresence>
				{expanded && (
					<motion.section
						key='content'
						initial='collapsed'
						animate='open'
						exit='collapsed'
						variants={{
							open: { opacity: 1, height: 'auto' },
							collapsed: { opacity: 0, height: 0 },
						}}
						transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
					>
						<ContentPlaceholder sublinks={sublinks} />
					</motion.section>
				)}
			</AnimatePresence>
		</div>
	);
}

export default Accordion;
