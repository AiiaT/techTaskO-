import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/icons/logo.svg';

const Header = () => {
	return (
		<div className='header__wrapper'>
			<div className='header__inner'>
				<Link to='/'>
					<img className='header__logo' src={logo} alt='logo img' />
				</Link>
				<div className='navbar header__navbar'>
					<Link className='navbar__link header__navbar-link' to='/'>
						Home
					</Link>
					<Link className='navbar__link header__navbar-link' to='gallery'>
						Gallery
					</Link>
					<Link className='navbar__link header__navbar-link' to='about'>
						About
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Header;
