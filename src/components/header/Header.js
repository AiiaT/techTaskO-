import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
	return (
		<div className='navbar'>
			<Link to='/'>Main page</Link>
			<Link to='gallery'>Gallery</Link>
			<Link to='about'>About</Link>
		</div>
	);
};

export default Header;
