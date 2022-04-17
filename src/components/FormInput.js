import React from 'react';

const FormInput = ({ name, type }) => {

	const isKeyNumber = e => {
		e.target.value = e.target.value.replace(/[^0-9]/g, '');
	}

	return (
		<label htmlFor={name}>
			{name}
			<input
				type={type ? type : 'text'}
				name={name}
				onInput={name === 'phone' ? isKeyNumber : undefined}
				// required
			/>
		</label>
	)
}

export default FormInput;