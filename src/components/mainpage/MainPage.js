import React, { useState, useEffect } from 'react';

import './MainPage.css';

const api = 'https://jsonplaceholder.typicode.com/posts';
const MainPage = () => {
	const [posts, setPosts] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [selectTerm, setSelectTerm] = useState('Filter out');

	const [input, setInput] = useState('');
	const [textarea, setTextarea] = useState('');

	const getPosts = async () => {
		const response = await fetch(api);
		const posts = await response.json();
		setPosts(posts);
		// console.log(posts);
	};

	useEffect(() => {
		getPosts();
	}, []);

	const handleSubmit = e => {
		e.preventDefault();
		const newPost = {
			id: new Date().toLocaleDateString(),
			userId: Math.floor(Math.random() * 5),
			title: input,
			body: textarea,
		};
		setPosts([...posts, { newPost }]);
		setPosts('');
	};

	return (
		<div className='mainpage'>
			<div className='container'>
				<div className='mainpage__posts'>
					<h1 className='mainpage__posts-title'>POSTS</h1>
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
						<button className='modal-btn' onClick={() => setIsOpen(!isOpen)}>
							Add Post
						</button>
					</div>

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
							return;
						})
						.map(post => {
							const { id, title, body } = post;
							return (
								<div className='mainpage__post' key={id}>
									{/* {id} */}
									<h4 className='mainpage__post-title'>{title}</h4>
									<p className='mainpage__post-text'>{body}</p>
								</div>
							);
						})}
					{isOpen && (
						<div className='popup'>
							<form className='popup__form' onSubmit={handleSubmit}>
								<input
									className='popup__input'
									type='text'
									value={input}
									onChange={e => setInput(e.target.value)}
								/>
								<textarea
									className='popup__textarea'
									cols='50'
									rows='5'
									value={textarea}
									onChange={e => setTextarea(e.target.value)}></textarea>
								<button className='popup__btn-submit' type='submit'>
									Submit
								</button>
							</form>
							<button
								className='close-modal'
								onClick={() => setIsOpen(!isOpen)}>
								X
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default MainPage;
