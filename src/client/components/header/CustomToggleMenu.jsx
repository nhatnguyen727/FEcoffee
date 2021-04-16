import React from 'react';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { motion } from 'framer-motion';
import ToggleMenuItem from './motion-toggle-menu/ToggleMenuItem';
import { Link } from 'react-router-dom';
import { useUser } from '../app-context/UserProvider';

function CustomToggleMenu({ toggle = (f) => f, opened, variants, secondaryVariants, handleBackTop = (f) => f }) {
	const { logout } = useUser();
	const [showSubMenus, setShowSubMenus] = React.useState(false);
	const [showSubMenusAccount, setShowSubMenusAccount] = React.useState(false);
	const [display, setDisplay] = React.useState('inline'); // prevent messing with another component (affect on footer interaction)

	React.useEffect(() => {
		if (!opened) {
			if (display === 'inline') {
				setTimeout(() => {
					setDisplay('none');
				}, 1000); // wait 1000 ms for animation variants to be completed
			}
		} else {
			if (display === 'none') {
				setDisplay('inline');
			}
		}
	}, [opened, display, handleBackTop]);

	return (
		<div style={{ display: display }}>
			{showSubMenus ? (
				<motion.ul variants={variants} className='nav__ul'>
					<ToggleMenuItem
						link='Menu'
						goBackIcon
						onClick={() => {
							setShowSubMenus(false);
						}}
						width='60%'
					/>
					<ToggleMenuItem
						link='All categories'
						path='/menu'
						onClick={() => {
							setShowSubMenus(false);
							toggle();
						}}
					/>
					<ToggleMenuItem
						link='Previous Orders'
						path='/history'
						onClick={() => {
							setShowSubMenus(false);
							toggle();
						}}
					/>
					<ToggleMenuItem
						link='Favorite Products'
						path='/favorite'
						onClick={() => {
							setShowSubMenus(false);
							toggle();
						}}
					/>
				</motion.ul>
			) : (
				<>
					{showSubMenusAccount ? (
						<motion.ul variants={variants} className='nav__ul'>
							<ToggleMenuItem
								link='Account'
								goBackIcon
								onClick={() => {
									setShowSubMenusAccount(false);
								}}
								width='60%'
							/>
							<ToggleMenuItem
								link='View cart'
								path='/cart'
								onClick={() => {
									setShowSubMenusAccount(false);
									toggle();
								}}
							/>
							<ToggleMenuItem
								link='Profile'
								path='/profile'
								onClick={() => {
									setShowSubMenusAccount(false);
									toggle();
								}}
							/>
							<motion.hr variants={secondaryVariants} className='nav__hr' />
							<ToggleMenuItem
								link='Logout'
								path=''
								onClick={() => {
									setShowSubMenusAccount(false);
									toggle();
									logout();
								}}
							/>
						</motion.ul>
					) : (
						<motion.ul variants={variants} className='nav__ul'>
							<ToggleMenuItem link='Menu' goIcon onClick={() => setShowSubMenus(true)} />
							<ToggleMenuItem link='Featured' path='/featured' onClick={toggle} />
							<ToggleMenuItem link='Home' path='' onClick={toggle} />
							{sessionStorage.getItem('starbucks-member') !== null ? (
								<ToggleMenuItem link='Account' goIcon onClick={() => setShowSubMenusAccount(true)} />
							) : null}
							<motion.hr variants={secondaryVariants} className='nav__hr' />
							<motion.div variants={secondaryVariants} className='nav__btn'>
								{sessionStorage.getItem('starbucks-member') === null ? (
									<>
										<Link className='style__btn' to='/login' onClick={toggle}>
											Sign in
										</Link>
										<Link
											className='style__btn'
											to='/signUp'
											onClick={toggle}
											style={{ backgroundColor: '#007235', marginLeft: 12 }}
										>
											Join now
										</Link>
									</>
								) : null}
							</motion.div>
							<motion.div variants={secondaryVariants}>
								<Link className='nav__link' to=''>
									<LocationOnIcon />
									Find a store
								</Link>
							</motion.div>
						</motion.ul>
					)}
				</>
			)}
		</div>
	);
}

export default CustomToggleMenu;
