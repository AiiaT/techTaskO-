import React, { useState, useEffect } from 'react';

import './MainPage.css';

const api = 'https://jsonplaceholder.typicode.com/posts?_limit=10';
const MainPage = () => {
	const [posts, setPosts] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	const getPosts = async () => {
		const response = await fetch(api);
		const posts = await response.json();
		setPosts(posts);
		console.log(posts);
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<div className='mainpage'>
			<div className='container'>
				<div className='mainpage__posts'>
					<h1 className='mainpage__posts-title'>POSTS</h1>
					<input
						className='mainpage__posts-search'
						type='text'
						placeholder='Search...'
						onChange={event => {
							setSearchTerm(event.target.value);
						}}
					/>

					{posts
						.filter(value => {
							if (searchTerm === '') {
								return value;
							} else if (
								value.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
								value.body.toLowerCase().includes(searchTerm.toLowerCase())
							) {
								return value;
							}
						})
						.map(post => {
							const { id, userId, title, body } = post;
							return (
								<div className='mainpage__post' key={userId}>
									{/* {id} */}
									<h4 className='mainpage__post-title'>{title}</h4>
									<p className='mainpage__post-text'>{body}</p>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
};

export default MainPage;
