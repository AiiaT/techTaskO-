import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../modal/Modal';

import './MainPage.css';

const api = 'https://jsonplaceholder.typicode.com/posts';
const MainPage = () => {
	const [posts, setPosts] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [modalActive, setModalActive] = useState(false);
	const [selectTerm, setSelectTerm] = useState('Filter out');
	const [postAdd, setPostAdd] = useState({
		title: '',
		body: '',
	});

	const getPosts = async () => {
		const response = await fetch(api);
		const posts = await response.json();
		setPosts(posts);
	};

	useEffect(() => {
		getPosts();
	}, []);

	const handleChangeTitle = e =>
		setPostAdd({
			...postAdd,
			title: e.target.value,
		});

	const handleChangeBody = e =>
		setPostAdd({
			...postAdd,
			body: e.target.value,
		});

	const postRequest = () => {
		setModalActive(false);
		axios
			.post('https://jsonplaceholder.typicode.com/posts', postAdd)
			.then(response => {
				console.log(response);
				if (response.status === 201) {
					setPostAdd({
						title: '',
						body: '',
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
						<button className='modal-btn' onClick={() => setModalActive(true)}>
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
					<Modal
						active={modalActive}
						setActive={setModalActive}
						postRequest={postRequest}>
						<div className='popup'>
							<div className='popup__form'>
								<input
									className='popup__input'
									type='text'
									value={postAdd.title}
									onChange={handleChangeTitle}
								/>
								<textarea
									className='popup__textarea'
									cols='50'
									rows='5'
									value={postAdd.body}
									onChange={handleChangeBody}></textarea>
								<button className='add__btn' onClick={postRequest}>
									Add Post
								</button>
							</div>
							<button
								className='close-modal'
								onClick={() => setModalActive(false)}>
								X
							</button>
						</div>
					</Modal>
				</div>
			</div>
		</div>
	);
};

export default MainPage;
