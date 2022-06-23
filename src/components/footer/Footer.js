import React from 'react';
import './Footer.css';

const Footer = () => {
	return (
		<div className='footer'>
			<div className='container'>
				<div className='footer__inner'>
					<a href='https://github.com/AiiaT/techTaskO-'>Link to GitHub</a>

					<a className='footer__phone' href='tel:+996553304050'>
						+996 553 30-40-50
					</a>
					<a className='footer__email' href='mailto:ainzileva@gmail.com'>
						ainzileva@gmail
					</a>
				</div>
			</div>
		</div>
	);
};

export default Footer;
