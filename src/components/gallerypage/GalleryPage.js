import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../modal/Modal';
import './GalleryPage.css';

const url = 'https://jsonplaceholder.typicode.com/albums/1/photos?_limit=10';

const GalleryPage = () => {
	const [images, setImages] = useState([]);
	const [modalActive, setModalActive] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectTerm, setSelectTerm] = useState('Filter out');
	const [addPhotos, setAddPhotos] = useState({
		title: '',
		url: '',
	});

	const getImages = async () => {
		const response = await fetch(url);
		const images = await response.json();
		setImages(images);
		console.log(images);
	};

	useEffect(() => {
		getImages();
	}, []);

	const postRequest = () => {
		axios
			.post('https://jsonplaceholder.typicode.com/photos', addPhotos)
			.then(response => {
				console.log(response);
				if (response.status === 201) {
					setAddPhotos({
						title: '',
						url: '',
					});
					setModalActive(false);
				}
			})
			.catch(error => {
				if (error.response.status === 400) {
					setModalActive(true);
				}
			});
	};

	return (
		<div className='container'>
			<h1 className='gallery__title'>GALLERY</h1>
			<div className='mainpage__posts-input'>
				<input
					className='mainpage__posts-search'
					type='text'
					placeholder='Search...'
					onChange={event => {
						setSearchTerm(event.target.value);
					}}
				/>
				<select
					className='mainpage__posts-select'
					value={selectTerm}
					onChange={event => {
						setSelectTerm(event.target.value);
					}}>
					<option value='filterout'>Filter out</option>
					<option value='byname'>Filter by name</option>
					<option value='bycontent'>Filter by content</option>
				</select>
				<button className='modal-btn' onClick={() => setModalActive(true)}>
					Add Post
				</button>
			</div>
			<div className='gallery__inner'>
				{images
					.filter(value => {
						if (searchTerm === '') {
							return value;
						} else if (
							value.title.toLowerCase().includes(searchTerm.toLowerCase())
						) {
							return value;
						}
						return;
					})
					.map(image => {
						const { id, title, url, thumbnailUrl } = image;
						return (
							<div className='gallery__item' key={id}>
								<h4 className='gallery__item-title'>{title}</h4>
								<img className='gallery__item-img' src={url} alt='' />
								<a
									className='gallery__item-link'
									href={thumbnailUrl}
									target='_blanket'>
									link
								</a>
							</div>
						);
					})}
				<Modal
					active={modalActive}
					setActive={setModalActive}
					postRequest={postRequest}>
					<div className='popup__form'>
						<label className='popup__label'>
							<input className='popup__input_file' type='file' />
						</label>
						<button className='add__btn' onClick={postRequest}>
							Add Post
						</button>
					</div>
					<button className='close-modal' onClick={() => setModalActive(false)}>
						X
					</button>
				</Modal>
			</div>
		</div>
	);
};

export default GalleryPage;
