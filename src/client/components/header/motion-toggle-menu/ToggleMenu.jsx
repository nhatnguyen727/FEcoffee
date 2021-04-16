import React from 'react';
import { motion } from 'framer-motion';
import { Backdrop, makeStyles } from '@material-ui/core';
import { useCycle } from 'framer-motion';
import ToggleButton from './ToggleButton';
import './ToggleMenu.css';

const useStyles = makeStyles(() => ({
	backdrop: {
		color: '#fff',
		zIndex: -2, // toggle__background has z-index is -1, this backdrop must be below -1
	},
}));

const variants = {
	open: {
		transition: { staggerChildren: 0.07, delayChildren: 0.2 },
	},
	closed: {
		transition: { staggerChildren: 0.05, staggerDirection: -1 },
	},
};

const secondaryVariants = {
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

const sidebar = {
	open: {
		clipPath: `circle(1000px at 94% 24px)`,
		transition: {
			type: 'spring',
			stiffness: 20,
			resDelta: 2,
		},
	},
	closed: {
		clipPath: 'circle(24px at 94% 24px)',
		transition: {
			type: 'spring',
			stiffness: 200,
			damping: 20,
			delay: 0.4,
		},
	},
};

// prefix 'webkit' supports clip path transition on safari iOS
const webkitSidebar = {
	open: {
		WebkitClipPath: `circle(1000px at 94% 24px)`,
		WebkitTransition: {
			type: 'spring',
			stiffness: 20,
			resDelta: 2,
		},
	},
	closed: {
		WebkitClipPath: 'circle(24px at 94% 24px)',
		WebkitTransition: {
			type: 'spring',
			stiffness: 200,
			damping: 20,
			delay: 0.4,
		},
	},
};

function MenuToggle({ makeNavToggleMenu = (f) => f, handleBackTop = (f) => f }) {
	const classes = useStyles();
	const [isOpen, toggleOpen] = useCycle(false, true);
	const containerRef = React.useRef(null);
	const dimensions = React.useRef({ width: 0, height: 0 });

	React.useEffect(() => {
		dimensions.current.width = containerRef.current.offsetWidth;
		dimensions.current.height = containerRef.current.offsetHeight;
	}, []);

	const handleToggleMenu = () => {
		toggleOpen();
		handleBackTop(); // hide BackTop
	};

	const iOS = () => {
		return (
			(/iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) && !window.MSStream
		);
	};

	return (
		<motion.nav className='nav__menu' initial={false} animate={isOpen ? 'open' : 'closed'} custom={dimensions.current.height} ref={containerRef}>
			<motion.div className='toggle__background' initial={false} variants={!iOS() ? sidebar : webkitSidebar} />
			<motion.div initial={false} style={{ marginTop: 48, display: 'absolute' }}>
				{makeNavToggleMenu(handleToggleMenu, isOpen, variants, secondaryVariants, handleBackTop)}
			</motion.div>
			<Backdrop className={classes.backdrop} open={isOpen} onClick={handleToggleMenu} />
			<ToggleButton toggle={handleToggleMenu} />
		</motion.nav>
	);
}

export default MenuToggle;
