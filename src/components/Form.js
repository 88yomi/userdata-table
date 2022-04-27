import React from 'react'
import FormInput from './FormInput';

const Form = ({ handleSubmit, type }) => {
	const handleNoImageSelected = () => {
		let file = document.querySelector('input[type=file]');

		if (!file.files[0]) {
			document.querySelector('label:nth-child(5)').classList.add('blink');
		}
	}

	return (
		<form onSubmit={handleSubmit} id={type}>
			<FormInput name='name' />
			<FormInput name='email' type={'email' /*'text'*/} />
			<FormInput name='phone' />
			<FormInput name='hungry' type="checkbox" />
			<FormInput name='photo' type='file' />
			<span></span>
			<button onClick={handleNoImageSelected}>submit</button>
		</form>
	)
}

export default Form;