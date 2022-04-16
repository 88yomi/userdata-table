import React from 'react'
import FormInput from './FormInput';

const Form = ({ handleSubmit }) => {
	return (
		<form onSubmit={handleSubmit}>
			{/* <FormInput name='full name' />
			<FormInput name='email' type='email' />
			<FormInput name='phone' />
			<FormInput name='hungry' />
			<FormInput name='photo' type='file' /> */}
			<FormInput name='full name' />
			<FormInput name='email' />
			<FormInput name='phone' />
			<FormInput name='hungry' />
			<input type='file'/>
			{/* <FormInput name='photo' type='file' /> */}
			<button>submit</button>
		</form>
	)
}

export default Form;