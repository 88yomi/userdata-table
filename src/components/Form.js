import React from 'react'
import FormInput from './FormInput';

const Form = ({ handleSubmit, type }) => {
	return (
		<form onSubmit={handleSubmit} id={type}>
			<FormInput name='name' />
			<FormInput name='email' type={/*email*/ 'text'}/>
			<FormInput name='phone' />
			<FormInput name='hungry' type="checkbox"/>
			<FormInput name='photo' type='file' />
			<button>submit</button>
		</form>
	)
}

export default Form;