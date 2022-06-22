import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import './App.css';

const App = () => {
	return (
		<div className='container'>
			<div className='router__inner'>
				<Router>
					<Header />
					<Routes>
						<Route path='/' element={<Main />} />
						<Route path='about' element={<About />} />
						<Route path='gallery' element={<Gallery />} />
					</Routes>
					<Footer />
				</Router>
			</div>
		</div>
	);
};

export default App;
