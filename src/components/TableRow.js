import React from 'react';

const TableRow = ({ name, email, phone, hungry, photo, id, handleEdit }) => {	
	return (
		<tr id={id}>
			<td>{name}</td>
			<td>{email}</td>
			<td>{phone}</td>
			<td>{hungry ? '✅' : '❌'}</td>
			<td>
			<img src={photo} alt='user-photo'/>
			</td>
			<td><button onClick={handleEdit}>edit</button></td>
			
		</tr>
	)
}

export default TableRow;