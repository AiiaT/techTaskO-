import React, { useState, useEffect } from 'react';
import './GalleryPage.css';

const url = 'https://jsonplaceholder.typicode.com/albums/1/photos';

const GalleryPage = () => {
	const [images, setImages] = useState([]);

	const getImages = async () => {
		const response = await fetch(url);
		const images = await response.json();
		setImages(images);
		console.log(images);
	};

	useEffect(() => {
		getImages();
	}, []);

	return (
		<div className='container'>
			<h1 className='gallery__title'>GALLERY</h1>
			<div className='gallery__inner'>
				{images.map(image => {
					const { albumId, id, title, url, thumbnailUrl } = image;
					return (
						<div className='gallery__item' key={id}>
							{/* {albumId} */}
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
			</div>
		</div>
	);
};

export default GalleryPage;
