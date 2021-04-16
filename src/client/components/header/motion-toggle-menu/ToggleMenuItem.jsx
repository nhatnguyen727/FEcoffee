import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';

const variants = {
	open: {
		y: 0,
		opacity: 1,
		transition: {
			y: { stiffness: 1000, velocity: -100 },
		},
	},
	closed: {
		y: 50,
		opacity: 0,
		transition: {
			y: { stiffness: 1000 },
		},
	},
};

function ToggleMenuItem({ link, path, goIcon, goBackIcon, width, onClick = (f) => f }) {
	const location = useLocation();
	return (
		<Link to={path !== undefined ? path : location.pathname}>
			<motion.li
				className='nav__li'
				style={{ width }}
				onClick={onClick}
				variants={variants}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}
			>
				{goBackIcon && <ChevronLeftRoundedIcon fontSize='large' />}
				{link}
				{goIcon && <ChevronRightRoundedIcon fontSize='large' />}
			</motion.li>
		</Link>
	);
}

export default ToggleMenuItem;
