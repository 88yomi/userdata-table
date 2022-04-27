import React from 'react';

const FormInput = ({ name, type }) => {

	const isKeyNumber = e => {
		e.target.value = e.target.value.replace(/[^0-9]/g, '');
	}

	const handleImageSelect = e => {
		let span = document.querySelector('form>span');
		span.textContent = "🖼️ " + e.target.files[0].name;
	}

	return (
		<label htmlFor={name} >
			{name} {name === 'photo' && (<span> (click to select)</span>)}
			<input
				type={type ? type : 'text'}
				name={name}
				onInput={name === 'phone' ? isKeyNumber : undefined}
				id={name}
				onChange={name === 'photo' ? handleImageSelect : null}
				required={name !== 'hungry'}
			/>
		</label>
	)
}

export default FormInput;