import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import Form from './Form';
import Table from './Table';

import getImageUrl from '../firebase/getImageUrl';

const testData = [{
	id: 323431,
	name: 'name',
	email: 'email',
	hungry: true
}]

const Content = () => {
	const [submitData, setSubmitData] = useState([]);
	const [editing, setEditing] = useState({ status: false, id: '' });

	// to remove the form edit if another part of the screen is clicked
	useEffect(() => {
		document.querySelector('body').addEventListener('click', (e) => {
			if (document.querySelector('div.modal') && !document.querySelector('div.modal').contains(e.target) && !e.target.classList.contains('edit-button')) {
				setEditing({ ...editing, status: false });
			}
			else return;
		})
	}, [])

	// to populate the edit form with the selected table row's values
	useEffect(() => {
		const mostPropsArray = ['name', 'email', 'phone'];

		const populateEdit = () => {
			const dataEntry = submitData.filter(item => item.id === editing.id)[0];

			for (let prop in dataEntry) {
				document.querySelectorAll('form#edit-form input').forEach(elem => {
					elem.removeAttribute('required');

					if (dataEntry[prop] && mostPropsArray.includes(prop) && elem.name === prop) elem.value = dataEntry[prop];

					else if (dataEntry[prop] && prop === 'hungry') {
						elem.checked = true;
					}
				})
			}
		}

		// necessary?
		const clearEdit = () => {
			document.querySelectorAll('form#edit-form input').forEach(elem => {
				if (elem.value) elem.value = null;
				else if (elem.checked) elem.checked = false;
			})
		}

		if (editing.status) populateEdit();
		if (!editing.status) clearEdit();

	}, [editing.status]);

	const handleEdit = (e) => {
		const id = e.target.parentElement.parentElement.id;
		setEditing({ ...editing, id, status: !editing.status });
	}

	const handleEditSubmit = (e) => {
		e.preventDefault();

		const rawFormData = {
			name: e.target[0].value,
			email: e.target[1].value,
			phone: e.target[2].value,
			hungry: e.target[3].checked,
			photo: e.target[4].files[0],
		};

		for (let key in rawFormData) {
			if (!rawFormData[key] && key === 'photo') delete rawFormData[key];
		}

		document.querySelectorAll('input').forEach(elem => elem.checked ? elem.checked = false : elem.value = '');

		if (rawFormData.photo) {
			getImageUrl(rawFormData.photo)
				.then(imgUrl => {
					const newDataWithImage = { ...rawFormData, photo: imgUrl }
					setSubmitData(submitData => submitData.map(item => item.id === editing.id ? { ...item, ...newDataWithImage } : item));
				})
		}
		else {
			setSubmitData(submitData => submitData.map(item => item.id === editing.id ? { ...item, ...rawFormData } : item));
		}
		setEditing({ status: false, id: '' })
	}

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		const rawFormData = {
			name: e.target[0].value,
			email: e.target[1].value,
			phone: e.target[2].value,
			hungry: e.target[3].checked,
			photo: e.target[4].files[0],
			id: nanoid(10)
		}

		document.querySelectorAll('input').forEach(elem => elem.checked ? elem.checked = false : elem.value = '');
		// reset the caption
		document.querySelector('form > span').textContent = '';


		try {
			const imgUrl = await getImageUrl(rawFormData.photo)
			const newData = { ...rawFormData, photo: imgUrl }
			setSubmitData(submitData => [...submitData, newData]);
		}
		catch (err) {
			const newData = { ...rawFormData }
			setSubmitData(submitData => [...submitData, newData]);
			console.log('photo not provided tho')
		}
	}

	// Routing
	const navigate = useNavigate();
	const location = useLocation();

	const switchView = () => {
		location.pathname === '/' ? navigate('table') : navigate('/');
	}

	return (
		<div className="content">
			{editing.status && (<div className="modal">
				<Form handleSubmit={handleEditSubmit} type='edit-form' />
			</div>)
			}
			<button className='switch' onClick={switchView}>
				Switch View
			</button>

			<Routes>
				<Route path='/'
					element={
						<Form
							handleSubmit={handleFormSubmit}
							type='main-form'
						/>}
				/>
				<Route path='table'
					element={
						<Table
							data={submitData}
							handleEdit={handleEdit}
						/>}
				/>
			</Routes>
		</div>

	)
}

export default Content;