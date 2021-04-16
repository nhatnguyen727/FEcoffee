import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function ContentPlaceholder({ sublinks }) {
	return (
		<motion.div variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }} transition={{ duration: 0.8 }} className='content__placeholder'>
			<div className='footer__sublinks__div'>
				{sublinks.map((linkTitle, i) => (
					<Link key={i} className='footer__sublink' to='' onClick={(e) => e.preventDefault()}>
						{linkTitle}
					</Link>
				))}
			</div>
		</motion.div>
	);
}

export default ContentPlaceholder;
